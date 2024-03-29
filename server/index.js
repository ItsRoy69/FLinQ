const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
const doctorChatRoute = require('./routes/doctorChatRoute');

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

const docChatNamespace = io.of('/doctor');
docChatNamespace.on('connection', (socket) => {
  console.log('A user connected to the doctors chat namespace');

  socket.on('chat message', (msg) => {
    docChatNamespace.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat namespace');
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
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.get('/', (req, res) => res.send("Welcome to Flinq server"));
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/chat', chatRoute);
app.use('/group', groupRoute);
app.use('/jobs', jobsRoute);
app.use('/events', eventsRoute);
app.use('/doctor', doctorChatRoute);

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
