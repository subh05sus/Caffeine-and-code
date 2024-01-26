import React, { useState } from "react";
import { Link } from "react-router-dom";
import phicsitImage from './assets/PHICSIT_white_logo-removebg-preview (1).png'
import "./Navbar.css";
import { isMobile } from "react-device-detect";
const Navbar = () => {

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: "100",
      }}
    >
      <nav
        style={{
          background: "rgb(0 0 0 / 68%)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          color: "white",
          borderRadius: "10px",
          display: "flex",
          flexDirection: isMobile ?"column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile?"start": "center",
          margin: "15px",
          flexWrap: "wrap",
          width: "95%",
        }}
      >
        <div id="title">
          <Link to="/">
          <img src={phicsitImage} alt="" className="logoImage"/>
            {/* <b>
              <span className="titleA">Caffeine and </span>
              <span className="titleB">Code</span>
            </b> */}
          </Link>
        </div>
        <div
          id="navigation"
          style={{
            display: "flex",
            gap: "15px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link className="navLink" to="/">
            Home
          </Link>
          <Link className="navLink" to="/projects">
            Projects
          </Link>
          <Link className="navLink" to="/leaderboard">
            Leaderboard
          </Link>
          {/* <Link className="navLink" to="/our-team">
            Our Team
          </Link> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
