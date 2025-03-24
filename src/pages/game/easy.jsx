import React from "react";
import "../../styles/styles.css";
import { GameProvider } from "../../context/GameContext";
import Board from "../../components/Board";
import Timer from "../../components/Timer";
import { NavLink } from "react-router-dom";
import { TimeProvider } from "../../context/TimerContext";

export default function EasyMode() {
  return (
    <>
      <TimeProvider>
        <NavLink to="/game/easy"></NavLink>
        <GameProvider mode="easy">
          <div className="game-container">
            <h1>Easy Mode</h1>
            <Timer />
            <Board isAi={true} />
          </div>
        </GameProvider>
      </TimeProvider>
    </>
  );
}
