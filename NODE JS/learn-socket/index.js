const http=require('http')
const express=require('express')
const app=express()
const path=require('path')
const server=http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})



let socketCoonected=new Set()

io.on('connection',oncoonected)

function oncoonected(socket){
    console.log('A user connected',socket.id);
    socketCoonected.add(socket.id)
io.emit('client-total', socketCoonected.size)

    socket.on('disconnect',()=>{
        console.log('that socet dissconnect',socket.id)
        socketCoonected.delete(socket.id)
        io.emit('client-total', socketCoonected.size)
    })
    socket.on('message', (data) => {

        socket.broadcast.emit('chat-message', data);
    });
    socket.on('feedback', (data) => {

        socket.broadcast.emit('feedback', data);
    });
}

server.listen(9000,()=>{
    console.log("server running")
})