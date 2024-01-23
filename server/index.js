const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');

// middlewares
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.get('/',(req,res)=>res.send("Welcome to CollabMate Nodejs server"));
app.use('/user',userRoute);


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