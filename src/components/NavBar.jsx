import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import "../styles/navbar.css"; 

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav className="navBar">
      <Link to="/">
        <Button
          label="Home"
          className="button"
          id={location.pathname === "/" ? "currPage" : ""}
        />
      </Link>
      <Link to="/rules">
        <Button
          label="Rules"
          className="button"
          id={location.pathname === "/rules" ? "currPage" : ""}
        />
      </Link>
      <Link to="/game">
        <Button
          label="Game"
          className="button"
          id={location.pathname === "/game" ? "currPage" : ""}
        />
      </Link>
      <Link to="/highscores">
        <Button
          label="High Scores"
          className="button"
          id={location.pathname === "/highscores" ? "currPage" : ""}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
