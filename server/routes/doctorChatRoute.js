const express = require('express');
const router = express.Router();
const doctorChatController = require('../controllers/doctorChatController');

// POST a new chat message
router.post('/messages', doctorChatController.postMessage);

// GET chat messages by user ID
router.get('/messages/:senderId/:receiverId', doctorChatController.getMessagesByUserId);

module.exports = router;
