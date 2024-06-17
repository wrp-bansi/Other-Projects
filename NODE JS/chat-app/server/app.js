const express = require('express');
const http = require('http');
const cors=require('cors')
const app = express();
const server = http.createServer(app);
const { Server} = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"],
        credentials:true
    }
});

app.use(cors())

app.get('/', (req, res) => {
  res.send("hello word");
});

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)

   socket.on("message",({ message, room})=>{
    console.log("Received data:", message);

    //  io.emit("recive-msg",data)
    // socket.broadcast.emit("recive-msg",data)
    socket.to(room).emit("recive-msg",message)

   })

   socket.on("join-room",(room)=>{
   socket.join(room)
   console.log(`user joing ${room}`)
})

socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
})

})

server.listen(3000, () => {
  console.log('listening on *:3000');
});