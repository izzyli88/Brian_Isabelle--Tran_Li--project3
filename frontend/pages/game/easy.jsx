import React from "react";
import "../../styles/styles.css";
import { GameProvider } from "../../context/GameContext";
import Board from "../../components/Board";
import Timer from "../../components/Timer";
import { TimeProvider } from "../../context/TimerContext";

export default function EasyMode() {
  return (
    <>
      <TimeProvider>
        <GameProvider mode="easy">
          <h1>Easy Mode</h1>
          <div className="gameContainerEasy">
            <div className="timerContainer">
            <Timer />
            </div>
            <Board isAi={true} />
          </div>
        </GameProvider>
      </TimeProvider>
    </>
  );
}
