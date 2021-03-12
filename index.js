const express = require('express');
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000)

let users = [];

io.on("connection", function(socket) {
    console.log('Someone has just connectted with ID: ' + socket.id);
    socket.on('disconnect', function(){
        console.log('Disconected by ID: ' + socket.id);
    })
    socket.on("client-send-Username", function(data){
        if (users.indexOf(data) >= 0) {
            socket.emit('server-send-dki-thatbai')
        } 
        else {
            users.push(data)
            socket.Username = data
            socket.emit("server-send-dki-thanhcong", data)
            io.sockets.emit('server-send-danhsach-Users', users)
        }
    })
    socket.on("logout", function(){
        users.splice(
            users.indexOf(socket.Username), 1
        )
        socket.broadcast.emit('server-send-danhsach-Users', users)
    })

    socket.on("user-send-message", function(data){
        io.sockets.emit("server-send-message", {un: socket.Username, nd: data})
    })

    socket.on("toi-dang-go", function(){
        let s = socket.Username + " is typing..."
        socket.broadcast.emit("ai-do-dang-go", s)
    })

    socket.on("toi-ngung-go", function(){
        io.sockets.emit("ai-do-ngung-go")
    })
})

app.get("/", function(req, res){
    res.render("trangchu")
})