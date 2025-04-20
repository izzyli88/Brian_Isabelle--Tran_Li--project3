import React, { createContext, useState, useContext, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ children, mode }) {
  const isEasy = mode === "easy";

  const DIMENSION = 10;

  const [playerTurn, setPlayerTurn] = useState(true); // player always goes first

  const [winner, setWinner] = useState(null);

  const [aiTurn, setAiTurn] = useState(false);

  const [playerBoard, setPlayerBoard] = useState([]);

  const [aiBoard, setAiBoard] = useState([]);

  const switchTurn = () => {
    setPlayerTurn(!playerTurn);
    setAiTurn(!aiTurn);
  };

  function generateBoard() {
    const ships = [
      { size: 5, isHorizontal: Math.random() < 0.5 },
      { size: 4, isHorizontal: Math.random() < 0.5 },
      { size: 3, isHorizontal: Math.random() < 0.5 },
      { size: 3, isHorizontal: Math.random() < 0.5 },
      { size: 2, isHorizontal: Math.random() < 0.5 },
    ];

    const board = Array.from({ length: DIMENSION }, () =>
      Array(DIMENSION).fill("empty")
    );

    function placeShip(board, r, c, length, isHorizontal) {
      const coords = [];

      for (let i = 0; i < length; i++) {
        const row = isHorizontal ? r : r + i;
        const col = isHorizontal ? c + i : c;

        if (
          row >= DIMENSION ||
          col >= DIMENSION ||
          board[row][col] !== "empty"
        ) {
          return false; // invalid ship location
        }

        coords.push([row, col]);
      }

      coords.forEach(([row, col]) => {
        board[row][col] = "ship";
      });

      return true;
    }

    for (const ship of ships) {
      let placed = false;
      while (!placed) {
        const r = Math.floor(Math.random() * DIMENSION);
        const c = Math.floor(Math.random() * DIMENSION);
        placed = placeShip(board, r, c, ship.size, ship.isHorizontal);
      }
    }

    return board;
  }

  const checkForWinner = (board) => {
    return board.every((row) => row.every((cell) => cell !== "ship"));
  };

  const handleAttack = (board, setBoard, r, c) => {
    const newBoard = board.map((row) => [...row]); // clone og board
    const cell = newBoard[r][c];

    if (cell === "hit" || cell === "miss") {
      // cant press already clicked button
      return;
    }

    newBoard[r][c] = cell === "ship" ? "hit" : "miss"; // update status
    setBoard(newBoard);

    if (checkForWinner(newBoard)) {
      // win check
      let winner = "";
      winner = isEasy || playerTurn ? "Player" : "Opponent";
      setWinner(winner);
    } else {
      // no winner, switch turn if normal mode
      if (!isEasy) {
        switchTurn();
      }
    }
  };

  const aiMove = () => {
    if (!playerTurn && !winner) {
      // not player turn and no winner
      let r, c;
      do {
        r = Math.floor(Math.random() * 10);
        c = Math.floor(Math.random() * 10);
      } while (playerBoard[r][c] === "hit" || playerBoard[r][c] === "miss");

      handleAttack(playerBoard, setPlayerBoard, r, c);
    }
  };

  useEffect(() => {
    setAiBoard(generateBoard());
    if (!isEasy) setPlayerBoard(generateBoard());
  }, []);

  useEffect(() => {
    if (!isEasy && !playerTurn && !winner) {
      const timer = setTimeout(() => aiMove(), 600);
      return () => clearTimeout(timer);
    }
  }, [playerTurn, winner]);

  // for resetting game board
  const resetGame = () => {
    const newAiBoard = generateBoard();
    const newPlayerBoard = generateBoard();
  
    // easy and normal modes
    setPlayerTurn(true);
    setWinner(null);
    setAiTurn(false);
    setAiBoard(newAiBoard);
  
    // normal mode only
    if (!isEasy) {
        setPlayerBoard(newPlayerBoard);
    }
  };

  const value = {
    mode,
    isEasy,
    playerTurn,
    playerBoard,
    aiBoard,
    winner,
    setPlayerBoard,
    setAiBoard,
    handleAttack,
    aiMove,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
