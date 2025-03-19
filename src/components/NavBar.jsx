import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "currPage" : "")}
      >
        <Button label="Home" className="button" />
      </NavLink>

      <NavLink
        to="/rules"
        className={({ isActive }) => (isActive ? "currPage" : "")}
      >
        <Button label="Rules" className="button" />
      </NavLink>

      <NavLink
        to="/game"
        className={({ isActive }) => (isActive ? "currPage" : "")}
      >
        <Button label="Game" className="button" />
      </NavLink>

      <NavLink
        to="/highscores"
        className={({ isActive }) => (isActive ? "currPage" : "")}
      >
        <Button label="High Scores" className="button" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
