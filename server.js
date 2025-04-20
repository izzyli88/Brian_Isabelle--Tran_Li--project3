import express from "express";
const app = express();
import userRouter from "./backend/api/user.api.js";
import gameRouter from "./backend/api/game.api.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path"

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// router usage
app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);


// connecting to mongodb
const MONGODB_URL = "mongodb+srv://izzy:banana1234@wdp3.vo61l7v.mongodb.net/?retryWrites=true&w=majority&appName=WDP3"
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const frontend_dir = path.join(path.resolve(), "dist")

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});


app.listen(8000, function() {
    console.log("Starting server now...")
})
