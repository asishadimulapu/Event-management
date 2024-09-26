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

// Get a single event by ID
router.get("/get/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an event by ID
router.patch("/update/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (req.body.title != null) {
            event.title = req.body.title;
        }
        if (req.body.location != null) {
            event.location = req.body.location;
        }
        if (req.body.date != null) {
            event.date = req.body.date;
        }
        if (req.body.remind != null) {
            event.remind = req.body.remind;
        }

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await event.remove();
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
