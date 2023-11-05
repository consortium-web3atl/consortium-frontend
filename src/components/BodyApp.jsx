import "./BodyApp.css";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BodyApp() {
  const [number, setNumber] = useState(0);
  const [rewards, setRewards] = useState([0, 0, 0]);
  const [locked, setLocked] = useState(0);
  const [statistic, setStatistic] = useState([0, 0, 0]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const targetNumber = 4.450077;
    const duration = 2000;
    const increment = ((targetNumber - number) / duration) * 10;

    const timer = setInterval(() => {
      setNumber((prevNumber) => {
        const newNumber = prevNumber + increment;
        if (newNumber >= targetNumber) {
          clearInterval(timer);
          return targetNumber;
        }
        return newNumber;
      });
    }, 10);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetLocked = 7093.358985;
    const duration = 2000;
    const increment = ((targetLocked - locked) / duration) * 10;

    const timer = setInterval(() => {
      setLocked((prevLocked) => {
        const newLocked = prevLocked + increment;
        if (newLocked >= targetLocked) {
          clearInterval(timer);
          return targetLocked;
        }
        return newLocked;
      });
    }, 10);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetRewards = [2.22, 1.33, 0.89];
    const duration = 2000;
    const increment = targetRewards.map(
      (target, index) => ((target - rewards[index]) / duration) * 10
    );
    const timers = [];

    for (let i = 0; i < targetRewards.length; i++) {
      const timer = setInterval(() => {
        setRewards((prevRewards) => {
          const newRewards = [...prevRewards];
          newRewards[i] += increment[i];

          if (newRewards[i] >= targetRewards[i]) {
            clearInterval(timer);
            newRewards[i] = targetRewards[i];
          }

          return newRewards;
        });
      }, 10);

      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    const targetStatistic = [219, 32.607927, 24];
    const duration = 2000;
    const increment = targetStatistic.map(
      (target, index) => ((target - statistic[index]) / duration) * 10
    );
    const timers = [];

    for (let i = 0; i < targetStatistic.length; i++) {
      const timer = setInterval(() => {
        setStatistic((prevStatistic) => {
          const newStatistic = [...prevStatistic];
          newStatistic[i] += increment[i];

          if (newStatistic[i] >= targetStatistic[i]) {
            clearInterval(timer);
            newStatistic[i] = targetStatistic[i];
          }

          return newStatistic;
        });
      }, 10);

      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    // this will be the epoch
    const targetTime = moment("2024-06-09 15:41");

    const interval = setInterval(() => {
      const currentTime = moment();
      const diff = targetTime.diff(currentTime);
      const duration = moment.duration(diff);
      const remaining = Math.max(duration.asMilliseconds(), 0);

      setRemainingTime(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time) => {
    const duration = moment.duration(time);
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    let formattedTime = "";

    if (days > 0) {
      formattedTime += `${days}d `;
    }
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }

    if (minutes > 0) {
      formattedTime += `${minutes}min `;
    }

    return formattedTime;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const labelStyle = {
    position: "absolute",
    top: "22px",
    left: inputValue.length > 0 ? `${40 + inputValue.length * 12}px` : "40px",
    fontWeight: "400",
    fontSize: "16px",
  };

  return (
    <div className="bodyapp">
      <section className="section">
        <div className="mint">
          <h3>POOL</h3>
          <div className="mint-content">
            <div className="total">
              <h4>Total Entrants</h4>
              <span>{number.toFixed(6)}</span>
            </div>
            <div className="rewards">
              <h4>Expected APY</h4>
              <div className="rewards-content">
                <div className="rewards-content-div">
                <span className="font">3.5%</span>
                </div>
              </div>
            </div>
            <div className="total">
              <h4>Total Epics</h4>
              <span>{number.toFixed(6)}</span>
            </div>
          </div>
          <h3>CURRENT EPOCH</h3>
          <div className="initial_distribution">
            <div className="mint-content">
              <div className="total">
                <h4>Total Prize</h4>
                <span>{number.toFixed(6)}</span>
              </div>
              <div className="rewards">
                <div className="rewards-content">
                  <div className="rewards-content-div">
                    <div>Winner {"0x_000"} </div>
                    <div className="claim_tokens">
                <button>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="previous_draws-svg"
                    >
                      <path
                        d="M3.5 4H6V5H3.5V4ZM3.5 6H6V7H3.5V6ZM3.5 8H6V9H3.5V8ZM10 4H12.5V5H10V4ZM10 6H12.5V7H10V6ZM10 8H12.5V9H10V8Z"
                        fill="#222"
                      ></path>
                      <path
                        d="M14 2H2C1.73488 2.0003 1.4807 2.10576 1.29323 2.29323C1.10576 2.4807 1.0003 2.73488 1 3V13C1.0003 13.2651 1.10576 13.5193 1.29323 13.7068C1.4807 13.8942 1.73488 13.9997 2 14H14C14.2651 13.9997 14.5193 13.8942 14.7068 13.7068C14.8942 13.5193 14.9997 13.2651 15 13V3C14.9997 2.73488 14.8942 2.4807 14.7068 2.29323C14.5193 2.10576 14.2651 2.0003 14 2ZM2 3H7.5V13H2V3ZM8.5 13V3H14V13H8.5Z"
                        fill="#222"
                      ></path>
                    </svg>
                    CLAIM TOKENS
                  </div>
                </button>
            </div>
                  </div>
                </div>
              </div>
              <div className="total">
                <h4>Collection Time</h4>
                <span>{remainingTime !== null ? (
                      <p> {formatTime(remainingTime)}</p>
                    ) : (
                      <p></p>
                    )}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lavender">
          <h3>MY BALANCE</h3>
          <div className="in_protocol">
            <h4>DEPOSITED IN PROTOCOL</h4>
            <span>0.000000</span>
            <p>stETH</p>
          </div>
          <hr className="hr" />
          <div className="draw_winning_odds">
            <h4>WINNING ODDS</h4>
            <p>1</p>
          </div>

          <div className="rewards">
            <h4>Entrant Cost Is {1} stETH</h4>
            <div className="balance-btns">
            <button className="deposit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.3 6.7L8.5 2.9V15H7.5V2.9L3.7 6.7L3 6L8 1L13 6L12.3 6.7Z"
                  fill="#000000"
                ></path>
              </svg>
              DEPOSIT
            </button>
            <button className="withdraw">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path
                  d="M13.2929 9.79295L11 12.0859V6C11 4.93913 10.5786 3.92172 9.82843 3.17157C9.07828 2.42143 8.06087 2 7 2C5.93913 2 4.92172 2.42143 4.17157 3.17157C3.42143 3.92172 3 4.93913 3 6V14H4V6C4 5.20435 4.31607 4.44129 4.87868 3.87868C5.44129 3.31607 6.20435 3 7 3C7.79565 3 8.55871 3.31607 9.12132 3.87868C9.68393 4.44129 10 5.20435 10 6V12.0859L7.70705 9.79295L7 10.5L10.5 14L14 10.5L13.2929 9.79295Z"
                  fill="#000000"
                ></path>
              </svg>
              WITHDRAW
            </button>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
