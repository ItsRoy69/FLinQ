const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');

//create a new group and add a message
router.post('/creategroup', groupChatController.createGroupAndAddMessage);

//  join an existing group and add a message
router.post('/joingroup', groupChatController.joinGroupAndAddMessage);

// get all groups
router.get('/groups', groupChatController.getAllGroups);

module.exports = router;
