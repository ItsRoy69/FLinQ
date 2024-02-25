const Group = require('../models/groupModel');
const User = require('../models/userModel')

// Create a new group and add a message
const createGroupAndAddMessage = async (req, res) => {
    try {
        const { groupName, sender, message } = req.body;
        console.log(req.body);
        const existingGroup = await Group.findOne({ name: groupName });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group already exists' });
        }
        const newGroup = new Group({ name: groupName });

        newGroup.members.push(sender);

        if (message) {
            newGroup.messages.push({
                sender,
                message,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await newGroup.save();

        req.io.of('/group').to(newGroup._id).emit('chat message', { sender, message });

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error('Error creating group or adding message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Join an existing group and add a message
const joinGroupAndAddMessage = async (req, res) => {
    try {
        const { groupId, senderId, message } = req.body;
        console.log(groupId, senderId, message)

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Add the user to the group members
        group.members.push(senderId);
        await group.save();

        // Add the message to the existing group
        group.messages.push({ sender: senderId, message });
        await group.save();
        console.log(group)
        const user = await User.findById(senderId)
        console.log(user);
        if (!user) {
            console.log("user not found")
        }

        // Emit the chat message
        req.io.of('/group').to(groupId).emit('chat message', { sender: user.username, message });

        res.status(200).json({ message: 'User joined group and message sent successfully', group, user });
    } catch (error) {
        console.error('Error joining group or adding message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all groups
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json({ groups });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createGroupAndAddMessage, joinGroupAndAddMessage, getAllGroups }