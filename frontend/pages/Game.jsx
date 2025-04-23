import React from "react";
import "../styles/styles.css";
import Board from "../components/Board";
import { GameProvider, useGame } from "../context/GameContext";

export default function Game() {

  function TurnPrompt() {
    const { isYourTurn, winner, opponentName } = useGame();

    if (winner) return null;

    return (
      <h1 className="turnPrompt">
        {isYourTurn ? "Your turn!" : `Waiting for ${opponentName}...`}
      </h1>
    );
  }

  function WinnerAnnouncement(){
    const {winner, opponentName} = useGame();
    if (winner) {
      const message = "Game Over: " + (winner === opponentName ? `${opponentName} Wins!` : "You Win!");
      return (
        <>
        <h1>{message}</h1>
        </>
      )
    }
    
  }
  return (
    <GameProvider>
      <TurnPrompt />
      <WinnerAnnouncement/>
      <div className="gameContainer">
        <Board isOpponent={true} />
        <Board isOpponent={false} />
      </div>
    </GameProvider>
  );
}
