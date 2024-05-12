import { Server } from "socket.io";
import http from "http";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new-user", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
    io.emit("online-users", Object.keys(userSocketMap));
  });

  socket.on("new-message", (message) => {
    console.log("New message received:", message);
    io.emit("new-message", message);
  });

  socket.on("disconnect", () => {

    Object.keys(userSocketMap).forEach((userId) => {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        console.log(`User ${userId} disconnected`);
        io.emit("online-users", Object.keys(userSocketMap));
      }
    });
  });

});

export default io;
