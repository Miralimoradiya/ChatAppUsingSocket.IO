import express from "express"; //app initialize
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors()
);


// for check
app.get("/", (req, res) => {
  res.send("hello world!");
});

const activeUsers = new Map();
const chatHistory = new Map();
const unreadMessages = new Map();


io.on("connection", (socket) => {
  console.log("Connected to server with socket id:", socket.id);  

// create user 
  socket.on("create_user", ({ email, password }) => {
    if (email && password) {
      activeUsers.set(socket.id, {
        email,
        password,
        socketId: socket.id,
      });
      io.emit("users_updated", Array.from(activeUsers.values()));
      io.emit("user_created", {socketId: socket.id, email  });
    }
  });


  // Handle private messaging
  socket.on("private_message", ({ recipientId, message }) => {
    const senderUser = activeUsers.get(socket.id);
    const senderUsername = senderUser ? senderUser.email : "Unknown";
    const chatKey = [socket.id, recipientId].sort().join("_");
    if (!chatHistory.has(chatKey)) {
      chatHistory.set(chatKey, []);
    }

    chatHistory.get(chatKey).push({ message, senderId: socket.id, senderName: senderUsername });
    if (!unreadMessages.has(recipientId)) {
      unreadMessages.set(recipientId, 0);
    }
    unreadMessages.set(recipientId, unreadMessages.get(recipientId) + 1);

    io.to(recipientId).emit("message_received", {
      message,
      senderId: socket.id,
      senderName: senderUsername,
    });
    socket.emit("message_sent", { recipientId, message });
  });

// chat history 
socket.on("get_chat_history", (recipientId) => {
    const chatKey = [socket.id, recipientId].sort().join("_");
    const history = chatHistory.get(chatKey) || [];
    socket.emit("chat_history", history);
    if (unreadMessages.has(recipientId)) {
      unreadMessages.delete(recipientId);
    }
    io.emit("users_updated", Array.from(activeUsers.values())); 
  });
  socket.on("get_unread_count", () => {
    socket.emit("unread_count", unreadMessages.get(socket.id) || 0);
  });
  
// message 
  socket.on("message", ({ room, message, userId }) => {
    if (room) {
      io.to(room).emit("message_received", {
        message,
        senderId: userId,
        senderName: activeUsers.get(userId)?.email,
      });
    } else {
      io.to(socket.id).emit("message_received", {
        message,
        senderId: socket.id,
        senderName: activeUsers.get(socket.id)?.email,
      });
    }
  });


  // disconnect 
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (activeUsers.has(socket.id)) {
      activeUsers.delete(socket.id);
      unreadMessages.delete(socket.id);
      io.emit("users_updated", Array.from(activeUsers.values()));
      io.emit("user_removed", socket.id);
    }
  });

});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});