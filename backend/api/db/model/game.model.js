import mongoose from "mongoose";
import { GameSchema } from "../schema/game.schema.js";
import generateBoard from "../../../utils/generateBoard.js"
const GameModel = mongoose.model("Game", GameSchema);


// create new game
export function createGame(username) {
  const newGameInfo = {
    p1: username,
    p1Board: generateBoard(),
    p2Board: generateBoard(),
    turn: username,
  };

  return GameModel.create(newGameInfo);
}

// make move
export async function makeMove(moveSet) {
  const { username, r, c, gameId } = moveSet;

  const game = await GameModel.findById(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.turn !== username) {
    throw new Error("Not your turn");
  }

  const isP1 = (game.p1 === username);
  const opponentBoard = isP1 ? game.p2Board : game.p1Board;

  const targetCell = opponentBoard[r][c];

  if (targetCell === "hit" || targetCell === "miss") {
    throw new Error("Cell already attacked");
  }

  if (targetCell === "ship") {
    opponentBoard[r][c] = "hit"; 
  } else {
    opponentBoard[r][c] = "miss"; 
  }

  if (checkWinner(opponentBoard)) {
    game.status = "Completed";
    game.winner = username;
  } else {
    game.turn = isP1 ? game.p2 : game.p1;
  }

  await game.save();
  return game;
}

// find open game if available, else create game
export async function joinGame(username) {
  const openGame = await GameModel.findOne({ status: "Open" });

  if (openGame) {
    if (openGame.p1 === username) {
      throw new Error("You cannot join your own game");
    }

    openGame.p2 = username;
    openGame.status = "Active";
    await openGame.save();
    return openGame;
  } 

  // create game if no open found
  return createGame(username);
}

function checkWinner(board) {
  return board.every((row) => row.every((cell) => cell !== "ship"));
}
