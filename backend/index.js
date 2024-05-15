const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const { Server } = require("socket.io");
const MongoDBSaveMessage = require("./helpers/saveMessage");
const MongoDBFetchMessage = require("./helpers/fetchMessage");
const BasicHelper = require("./helpers/helper");

app.use(cors()); // Add cors middleware

server = http.createServer(app);

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

// Create an io server and allow for CORS from any origin with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ConnectCaptain ~ CHAT BOT";
let allUsers = [];
let chatRoom = "";

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

    chatRoom = room;
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

  socket.on("leave_room", (data) => {
    console.log("leave_room", data);
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = BasicHelper.getUnixEpochCurrentTimeInSeconds();
    // Remove user from memory
    allUsers = BasicHelper.leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      roomName: room,
      sentBy: CHAT_BOT,
      messageContent: `${username} has left the chat`,
      sentAt: __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = BasicHelper.leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        messageContent: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});

const PORT = 7007;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
