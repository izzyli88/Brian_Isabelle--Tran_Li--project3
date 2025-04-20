import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios"; 
import "../styles/styles.css";
import Board from "../components/Board";

function GameLayout() {
  const gameId = useParams();

  const [playerBoard, setPlayerBoard] = useState([]);
  const [opponentBoard, setOpponentBoard] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  async function retrieveGame() {
    try {
      const response = await axios.get(`/api/game/${gameId}`);
      const gameData = response.data;


      setPlayerBoard(gameData.playerBoard);
      setOpponentBoard(gameData.opponentBoard);
      setPlayerTurn(gameData.turn); 
      setWinner(gameData.winner || null);
    } catch (err) {
      console.error("Error fetching game:", err);
    }
  }

  useEffect(() => {
    if (gameId) {
      retrieveGame();
      const interval = setInterval(retrieveGame, 2000); 
      return () => clearInterval(interval);
    }
  }, [gameId]);

  return (
    <div className="gamePage">
      <h1>Game</h1>

      {winner && (
        <div className="gameOver">
          <h1>Game Over! {winner} wins!</h1>
        </div>
      )}

      <div className="gameContainer">
        <Board
          isOpponent={true}
          board={opponentBoard}
          playerTurn={playerTurn}
          winner={winner}
          gameId={gameId}
          fetchGame={retrieveGame}
        />
        <Board
          isOpponent={false}
          board={playerBoard}
          playerTurn={false}
          winner={winner}
          gameId={gameId}
          fetchGame={retrieveGame}
        />
      </div>
    </div>
  );
}

export default GameLayout;


// import React from "react";
// import "../styles/styles.css";
// import Board from "../components/Board";

// function GameLayout() {
//   const { winner } = useGame();

//   return (
//     <div className="gamePage">
//       <h1>Game</h1>

//       {winner && (
//         <div className="gameOver">
//           <h1>Game Over! {winner} wins!</h1>
//         </div>
//       )}

//       <div className="gameContainer">
//         <Board isOpponent={true} />
//         <Board isOpponent={false} />
//       </div>
//     </div>
//   );
// }

// export default function Game() {
//   return (
//     <GameProvider>
//       <GameLayout />
//     </GameProvider>
//   );
// }


