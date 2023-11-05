import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export default function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [c222Color, ] = useState("#222");
  const [cfffColor, ] = useState("#fff");

  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector(".Header");
      menu.classList.toggle("sticky", window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddressClick = () => {
    const logo = document.querySelector(".logo");
    const nav = document.querySelector(".nav");
    const section = document.querySelector(".section");
    const footer = document.querySelector(".footer");
    const disconnectModal = document.querySelector(".disconnect-modal");
    const disconnectDimm = document.querySelector(".disconnect-dimm");

    logo.classList.toggle("blur");
    nav.classList.toggle("blur");
    section.classList.toggle("blur");
    footer.classList.toggle("blur");
    disconnectModal.classList.toggle("disconnect-modal-on");
    disconnectDimm.classList.toggle("disconnect-modal-on");
  };

  const disconnectWallet = useCallback(() => {
    disconnect();
    handleAddressClick();
  }, []);

  return (
    <header className="Header">
        <svg
      width="100" // Adjusted width to make it smaller
      height="50" // Adjusted height to make it smaller
      viewBox="0 0 200 100" // Adjusted viewBox to maintain aspect ratio
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="80"
        stroke="blue"
        strokeWidth="4"
        fill="none"
      />
      <text
        x="100" // Centered text in the new viewBox
        y="55" // Adjusted y position for the text
        textAnchor="middle"
        fill="black"
        fontSize="20" // Smaller font size to fit the new size
        fontFamily="Arial, sans-serif"
      >
        Consortium
      </text>
    </svg>
      <nav className="nav">
        <button className="app">APP</button>
        {isConnected ? (
          <div className="buttonContainer">
            <span onClick={handleAddressClick}>
              {`0x${address?.substring(2,5 )}...${address?.substring(38)} `} 
              DISCONNECT
            </span>
          </div>
        ) : (
          <button className="connect_wallet " onClick={() => connect()}>
            CONNECT WALLET
          </button>
        )}
      </nav>
 
      <div className="connect-dimm" onClick={()=>{}}></div>
      <div className="disconnect-modal">
        <div className="disconnect-content">
          <h2>Disconnect Wallet</h2>
          <span>Are you sure you want to logout</span>
        </div>
        <div className="disconnect-btns">
          <button className="disconnect-cancel" onClick={handleAddressClick}>
            CANCEL
          </button>
          <button className="disconnect-button" onClick={disconnectWallet}>
            DISCONNECT
          </button>
        </div>
      </div>
      <div className="disconnect-dimm" onClick={handleAddressClick}></div>
    </header>
  );
}
