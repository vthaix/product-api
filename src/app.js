const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "product-api",
        mongodb: mongoose.connection.readyState === 1 ? "UP" : "DOWN",
    });
});

// Product routes
app.use("/api/products", productRoutes);

module.exports = app;