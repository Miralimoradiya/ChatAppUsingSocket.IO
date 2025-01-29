# Chat Application with **Socket.io**, **ReactJS**, **Node.js**

This is a simple real-time chat application using **Socket.io**, **ReactJS**, and **Node.js**. The app allows users to log in, create a profile, and communicate with each other in real-time, much like WhatsApp. The app works across different browsers, allowing two or more users to chat instantly.

---


## :globe_with_meridians: **Introduction**

This application allows multiple users to chat in real-time across different browsers. After logging in, the user will be prompted to create a profile, which includes their username. Once a user is created, they can chat with other users who are logged in as well. The app uses **Socket.io** for real-time communication between the frontend and backend, **ReactJS** for the user interface, and **Node.js** with **Express** as the backend.

---

## :rocket: **Technologies Used**

- **Frontend:**
  - [ReactJS](https://reactjs.org/)
  - [Socket.io Client](https://socket.io/docs/v4/client-api/)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Socket.io Server](https://socket.io/docs/v4/server-api/)
  - [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
  - [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
  - [jsonWebToken](https://jwt.io/)

- **Others:**
  - NPM for package management
  - HTML, CSS, Tailwind (with styled-components for styling)
  - react-router-dom (for routing)
  - react-icons(for add icons)
  - react-chat-elements(for better ui like chat)

---

## :wrench: **Installation**

### Step 1: Clone the repository
First, clone the repository to your local machine.

```bash
git clone https://github.com/yourusername/chat-app.git


### Step 2: Install Backend Dependencies

Navigate to the `server` folder and install the required packages.

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

Navigate to the `client` folder and install the required packages.

```bash
cd client
npm install
```

### Step 4: Set Up and Start the Backend Server

Go back to the server directory and start the backend server.

```bash
cd server
npm start
```

### Step 5: Set Up and Start the Frontend Server

Go to the client directory and start the React app.

```bash
cd client
npm start
```

---

## :computer: **How to Use**

1. **Login Page:**  
   Upon loading the application in the browser, you will see the login page. Enter a valid username and click **Login**.

2. **Create a User:**  
   Once logged in, you will be prompted to create your user profile by entering a username. This username will be visible to others during the chat.

3. **Start Chatting:**  
   Once your profile is created, you will be redirected to the chat interface. You can open another browser (or tab) and log in with a different user to start chatting in real-time. Messages will be exchanged instantly between the two users.

4. **Real-Time Communication:**  
   The application supports **real-time communication**, so messages sent by one user will be immediately visible to the other user.

5. **Cross-Browser Communication:**  
   To test real-time messaging, open the app in two different browsers . You can then chat back and forth, and the messages will be synchronized across both.

---

## :file_folder: **Directory Structure**

```
chat-app/
├── client/                    # ReactJS client
│   ├── src/                   
│   │   ├── components/        # React components like Login, Chat, etc.
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # React entry point
│   └── public/                
├── server/                    # Node.js backend
│   ├── app.js               # Main server file
│   └── package.json           # Backend dependencies
├── .gitignore                 # Git ignore file
├── README.md                  # Project documentation
└── package.json               # Root dependencies
```

---

## :star2: **Features**

- **User Authentication:**  
  Log in with a unique username and create a user profile.

- **Real-Time Chat:**  
  Real-time messaging with **Socket.io**, so messages are instantly sent and received.

- **Cross-Browser Support:**  
  Open the chat in multiple browsers or tabs to see real-time communication.

- **User List:**  
  A list of users who are currently online and can be messaged.

- **Message History:**  
  Messages between users are visible within the session, but the app does not yet save messages to a database for persistence.

- **Pending Messages:**  
  User can see how many messages are pending from particular user.

---

## :heart: **Acknowledgements**

- [Socket.io](https://socket.io/) for real-time communication.
- [ReactJS](https://reactjs.org/) for building the frontend.
- [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) for the backend.
```
