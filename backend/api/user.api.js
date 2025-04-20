import express from 'express';
import { createUser, findUser } from './db/model/user.model.js';
const router = express.Router();

router.post('/register', async function(req, res) {
    const requestBody = req.body;
    const password = requestBody.pass;
    const username = requestBody.username;

    if(!password || !username) {
        res.status(401);
        res.send("User did not provide a username and/or password")
        return;
    }

    const userdata = {
        username: username,
        pass: password
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
    const password = requestBody.pass;
    const username = requestBody.username;

    if(!password || !username) {
        res.status(401);
        res.send("User did not provide a username and/or password")
        return;
    }


    try {
        const response = await findUser(username);

        if(!response) {
            res.status(400);
            res.send("User data not found for username: " + username)
            return;
        }

        if(password !== response.pass) {
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

    res.cookie('user', username, {
        maxAge: 0,
    })

    res.send("Successfully logged out")
})


export default router;