require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect MongoDB and start server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Product API running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    });