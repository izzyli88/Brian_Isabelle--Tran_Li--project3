import React from "react";
import { useTimer } from "../context/TimerContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import Square from "./Square";

import "../styles/styles.css";
import "../styles/board.css";

function Board({ isAi }) {
  const { gameStart, startGame } = useTimer();

  const boardTitle = isAi ? "Opponent's Board" : "Your Board";

  const boardClass = isAi ? "board" : "board notClickable"; // cant click own board

  const {
    isEasy,
    playerTurn,
    winner,
    playerBoard,
    aiBoard,
    handleAttack,
    setPlayerBoard,
    setAiBoard,
  } = useGame();

  const board = isAi ? aiBoard : playerBoard;
  const setBoard = isAi ? setAiBoard : setPlayerBoard;

  // update status on click
  const handleClick = (r, c) => {
    // start timer if it hasn't been already started
    if (!gameStart) {
      startGame();
    }

    if (!isAi || winner) {
      return;
    }
    if (!isEasy && !playerTurn) {
      return;
    }

    handleAttack(board, setBoard, r, c);
  };

  return (
    <>
      { winner && (
          <div className="gameOver">
            <h1> Game Over! {winner} wins!</h1>
          </div>
      )}
      <h1>{boardTitle}</h1>
      <div className={boardClass}>
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              status={cell}
              isAi={isAi}
              onHit={() => handleClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
    </>
  );
}
export default Board;
