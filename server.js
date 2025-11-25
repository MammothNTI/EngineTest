// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (index.html, client.js, style.css)
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
