import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="navBar">
      <NavLink to="/" end>
        {({ isActive }) => (
          <Button
            label="Home"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      <NavLink to="/game">
        {({ isActive }) => (
          <Button
            label="Game"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      <NavLink to="/rules">
        {({ isActive }) => (
          <Button
            label="Rules"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      <NavLink to="/highscores">
        {({ isActive }) => (
          <Button
            label="High Scores"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>
    </nav>
  );
}

export default Navbar;
