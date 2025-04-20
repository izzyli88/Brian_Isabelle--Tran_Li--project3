import mongoose from "mongoose";
import {UserSchema } from "../schema/user.schema.js";

const userModel = mongoose.model("UserSchema", UserSchema)

export function findUser(username) {
    return userModel.findOne({
        username: username
    }).exec()
}


export function createUser(user) {
    return userModel.create(user);
}