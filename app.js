const express = require("express");
const app = express();


const socketio = require("socket.io")
const http = require("http");
const server = http.createServer(app) //handsake between http and express
const io = socketio(server)

const path = require("path");
app.set("view engine", "ejs") // default view engine
// app.set(express.static(path.join(__dirname,"public"))) // set custom view engine


io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
         io.emit("receive-location", { id: socket.id, ...data })
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnect",socket.id)
    })
 })

app.get("/", (req, res) => {
    res.render("index");
})


server.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
})
