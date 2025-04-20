import { Schema } from "mongoose";

export const GameSchema = new Schema({
  p1: {
    type: String,   // username
    required: true
  },
  p2: {
    type: String    // username
    // not required bc originally open
  },
  p1Board: {
    type: Array,
    required: true
  },
  p2Board: {
    type: Array,
    required: true
  },
  turn: {
    type: String, // username of p1  or p2
    required: true
  },
  status: {
    type: String,
    enum: ["Open", "Active", "Completed"],
    default: "Open",
  },
  winner: {
    type: String,
    default: "",
  }
}, { timestamps: true });
