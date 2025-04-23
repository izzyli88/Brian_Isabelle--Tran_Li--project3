import React from "react";
import { useGame } from "../context/GameContext.jsx";
import Square from "./Square";

import "../styles/styles.css";
import "../styles/board.css";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";

function Board({ opponent, isOpponent }) {
  const {user} = useUser();

  const boardTitle = isOpponent ? `${opponent} Board` : "Your Board";

  const boardClass = isOpponent ? "board" : "board notClickable"; // cant click own board

  const {
    turn,
    winner,
    p1Board,
    p2Board,
    handleAttack,
    setP1Board,
    setP2Board,
    p1,
    p2
  } = useGame();

  const board = (user === p2) ? p2Board : p1Board;
  const setBoard = (user === p2) ? setP2Board : setP1Board;


  // update status on click
  const handleClick = (r, c) => {
    
    if (!isOpponent || winner) {
      return;
    }
    if (!turn) {
      return;
    }

    handleAttack(r, c);
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