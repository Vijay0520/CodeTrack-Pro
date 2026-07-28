const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },

  currentStreak: {
    type: Number,
    default: 0,
  },

  bestStreak: {
    type: Number,
    default: 0,
  },

  lastSolvedDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("UserStats", userStatsSchema);