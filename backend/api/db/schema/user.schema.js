import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    pass: String,
    age: {
        type: Number,
        default: () =>Math.ceil(Math.random()* 100)
    }
}, { collection: "users"})