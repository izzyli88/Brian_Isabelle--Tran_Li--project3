import React from "react";
import "../styles/styles.css"
import Board from "../components/Board";
import { GameProvider } from "../context/GameContext";

export default function Game() {
  return (
      <GameProvider>
        <h1>Game</h1>
        <div className="gameContainer">
            <Board isOpponent={true} /> {/* Opponent board */}
            <Board isOpponent={false} /> {/* Player board */}
        </div>
      </GameProvider>
  );
}