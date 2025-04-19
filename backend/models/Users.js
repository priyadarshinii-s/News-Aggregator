const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  wallet: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  tokenBalance: {
    type: Number,
    default: 0,
  },

  profileImage: {
    type: String,
    default: "", 
  },

  role: {
    type: String,
    enum: ["user", "verifier"],
    default: "user",
  },

  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
