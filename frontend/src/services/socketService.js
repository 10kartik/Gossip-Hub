import helper from "../utils/helper.js";

class socketService {
  sendMessage(socket, username, room, message) {
    if (message !== "") {
      const createdtime = helper.getUnixEpochCurrentTimeInSeconds();
      socket.emit("send_message", { username, room, message, createdtime });
    }
  }
}

export default new socketService();
