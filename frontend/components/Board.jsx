import React from "react";
import Square from "./Square";
import "../styles/styles.css";
import "../styles/board.css";

function Board({ isOpponent, board, playerTurn, winner, gameId, fetchGame }) {
  const boardTitle = isOpponent ? "Opponent's Board" : "Your Board";
  const boardClass = isOpponent ? "board" : "board notClickable";

  const handleClick = async (r, c) => {
    if (!isOpponent || winner || !playerTurn) return;

    try {
      await axios.post("/api/game/move", { r, c, gameId });
      await fetchGame(); // refresh after move
    } catch (err) {
      console.error("Error making move:", err);
    }
  };

  if (!board || board.length === 0) {
    return <div>Loading board...</div>;
  }

  return (
    <>
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
