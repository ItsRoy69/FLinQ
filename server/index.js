const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const chatRoute = require('./routes/chatRoute');
const groupRoute = require('./routes/groupRoute');
const jobsRoute = require('./routes/jobsRoute');
const eventsRoute = require('./routes/eventsRoute');

// Socket Chat
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('A user connected to the chat namespace');

  socket.on('chat message', (msg) => {
    chatNamespace.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat namespace');
  });
});

const chatGroupspace = io.of('/group');
chatGroupspace.on('connection', (socket) => {
  console.log('A user connected to the chat Groupspace');

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  socket.on('chat message', (data) => {
    chatGroupspace.to(data.groupId).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat Groupspace');
  });
});

// Middleware to set io globally
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173", "https://flinq.vercel.app"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true })); // images that are going to be send have limit 30mb
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.get('/', (req, res) => res.send("Welcome to Flinq server"));
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/chat', chatRoute);
app.use('/group', groupRoute);
app.use('/jobs', jobsRoute);
app.use('/events', eventsRoute);

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
