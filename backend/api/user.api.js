import express from 'express';
import { createUser, findUser, getAllUsers, getAllSortedUsers, deleteAllUsers, updateWins, updateLosses } from './db/model/user.model.js';
const router = express.Router();

router.post('/register', async function(req, res) {
    const requestBody = req.body;
    const password = requestBody.password;
    const username = requestBody.username;

    if(!password || !username) {
        res.status(401);
        res.send("User did not provide a username and/or password")
        return;
    }

    const userdata = {
        username: username,
        password: password
    }

    try {
        const response = await createUser(userdata);
        res.cookie("user", username);
        res.send(response);
    } catch (e) {
        res.status(400)
        res.send("something went wrong:" + e)
    }
})

router.post('/login', async function(req, res) {

    const requestBody = req.body;
    const password = requestBody.password;
    const username = requestBody.username;
    const verifyPassword = requestBody.verifyPassword


    if(!password || !username || !verifyPassword) {
        res.status(401);
        res.send("Incomplete information given")
        return;
    }

    if (password != verifyPassword) {
        res.status(401);
        res.send("Passwords should match.")
        return;
    }

    try {
        const response = await findUser(username);

        if(!response) {
            res.status(400);
            res.send("User data not found for username: " + username)
            return;
        }

        if(password !== response.password) {
            res.status(401);
            res.send("Username/password pair not valid")
            return;
        }

        res.cookie("user", username);
        res.send("Successfully logged in");
    } catch (e) {
        res.status(400)
        res.send("something went wrong:" + e)

    }
})

router.get('/isLoggedIn', async function(req, res) {
    const username = req.cookies.user;

    res.json({
        username: username
    })
})

router.delete('/logout', async function(req, res) {
    const username = req.cookies.user;

    res.cookie('user', username)

    res.send("Successfully logged out")
})

// functional retrieve all
router.get("/all", async function(req, res) {
    const allUsers = await getAllUsers();
    res.json(allUsers);
})

// functional leaderboard retrieval
router.get("/highScores", async function(req, res) {
    const allSortedUsers = await getAllSortedUsers();
    res.json(allSortedUsers);
})

// functional delete all games 4 testing
router.delete("/deleteAll", async function (req, res) {
    const deleteAll = deleteAllUsers();
    res.json(deleteAll);
})

router.post("/updateWins/:username", async function(req, res) {
    const ans = await updateWins(req.params.username);
    res.json(ans)
})

router.post("/updateLosses/:username", async function(req, res){
    const ans = await updateLosses(req.params.username);
    res.json(ans)
});

export default router;