import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "#000",
        padding: "20px",
        color: "white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "15px",
        flexWrap: "wrap",
      }}
    >
      <div id="title">
        <Link to="/">
          <b>
            <span className="titleA">Caffeine and </span>
            <span className="titleB">Code</span>
          </b>
        </Link>
      </div>
      <div id="navigation" style={{ display: "flex", gap: "15px" }}>
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/projects">
          Project Page
        </Link>
        <Link className="navLink" to="/team">
          Our Team
        </Link>
        <Link className="navLink" to="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
