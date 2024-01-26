class BasicHelper {
  convertToSeconds(millisecondsTimestamp) {
    return Math.floor(millisecondsTimestamp / 1000);
  }

  getUnixEpochCurrentTimeInSeconds() {
    return this.convertToSeconds(Date.now());
  }
}

module.exports = new BasicHelper();
