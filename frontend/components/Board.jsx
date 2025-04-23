import React from "react";
import { useGame } from "../context/GameContext.jsx";
import Square from "./Square";
import "../styles/styles.css";
import "../styles/board.css";
import { useUser } from "../context/UserContext.jsx";

function Board({ isOpponent }) {
  const user = useUser();
  const {
    yourBoard,
    opponentBoard,
    handleAttack,
    winner,
    isYourTurn,
    opponentName
  } = useGame();

  const board = isOpponent ? opponentBoard : yourBoard;
  const boardTitle = isOpponent ? `${opponentName}'s Board` : "Your Board";
  const boardClass = isOpponent ? "board" : "board notClickable";

  const handleClick = (r, c) => {
    if (!isOpponent || winner || !isYourTurn) return;
    handleAttack(r, c);
  };

  function maskUnloggedSquares(status) {
    if (user === undefined && status === "ship") {
      return "empty"
    }
    return status

  }

  return (
    <>
      <h1>{boardTitle}</h1>
      <div className={boardClass}>
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              status={maskUnloggedSquares(cell)}
              isOpponent={isOpponent}
              onHit={() => handleClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Board;
