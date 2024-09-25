require('dotenv').config(); // Load environment variables from .env file (for local development)

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./app_api/routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; // Read MongoDB URI from environment variable

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/api", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});