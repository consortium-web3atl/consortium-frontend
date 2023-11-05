// SPDX-License-Identifier: GNU-GPL v3.0 or later

pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

// import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@chainlink/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
// import "@chainlink/v0.8/vrf/VRFConsumerBaseV2.sol";
// import "src/Revest_721.sol";
// import "forge-std/console.sol";
// import "src/interfaces/IController.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Consortio {
   using SafeERC20 for IERC20;

    struct Pool {
        uint startTime;
        address[] entrants;
        address[] remainingPlayers;
        
        uint epochLength;
        uint totalEpochs;
        // *monthly installment amount
        uint epochInstallment;
        address installmentToken;
        // entrants determine epochs
        // epoch lengths determine pool endTime
        mapping(address => mapping(uint => bool)) paidInstallment;
        mapping(uint => uint) epochRequestId;
        mapping(uint => address) epochWinner;
        // mapping(address => bool) fnftCollected;
    }
    mapping(uint => Pool) public pools;
    uint public poolId;

    function currentEpoch(uint _poolId) public view returns (uint) {
        uint epoch;
        uint epochLength = pools[_poolId].epochLength;
        if (
            block.timestamp >= pools[_poolId].startTime +
                (epochLength * (pools[_poolId].totalEpochs - 1))
        ) {
            return pools[_poolId].totalEpochs;
        }

        // the first epoch's end time is the start time first epochLength
        uint endTime = pools[_poolId].startTime + epochLength;
        while (block.timestamp >= endTime) {
            endTime += epochLength;
            epoch++;
        }
        return epoch;
    }

        // Generate a pseudo-random number for testing purpose
    // by hashing the owner's address and the timestamp of the current block
    function getPseudoRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
    }

    function createPool(
        uint _epochLength,
        uint _totalEpochs,
        uint _epochInstallment,
        address _installmentToken
    ) public {
        pools[poolId].startTime = block.timestamp;
        pools[poolId].epochLength = _epochLength;
        pools[poolId].totalEpochs = _totalEpochs;
        pools[poolId].epochInstallment = _epochInstallment;
        pools[poolId].installmentToken = _installmentToken;
        poolId++;
    }

    function enterPool(uint _poolId) external {
        require(pools[_poolId].entrants.length < pools[_poolId].totalEpochs, "We have reached max capacity");
        payInstallment(_poolId);
        pools[_poolId].entrants.push(msg.sender);
        pools[_poolId].remainingPlayers.push(msg.sender);
    }

    function payInstallment(uint _poolId) public {
        uint epoch = currentEpoch(_poolId);
        IERC20(pools[_poolId].installmentToken).safeTransferFrom(
            msg.sender,
            address(this),
            pools[_poolId].epochInstallment
        );
        pools[_poolId].paidInstallment[msg.sender][epoch] = true;
    }

    function epochLottery(uint _poolId) public {
        uint epoch = currentEpoch(_poolId);
        // todo: implement lottery functionality
        // This chooses the number but we must recall to get results
        // we must choose the winner by number, expose the winner, then allow them to collect
        // address epochWinner = pickWinner();
        _pickWinner();
    }

    function _pickWinner() internal {
        // todo: implement me
    }

    function collectFNFT(uint _poolId) public returns (address winner) {
        uint epoch = currentEpoch(_poolId);
        uint randomNum = getPseudoRandomNumber() ;

        // todo: if person wins - should be removed before next collection
        uint index = randomNum % pools[_poolId].remainingPlayers.length;
        winner = pools[_poolId].remainingPlayers[index];
        pools[_poolId].remainingPlayers[index] = pools[_poolId].remainingPlayers[pools[_poolId].remainingPlayers.length - 1];
        pools[_poolId].remainingPlayers.pop();
        pools[_poolId].epochWinner[epoch] = winner;
        
        // todo: wrap FNFT with pooled funds -- impovement would be to have seperate pool functions for reentrancy attacks
        // ERC20.approve(revest, MAX_AMOUNT);
        IERC20 erc20 = IERC20(address(pools[_poolId].installmentToken));
        uint256 allPooledFunds = erc20.balanceOf(address(this));
        // approve Revest's controller to spend the ERC20 on behalf of pool
        erc20.safeTransfer(
            msg.sender,
            allPooledFunds
        );
    }
}