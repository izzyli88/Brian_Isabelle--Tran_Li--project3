import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext.jsx";
import { useParams } from "react-router-dom";
const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useUser();
  const { gameId } = useParams();

  const [turn, setTurn] = useState(true); // player always goes first
  const [winner, setWinner] = useState(null);
  const [p1Board, setP1Board] = useState([]);
  const [p2Board, setP2Board] = useState([]);

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  async function retrieveGameData() {
    try {
      const response = await axios.get("/api/game/" + gameId);
      return response.data;
    } catch (e) {
      console.error("Error when fetching gamne");
      return;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const game = await retrieveGameData();
      if (!game) return;
      setP1(game.p1);
      setP2(game.p2);
      setP1Board(game.p1Board);
      setP2Board(game.p2Board);
      setWinner(game.winner);
    }

    fetchData();
  }, [turn]);

  async function handleAttack(r, c) {
    const req = {
      r: r,
      c: c,
      gameId: gameId,
    };

    try {
        await axios.post("/api/game/move", req);
        setTurn(!turn)      // just triggers use-effect
    } catch (e) {
        console.log(e.message);
    }
  }

  const value = {
    turn,
    p1Board,
    p2Board,
    winner,
    setPlayerBoard: setP1Board,
    setOpponentBoard: setP2Board,
    handleAttack,
    p1,
    p2,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
