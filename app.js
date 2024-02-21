const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("client")));

let waitingPlayers = [];
let matchedPlayers = [];

// Function to handle player matching
function handlePlayerMatching(player) {
  waitingPlayers.push(player);

  if (waitingPlayers.length >= 2) {
    const [player1, player2] = waitingPlayers.splice(0, 2);

    const match = {
      p1: { name: player1.name, char: player1.character, amI: false },
      p2: { name: player2.name, char: player2.character, amI: true },
    };

    matchedPlayers.push(match);

    io.emit("s", { allPlayers: matchedPlayers }, () => {
      console.log(matchedPlayers);
      matchedPlayers = [];
    });
  }
}

// Handle a new connection
io.on("connection", (socket) => {
  // Listen for the "find" event from a client
  socket.on("find", (playerInfo) => {
    try {
      // If player name provided
      if (playerInfo.name != null) {
        // Handle player matching
        handlePlayerMatching(playerInfo);

        // Listen for the "positionUpdate" event from a client
        socket.on("positionUpdate", (positionInfo) => {
          // Emit the updated player positions to all clients
          io.emit("Update", { allPosition: positionInfo });

          // Log the updated player positions
          console.log(positionInfo);
        });
      }
    } catch (error) {
      console.error("Error handling player:", error.message);
    }
  });
});

// Start the server on port 3000
const PORT = 3300;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
