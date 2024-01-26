class BasicHelper {
  convertToSeconds(millisecondsTimestamp) {
    return Math.floor(millisecondsTimestamp / 1000);
  }

  getUnixEpochCurrentTimeInSeconds() {
    return this.convertToSeconds(Date.now());
  }

  leaveRoom(userID, chatRoomUsers) {
    return chatRoomUsers.filter((user) => user.id != userID);
  }
}

module.exports = new BasicHelper();
