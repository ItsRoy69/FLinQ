const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    icon: {
        type: String,
        trim: true,
        required: [true, "Icon is required"]
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
    jobRole: {
        type: String,
        trim: true,
        required: [true, "Job role is required"]
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Location is required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    desc: {
        type: String,
        trim: true,
        required: [true, "Description is required"]
    },
    apply: {
        type: String,
        trim: true,
        required: [true, "User has clicked applied or not"]
    },
    partOrFullTime: {
        type: String,
        enum: ['part-time', 'full-time'],
        required: [true, "Job type is required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('JobModel', jobSchema);
