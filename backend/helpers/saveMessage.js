const ChannelMessageModel = require("./ChannelMessageModel");

async function perform(sentAt, messageContent, sentBy, roomName) {
  const record = new ChannelMessageModel({
    sentAt,
    messageContent,
    sentBy,
    roomName,
  });

  const result = await record.save();

  return result;
}

module.exports = perform;
