const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        trim: true,
        required: [true, "Event name is required"]
    },
    companyId: {
        type: String,
        trim: true,
        required: [true, "Company Id is required"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "userId is required"]
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, "Company name is required"]
    },
    eventPic: {
        type: String,
        trim: true
    },
    timeAllocated: {
        type: Date,
        required: [true, "Time allocated is required"]
    },
    booking: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('EventModel', eventSchema);
