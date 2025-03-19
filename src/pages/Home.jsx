import React from "react";
import "../styles/styles.css";
import battleshipImage from "../assets/battleship.jpg";

export default function Home() {
  return (
    <>
      <div>
        <h1>Battleship</h1>
        <img className="pic" src={battleshipImage} alt="BattleshipArt" />
      </div>
    </>
  );
}
