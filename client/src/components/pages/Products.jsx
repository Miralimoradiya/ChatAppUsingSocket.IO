import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

const Products = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setsocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomname, setRoomname] = useState("");

  // const socket = useMemo(() => io("http://localhost:3000",{
  //   withCredentials : true,
  // }), []);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setsocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("message_received", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handlesubmit = (e) => {
    e.preventDefault();
      socket.emit("message", { message, room });
      setMessage(""); // Clear message input
  };
  const joinroomhandler = (e) => {
    e.preventDefault();
      socket.emit("join-room", roomname);
      setRoomname(""); 
  };
  return (
    <>
      <Container>
        <Typography>{socketId}</Typography>

        <form onSubmit={joinroomhandler}>
          <TextField
            value={roomname}
            onChange={(e) => setRoomname(e.target.value)}
            fullWidth
            label="Room Name"
            variant="outlined"
          />
          <Button type="submit">join</Button>
        </form>



        <form onSubmit={handlesubmit}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            label="message"
            variant="outlined"
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            fullWidth
            label="room"
            variant="outlined"
          />
          <Button type="submit">send</Button>
        </form>
        <Stack>
          {messages.map((msg, index) => (
            <Typography key={index}>{msg}</Typography>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Products;
