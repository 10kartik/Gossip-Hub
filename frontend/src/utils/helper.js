class Helper {
  // Method to convert milliseconds timestamp to seconds
  convertToSeconds(millisecondsTimestamp) {
    return Math.floor(millisecondsTimestamp / 1000);
  }

  getUnixEpochCurrentTimeInSeconds() {
    return this.convertToSeconds(Date.now());
  }

  // Convert from Epoch to DD-MM-YYYY MM:HH AM/PM format
  convertEpochToDateTime(epoch) {
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);
    return formattedTime;
  }
}

// Export the instance for use in other files
module.exports = new Helper();
