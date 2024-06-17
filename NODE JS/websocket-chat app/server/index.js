const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.get('/', (req, res) => {
    res.send("Welcome to the chat server");
});

let socketConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket) {
    console.log('A user connected', socket.id);
    socketConnected.add(socket.id);
    io.emit('client-total', socketConnected.size);

    socket.on('disconnect', () => {
        console.log('that socket disconnect', socket.id);
        socketConnected.delete(socket.id);
        io.emit('client-total', socketConnected.size);
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data);
    });

    socket.on('typing', (userName) => {
        socket.broadcast.emit('feedback', { feedback: `${userName} is typing...` });
      });
      socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
      });
}

server.listen(9001, () => {
    console.log("server running");
});
