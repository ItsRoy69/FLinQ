const mongoose = require('mongoose');

const docchatSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderUsername: { type: String, required: true },
  receiverId: { type: String, required: true },
  receiverUsername: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const DocChatMessage = mongoose.model('DocChatMessage', docchatSchema);

module.exports = DocChatMessage;
