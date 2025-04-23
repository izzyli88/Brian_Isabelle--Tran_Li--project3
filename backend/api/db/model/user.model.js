import mongoose from "mongoose";
import {UserSchema } from "../schema/user.schema.js";

const userModel = mongoose.model("UserSchema", UserSchema)

// functional
export function findUser(username) {
    return userModel.findOne({
        username: username
    }).exec()
}

// functional
export function createUser(user) {
    return userModel.create(user);
}

// functional
export function getAllUsers() {
    return userModel.find().exec();
}

// functional
export function getAllSortedUsers(){
    return userModel.find().sort({ win: -1, loss: 1, username: 1 }).exec();
}

export function deleteAllUsers(){
    userModel.deleteMany().exec();
}