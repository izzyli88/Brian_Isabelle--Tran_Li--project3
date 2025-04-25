import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext.jsx";
import { useParams } from "react-router-dom";
import getMaskedGame from "../../backend/utils/maskBoard.js";

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useUser();
  const { gameId } = useParams();

  const [yourBoard, setYourBoard] = useState([]);
  const [opponentBoard, setOpponentBoard] = useState([]);
  const [turn, setTurn] = useState("");
  const [winner, setWinner] = useState(null);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [opponentName, setOpponentName] = useState("");

  async function retrieveGameData() {
    try {
      const res = await axios.get("/api/game/" + gameId);
      const game = getMaskedGame(res.data, user);
      return { ...game, fullData: res.data };
    } catch (e) {
      console.error("Error fetching game:", e.message);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const game = await retrieveGameData();
      if (!game) return;

      const { yourBoard, opponentBoard, turn, winner, fullData } = game;

      setYourBoard(yourBoard);
      setOpponentBoard(opponentBoard);
      setTurn(turn);
      setWinner(winner);
      setP1(fullData.p1);
      setP2(fullData.p2);
      setOpponentName(fullData.p1 === user ? fullData.p2 : fullData.p1);
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
    yourName: user,
    opponentName,
    p1,
    p2,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
