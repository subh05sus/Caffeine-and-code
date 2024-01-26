import React, { useState, useEffect } from "react";
import "./countdown.css";
import { isMobile } from "react-device-detect";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date("March 10, 2024 10:00:00 GMT+05:30");
    const currentDate = new Date();

    const difference = eventDate - currentDate;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      };
    } else {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
  };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const countdownStyle = {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile? '' : '4rem'

  };

  const countdownItemStyle = {
    textAlign: 'center',
    margin: isMobile ? '10px 0' : '',
  };

  return (
    <section className="countdownSection">
      <ul id="countdown" style={countdownStyle}>
        <div style={{display:"flex", flexDirection: "row", gap:'4rem'}}>

        <li style={countdownItemStyle}>
          <span className="days timenumbers">{timeLeft.days}</span>
          <p className="timeRefDays timedescription">days</p>
        </li>
        <li style={countdownItemStyle}>
          <span className="hours timenumbers">{timeLeft.hours}</span>
          <p className="timeRefHours timedescription">hours</p>
        </li>
        </div>
        <div style={{display:"flex", flexDirection: "row", gap:'4rem'}}>
        <li style={countdownItemStyle}>
          <span className="minutes timenumbers">{timeLeft.minutes}</span>
          <p className="timeRefMinutes timedescription">minutes</p>
        </li>
        <li style={countdownItemStyle}>
          <span className="seconds timenumbers yellow-text">{timeLeft.seconds}</span>
          <p className="timeRefSeconds timedescription">seconds</p>
        </li>
        </div>
      </ul>
    </section>
  );
};

export default CountdownTimer;