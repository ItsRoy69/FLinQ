const DocChatMessage = require('../models/doctorChatModel');

// POST a new chat message
const postMessage = async (req, res) => {
  try {
    const { senderId, senderUsername, receiverId, receiverUsername, text, timestamp } = req.body;
    const newMessage = new DocChatMessage({ senderId, senderUsername, receiverId, receiverUsername, text, timestamp });
    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', result: savedMessage });
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET chat messages by user ID
const getMessagesByUserId = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await DocChatMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(200).json({ message: 'Fetched messages by user ID', result: messages });
  } catch (error) {
    console.error('Error fetching messages by user ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { postMessage, getMessagesByUserId };
