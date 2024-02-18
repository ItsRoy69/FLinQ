const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST a new chat message
router.post('/messages', chatController.postMessage);

// GET all chat messages
router.get('/messages', chatController.getAllMessages);

module.exports = router;
