import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";
import Timer from "../../components/Timer";
import { TimeProvider } from "../../context/TimerContext";
import { GameProvider } from "../../context/GameContext";

export default function NormalMode() {
  return (
    <TimeProvider>
      <GameProvider mode="normal">
        <h1>Normal Mode</h1>
        <div className="timerContainer">
            <Timer />
        </div>
        <div className="gameContainer">
            <Board isAi={true} /> {/* Opponent board */}
            <Board isAi={false} /> {/* Player board */}
        </div>
      </GameProvider>
    </TimeProvider>
  );
}
