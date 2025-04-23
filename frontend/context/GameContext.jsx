import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext.jsx";
import { useParams } from "react-router-dom";
import getMaskedGame from "../../backend/utils/maskBoard.js"
import "../styles/styles.css"

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useUser();
  const { gameId } = useParams();

  const [yourBoard, setYourBoard] = useState([]);
  const [opponentBoard, setOpponentBoard] = useState([]);
  const [turn, setTurn] = useState("");
  const [winner, setWinner] = useState(null);
  const [yourName, setYourName] = useState("");
  const [opponentName, setOpponentName] = useState("");

  async function retrieveGameData() {
    try {
      const res = await axios.get("/api/game/" + gameId);
      const game = getMaskedGame(res.data, user);
      return game;
    } catch (e) {
      console.error("Error fetching game:", e.message);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const game = await retrieveGameData();
      if (!game) return;

      setYourBoard(game.yourBoard);
      setOpponentBoard(game.opponentBoard);
      setTurn(game.turn);
      setWinner(game.winner);

      setYourName(user);
      setOpponentName(game.opponent); 
    }

    fetchData();
  }, [turn]);

  async function handleAttack(r, c) {
    const req = { r, c, gameId };

    try {
      await axios.post("/api/game/move", req);
      const updatedGame = await retrieveGameData();

      if (updatedGame) {
        setYourBoard(updatedGame.yourBoard);
        setOpponentBoard(updatedGame.opponentBoard);
        setTurn(updatedGame.turn);
        setWinner(updatedGame.winner);
      }
    } catch (e) {
      console.error("Attack failed:", e.message);
    }
  }

  const value = {
    yourBoard,
    opponentBoard,
    handleAttack,
    turn,
    isYourTurn: turn === user,
    winner,
    yourName,
    opponentName,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
