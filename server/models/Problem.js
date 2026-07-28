const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
    type: String,
    required: true,
  },

  company: {
  type: String,
  default: "",
},

    status: {
      type: String,
      enum: ["Solved", "Unsolved"],
      default: "Unsolved",
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
    },

    favorite: {
  type: Boolean,
  default: false,
},

revision: {
  type: Boolean,
  default: false,
},

revisionCount: {
  type: Number,
  default: 0,
},

lastRevised: {
  type: Date,
  default: null,
},

solvedAt: {
  type: Date,
  default: null,
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Problem", problemSchema);