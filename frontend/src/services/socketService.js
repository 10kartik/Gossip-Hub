const helper = require("../utils/helper");

class socketService {
  // send message to server
  sendMessage(socket, username, room, message) {
    if (message !== "") {
      const createdtime = helper.getUnixEpochCurrentTimeInSeconds();
      console.log("sendMessage", { username, room, message, createdtime });
      socket.emit("send_message", { username, room, message, createdtime });
    }
  }
}

module.exports = new socketService();
