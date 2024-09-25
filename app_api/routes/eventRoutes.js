const express = require("express");
const router = express.Router();
const Event = require('../models/Event'); // Correct path to your Event model

// Get all events
router.get("/getAll", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new event
router.post("/add", async (req, res) => {
    const event = new Event({
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        remind: req.body.remind
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes like delete, update, etc. would go here

module.exports = router;
