import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server and pass the app to it

//io variable used in msg controller
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Specify allowed origins to prevent CORS issues
  },
});

//hetper function 
export function getRecieverSocketId(userId) {   //pass user id of user as argument to recieve socketid of user
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

   // io.emit() is used to send events to all the connected clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle the disconnect event inside the connection listener
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

  });
});

export { io, app, server };
