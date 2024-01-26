const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const MongoDBSaveMessage = require("./helpers/saveMessage");
const MongoDBFetchMessage = require("./helpers/fetchMessage");
const BasicHelper = require("./helpers/helper");

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ConnectCaptain ~ CHAT BOT";
let allUsers = [];

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    let __createdtime__ = BasicHelper.getUnixEpochCurrentTimeInSeconds();
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      messageContent: `${username} has joined the chat room`,
      sentBy: CHAT_BOT,
      sentAt: __createdtime__,
      roomName: room,
    });

    // Send message to user that just joined
    socket.emit("receive_message", {
      messageContent: `Welcome ${username}`,
      sentBy: CHAT_BOT,
      sentAt: __createdtime__,
      roomName: room,
    });

    // Send all unique users in room to all users in room
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    MongoDBFetchMessage(room)
      .then((response) => {
        socket.emit("fetch_messages", response);
      })
      .catch((err) => console.log(err));
  });

  socket.on("send_message", (data) => {
    const { message, username, room, createdtime } = data;

    const newData = {
      messageContent: message,
      sentBy: username,
      sentAt: createdtime,
      roomName: room,
    };

    console.log("send_message params", newData);

    io.in(room).emit("receive_message", newData); // Send to all users in room, including sender

    MongoDBSaveMessage(createdtime, message, username, room)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });
});

const PORT = 7007;
server.listen(PORT, () => `Server is running on port ${PORT}`);
