const ChatMessage = require('../models/chatModel');

// POST a new chat message
const postMessage = async (req, res) => {
    try {
      const { sender, text, timestamp } = req.body;
      const newMessage = new ChatMessage({ sender, text, timestamp });
      await newMessage.save();
      res.status(201).json({ message: 'Message sent successfully', result: newMessage });
    } catch (error) {
      console.error('Error posting message:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

// GET all chat messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.status(200).json({ message: "Fetched all messages", result: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { postMessage, getAllMessages };
