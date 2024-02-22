const { default: mongoose } = require('mongoose');
const JobModel = require('../models/jobsModel');

// Get all job posts
const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find({});
        if (!jobs) {
            throw new Error("Could not fetch jobs");
        }
        res.status(200).json({ message: "Fetched all jobs", result: jobs });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// Get job post by id
const getJobsById = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const jobExist = await JobModel.exists({ _id: _id });
        if (!jobExist) return res.status(404).json({ message: "Job not found" });
        const job = await JobModel.findOne({ _id });
        if (!job) {
            throw new Error("Could not fetch job");
        }
        res.status(200).json({ message: "Fetched job", result: job });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// Create a new job post
const addJobs = async (req, res) => {
    try {
        const { userId: _id, icon, companyName, jobRole, location, amount, desc, apply, partOrFullTime } = req.body;

        const newJobData = {
            icon,
            userId: _id,
            companyName,
            jobRole,
            location,
            amount,
            desc,
            apply,
            partOrFullTime,
        };

        const newJob = await JobModel.create(newJobData);
        res.status(201).json({ message: "Job created", result: newJob });

    } catch (error) {
        console.log(error?.message);
        res.status(400).json({ message: error?.message });
    }
};

// Edit a job post
const editJobs = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const jobExist = await JobModel.exists({ _id: _id });
        if (!jobExist) return res.status(404).json({ message: "Job not found" });
        const editedJob = await JobModel.findByIdAndUpdate(_id, req.body, { new: true });
        if (!editedJob) {
            throw new Error("Could not edit job");
        }
        // success
        res.status(200).json({ message: 'Job updated', result: editedJob });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// Get job posts by userId
const getUserJobs = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const userJobs = await JobModel.find({ userId: _id });
        res.status(200).json({ message: "Fetched Jobs by User", result: userJobs });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// Delete job post
const deleteJobs = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        const jobExist = await JobModel.exists({ _id: _id });
        if (!jobExist) {
            return res.status(404).json({ message: "Job doesn't exist" });
        }
        await JobModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "Job deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

module.exports = { getAllJobs, getJobsById, addJobs, editJobs, getUserJobs, deleteJobs };
