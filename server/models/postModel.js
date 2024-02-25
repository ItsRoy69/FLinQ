const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    replies: [replySchema],
});

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        trim: true,
        required: [true, "Post name is required"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User ID is required"]
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"]
    },
    image: {
        type: String,
        trim: true
    },
    postedAt: {
        type: Date,
        default: Date.now,
        required: [true, "date is required"]
    },
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserModel'
    }],
    comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('PostModel', postSchema);
