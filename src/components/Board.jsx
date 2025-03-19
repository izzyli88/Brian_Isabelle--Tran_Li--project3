import React, { useState, useEffect } from "react";
import Square from "./Square";
import "../styles/styles.css";
import "../styles/gamePage.css";

export default function Board({ isAi }) {
  const DIMENSION = 10;

  function rotateShipRandom() {
    return Math.random() < 0.5;
  }

  const ships = [
    { size: 5, isHorizontal: rotateShipRandom() },
    { size: 4, isHorizontal: rotateShipRandom() },
    { size: 3, isHorizontal: rotateShipRandom() },
    { size: 3, isHorizontal: rotateShipRandom() },
    { size: 2, isHorizontal: rotateShipRandom() },
  ];

  function createEmptyBoard() {
    return Array.from({ length: DIMENSION }, () =>
      Array(DIMENSION).fill("empty")
    );
  }

  function canPlace(board, r, c, length, isHorizontal) {
    for (let i = 0; i < length; i++) {
      let checkRow = isHorizontal ? r : r + i;
      let checkCol = isHorizontal ? c + i : c;

      if (
        checkRow >= DIMENSION ||
        checkCol >= DIMENSION ||
        board[checkRow][checkCol] !== "empty"
      ) {
        return false; // Overlap or out of bounds
      }
    }
    return true;
  }

  function addShip(board, r, c, length, isHorizontal) {
    for (let i = 0; i < length; i++) {
      let placeRow = isHorizontal ? r : r + i;
      let placeCol = isHorizontal ? c + i : c;
      board[placeRow][placeCol] = "ship";
    }
  }

  function placeShips(board) {
    let newBoard = [...board.map((row) => [...row])];

    for (let ship of ships) {
      let placed = false;
      while (!placed) {
        let row = Math.floor(Math.random() * DIMENSION);
        let col = Math.floor(Math.random() * DIMENSION);

        if (canPlace(newBoard, row, col, ship.size, ship.isHorizontal)) {
          addShip(newBoard, row, col, ship.size, ship.isHorizontal);
          placed = true;
        }
      }
    }

    return newBoard; // Return updated board
  }
}
