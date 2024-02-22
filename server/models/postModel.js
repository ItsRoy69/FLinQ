const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User ID is required"]
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"]
    },
    content: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, "Date is required"]
    },
    replies: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CommentModel'
    }]
}, { timestamps: true });

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
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserModel'
    }],
    comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('PostModel', postSchema);
