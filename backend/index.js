const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle user joining a specific room
  socket.on('joinRoom', (room) => {
    socket.join(room);  // The user joins the specified room
    console.log(`User joined room: ${room}`);
  });

  // Handle sending a message to a specific room
  socket.on('sendMessage', (message, room) => {
    io.to(room).emit('message', message);  // Sends the message to everyone in the room
    console.log(`Message sent to room ${room}: ${message}`);
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});

