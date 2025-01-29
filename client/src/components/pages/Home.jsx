import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import "./Head.css";

const Home = () => {
  // user create
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [createdEmail, setCreatedEmail] = useState("");
  // functionality
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [hiddenUsers, setHiddenUsers] = useState(new Set());
  const [unreadCounts, setUnreadCounts] = useState(new Map());

  const socket = useMemo(() => io("http://localhost:5000", {
    transports: ['websocket'] 
  }), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server with id:", socket.id);
      setUserId(socket.id);
    });
    
    socket.on("user_created", (data) => {
      if (data.socketId === socket.id) {
        setUserCreated(true);
        setCreatedEmail(data.email);
        setHiddenUsers((prev) => new Set(prev).add(data.socketId));
      } else {
        setUsers((prevUsers) => {
          const userMap = new Map(
            prevUsers.map((user) => [user.socketId, user])
          );
          userMap.set(data.socketId, {
            socketId: data.socketId,
            email: data.email,
            status: "online",
          });
          return Array.from(userMap.values());
        });
      }
    });

    socket.on("message_received", (msg) => {
      if (msg.senderId === userId || msg.senderId === selectedUserId) {
        setMessages((prevMessages) => {
          const exists = prevMessages.some(
            (message) =>
              message.message === msg.message && message.senderId === msg.senderId
          );
          if (exists) {
            return prevMessages;
          }
          return [...prevMessages, msg];
        });
      } else if (msg.senderId !== userId) {
        setUnreadCounts((prev) => {
          const newCounts = new Map(prev);
          newCounts.set(msg.senderId, (newCounts.get(msg.senderId) || 0) + 1);
          return newCounts;
        });
      }
    });

    socket.on("chat_history", (history) => {
      setMessages(history);
      setUnreadCounts((prev) => {
        const newCounts = new Map(prev);
        newCounts.set(selectedUserId, 0);
        return newCounts;
      });
    });

    socket.on("unread_count", (count) => {
      setUnreadCounts((prev) => {
        const newCounts = new Map(prev);
        newCounts.set(socket.id, count);
        return newCounts;
      });
    });

    socket.on("users_updated", (userList) => {
      const userMap = new Map(users.map((user) => [user.socketId, user]));
      userList.forEach((user) => {
        userMap.set(user.socketId, user);
      });
      setUsers(Array.from(userMap.values()));
    });

    socket.on("user_removed", (socketId) => {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.socketId !== socketId)
      );
      setUnreadCounts((prev) => {
        const newCounts = new Map(prev);
        newCounts.delete(socketId);
        return newCounts;
      });
    });


    return () => {
      socket.off("connect");
      socket.off("message_received");
      socket.off("chat_history");
      socket.off("users_updated");
      socket.off("user_created");
      socket.off("user_removed");
      socket.off("unread_count");
    };
  }, [socket, users, selectedUserId, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("Please select a user");
      return;
    }
    const newMessage = {
      message,
      senderId: userId,
      senderName: createdEmail,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("private_message", { recipientId: selectedUserId, message });
    setMessage("");
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (email && password) {
      socket.emit("create_user", { email, password });
      setEmail("");
      setPassword("");
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    socket.emit("get_chat_history", userId);
  };

  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => !hiddenUsers.has(user.socketId))
        .filter((user) =>
          user.email.toLowerCase().includes(search.toLowerCase())
        ),
    [search, users, hiddenUsers]
  );

  return (
    <div className="mainhead">
    {!userCreated ? (
      <div className="centered-form">
        <div className="form-box">
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleCreateUser}>
            <label htmlFor="">email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="inputemail"
              required
            />
            <label htmlFor="">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="inputemail"
              required
            />
            <button
              type="submit"
              className="button button-primary"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div className="chatpage">
        <div className="sidebar">
          <div className="form-title">User</div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="inputemail search-input"
          />
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li
                key={user.socketId}
                onClick={() => handleUserClick(user.socketId)}
                className={`user-item ${
                  selectedUserId === user.socketId ? "selected-user" : ""
                }`}
              >
                <div className="userdata">
                  <img
                    src="https://picsum.photos/200/300"
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <div className="unreadmsg">
                    <p className="user-email">{user.email}</p>
                    {unreadCounts.get(user.socketId) > 0 && (
                      <span className="unread-count">
                        {unreadCounts.get(user.socketId)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-box">
          <div className="chat-header">
            <img
              src="https://picsum.photos/200/300"
              alt="User"
            />
            <span>{createdEmail}</span>
          </div>

          <div className="chat-content">
            <MessageList
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages.map((msg) => ({
                position: msg.senderId === userId ? 'right' : 'left',
                type: 'text',
                text: msg.message,
                date: new Date(),
                title: msg.senderName,
              }))}
            />
          </div>

          <div className="input-group">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="input"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="button button-secondary"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;