const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

const server = http.createServer(app);

const io = new Server(server);

let arr = [];
let playerArr = [];

io.on("connection", (socket) => {
  socket.on("find", (e) => {
    if (e.name != null) {
      arr.push({ name: e.name, char: e.character });
      if (arr.length >= 2) {
        let p1obj = {
          p1name: arr[0].name,
          p1char: arr[0].char,
        };
        let p2obj = {
          p2name: arr[1].name,
          p2char: arr[1].char,
        };
        let obj = {
          p1: p1obj,
          p2: p2obj,
        };
        playerArr.push(obj);

        arr.splice(0,2);

        io.emit("s",{ allPlayers:playerArr})
        console.log(allPlayers)
      }

    }
  });
});

app.use(express.static("client"));

app.listen(3000);
