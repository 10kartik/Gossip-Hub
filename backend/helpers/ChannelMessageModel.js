const mongoose = require("mongoose");
const mongoConnection = require("./mongoConnection");
mongoConnection;

const messageSchema = new mongoose.Schema({
  sentAt: {
    type: String,
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gossip-Hub-DB", messageSchema);
