const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const chatRoute = require('./routes/chatRoute');


const chatNamespace = io.of('/chat');

chatNamespace.on('connection', (socket) => {
  console.log('A user connected to the chat namespace');

  socket.on('chat message', (msg) => {
    // Your socket handling logic here
    chatNamespace.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat namespace');
  });
});

// Middlewares
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send("Welcome to Flinq server"));
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/chat', chatRoute);

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectToDb();

// Listen to PORT
server.listen(PORT, () => {
    console.log(`Server is running @ PORT ${PORT}`);
});