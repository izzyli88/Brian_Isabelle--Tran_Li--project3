import express from "express"
const router = express.Router();
import { joinGame } from "./db/model/game.model.js";


// new game or join game
router.post("/", async (req, res) => {
    const username = req.cookies.user;  // retrieve user logged in w/ cookies

    if (!username) {
        res.status(400).send("Username required");
        return;
    }

    try {
        const game = await joinGame(username);
        res.json(game);
        console.log("Success")
    } catch (e) {
        res.status(400).send(e.message);
    }
    
});

// make move
router.post("/move", async function (req, res) {
    const username = req.cookies.user
    const r = req.body.r;       // row
    const c = req.body.c    // col
    const gameId = req.body.gameId

    if (!username || !r || !c || !gameId) {
        res.status(400).send("Incomplete information given (username/row/column");
        return;
    }

    try {
        const updatedGame = await makeMove({ username, r, c, gameId });
        res.status(200).json(updatedGame);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }

})

export default router;
