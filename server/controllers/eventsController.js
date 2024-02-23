const { default: mongoose } = require('mongoose');
const EventModel = require('../models/eventsModel');

// get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find({});
        if (!events) {
            throw new Error("Could not fetch events");
        }
        res.status(200).json({ message: "Fetched all events", result: events });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// get event by id
const getEventsById = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const eventExist = await EventModel.exists({ _id: _id });
        if (!eventExist) return res.status(404).json({ message: "Event not found" });
        const event = await EventModel.findOne({ _id });
        if (!event) {
            throw new Error("Could not fetch event");
        }
        res.status(200).json({ message: "Fetched event", result: event });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// create a new event
const addEvents = async (req, res) => {
    try {
        const { userId: _id, companyId, eventName, companyName, eventPic, timeAllocated, location, description, perks } = req.body;

        const newEventData = {
            companyId,
            eventName,
            companyName,
            eventPic,
            timeAllocated,
            userId: _id,
            location,
            description,
            perks,
        };

        const newEvent = await EventModel.create(newEventData);
        res.status(201).json({ message: "Event created", result: newEvent });

    } catch (error) {
        console.log(error?.message);
        res.status(400).json({ message: error?.message });
    }
};

// edit an event
const editEvents = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const eventExist = await EventModel.exists({ _id: _id });
        if (!eventExist) return res.status(404).json({ message: "Event not found" });
        const editedEvent = await EventModel.findByIdAndUpdate(_id, req.body, { new: true });
        if (!editedEvent) {
            throw new Error("Could not edit event");
        }
        // success
        res.status(200).json({ message: 'Event updated', result: editedEvent });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }

}

//get events by companyId
const getCompanyEvents = async (req, res) => {
    try {
        const { id: companyId } = req.params;

        if (!companyId || typeof companyId !== 'string') {
            return res.status(422).json({ message: "Company ID is not a valid string" });
        }
        const companyEvents = await EventModel.find({ companyId });

        res.status(200).json({ message: "Fetched Events by Company", result: companyEvents });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
};


// get events by userId
const getUserEvents = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "User ID not valid" });
        }
        const userEvents = await EventModel.find({ userId: _id });
        res.status(200).json({ message: "Fetched Events by Company", result: userEvents });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}
// delete event
const deleteEvents = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const eventExist = await EventModel.exists({ _id: _id });
        if (!eventExist) {
            return res.status(404).json({ message: "Event doesn't exist" });
        }
        await EventModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

module.exports = { getAllEvents, getUserEvents, getEventsById, addEvents, getCompanyEvents, editEvents, deleteEvents };
