// Leaderboard.js

import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import firstIcon from "./assets/first-icon.svg";
import secondIcon from "./assets/second-icon.svg";
import thirdIcon from "./assets/third-icon.svg";
import Lottie from "react-lottie";
import animationData from "./loading.json";
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    fetch("https://caffiene-and-code.onrender.com/leaderboard") 
      .then((response) => response.json())
      .then((data) => {
        setLeaderboardData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      });
  }, []);

  return (

      <div
        className="leaderboard-container"

      >
        <div style={{
          display:"flex",
          justifyContent:"center"
        }}>

        <h1>Leaderboard</h1>
        </div>
        {loading ? (
          <Lottie options={defaultOptions} height={400} width={400} />
        ) : (
          <div className="leaderboard-list">
            {leaderboardData.map((entry, index) => (
              <div key={index} className="leaderboard-item">
                <div className="position">
                  {index === 0 && (
                    <img
                      className="iconsRank"
                      src={firstIcon}
                      alt="1st place"
                    />
                  )}
                  {index === 1 && (
                    <img
                      className="iconsRank"
                      src={secondIcon}
                      alt="2nd place"
                    />
                  )}
                  {index === 2 && (
                    <img
                      className="iconsRank"
                      src={thirdIcon}
                      alt="3rd place"
                    />
                  )}
                  {index > 2 && index + 1}
                </div>{" "}
                <div className="name">{entry.name}</div>
                <div className="score">{entry.score}</div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Leaderboard;
