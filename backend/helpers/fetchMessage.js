const ChannelMessageModel = require("./ChannelMessageModel");

async function fetchDetails(roomName) {
  const records = await ChannelMessageModel.find({ roomName }).sort("sentAt");

  return records;
}

module.exports = fetchDetails;
