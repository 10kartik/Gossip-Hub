const mongoose = require("mongoose");
const mongoConnection = require("./mongoConnection");
mongoConnection;

const messageSchema = new mongoose.Schema({
  sentAt: {
    type: Date,
    required: true,
    default: Date("<YYYY-mm-dd>"),
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

module.exports = mongoose.model("Channel-Message-Schema", messageSchema);
