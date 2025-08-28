import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT;

// Store all users: { socketId: { lat, lng, color } }
const users = {};

// Generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Assign a random color when user connects
  const color = getRandomColor();

  socket.on("location", (coords) => {
    users[socket.id] = { ...coords, color };
    io.emit("users", users); // send all users with colors
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});