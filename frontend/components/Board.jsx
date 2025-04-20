import React from "react";
import { useGame } from "../context/GameContext.jsx";
import Square from "./Square";

import "../styles/styles.css";
import "../styles/board.css";

function Board({ boardData, isOwnBoard, onAttack }) {
  const boardTitle = isOwnBoard ? "Your Board" : "Opponent's Board";

  const boardClass = isOwnBoard ? "board notClickable" : "board";

  const handleClick = (r, c) => {
    if (isOwnBoard) return; // cant attack own boa rd
    if (onAttack) {
      onAttack(r, c);
    }
  };

  return (
    <>
      <h1>{boardTitle}</h1>
      <div className={boardClass}>
        {boardData.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              status={cell}
              isAi={!isOwnBoard}
              onHit={() => handleClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Board;
