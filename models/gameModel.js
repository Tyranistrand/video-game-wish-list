import { Double } from "mongodb";
import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: new Date().toISOString(),
  },
  currentPrice: {
    type: Double,
    required: false,
  },
});

export const Game = mongoose.model("Game", gamesSchema);
