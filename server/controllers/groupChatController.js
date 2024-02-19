const Group = require('../models/groupModel');

// Create a new group and add a message
const createGroupAndAddMessage = async (req, res) => {
    try {
        const { groupName, sender, message } = req.body;
        console.log(req.body);
        // Check if the group already exists
        const existingGroup = await Group.findOne({ name: groupName });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group already exists' });
        }

        // Create a new group
        const newGroup = new Group({ name: groupName });

        // Add the user to the group members
        newGroup.members.push(sender);

        // Add the message to the newly created group if provided
        if (message) {
            newGroup.messages.push({ sender, message });
        }

        await newGroup.save();

        // Emit the chat message
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
        const { groupId, sender, message } = req.body;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the user is already a member of the group
        if (group.members.includes(sender)) {
            return res.status(400).json({ message: 'User is already a member of the group' });
        }

        // Add the user to the group members
        group.members.push(sender);
        await group.save();

        // Add the message to the existing group
        group.messages.push({ sender, message });
        await group.save();

        // Emit the chat message
        req.io.of('/group').to(groupId).emit('chat message', { sender, message });

        res.status(200).json({ message: 'User joined group and message sent successfully', group });
    } catch (error) {
        console.error('Error joining group or adding message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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