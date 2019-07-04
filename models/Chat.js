const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Chat", ChatSchema);
