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

// middlewares
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.send("Welcome to Flinq server"));
app.use('/user', userRoute);
app.use('/post', postRoute);

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectToDb();

// listen to PORT
app.listen(PORT, console.log(`Server is running @ PORT ${PORT}`));
