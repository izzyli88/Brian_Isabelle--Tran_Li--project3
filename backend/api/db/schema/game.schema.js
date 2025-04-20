const mongoose = require('mongoose');

export const GameSchema = new Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  player1Board: {
    type: Array,
    required: true
  },
  player2Board: {
    type: Array,
  },
  moves: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    x: Number,
    y: Number,
    hit: Boolean
  }],
  currentTurn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['open', 'active', 'completed'],
    default: 'open'
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

