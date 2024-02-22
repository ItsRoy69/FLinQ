const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        trim: true,
        required: [true, "Post name is required"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "userId is required"]
    },
    username: {
        type: String,
        trim: true,
        required: [true, "username is required"]
    },
    image: {
        type: String,
        trim: true
    },
    postedAt: {
        type: Date,
        default: Date.now,
        required: [true, "date is required"]
    }

}, { timestamps: true });

module.exports = mongoose.model('PostModel', postSchema);
