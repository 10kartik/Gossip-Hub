const ChannelMessageModel = require("./ChannelMessageModel");

async function fetchDetails(roomName) {
  const records = await ChannelMessageModel.find({ roomName })
    .sort("sentAt")
    .limit(100);

  return records;
}

module.exports = fetchDetails;
