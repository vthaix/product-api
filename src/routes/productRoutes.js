const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve products",
            error: error.message,
        });
    }
});

// GET product by pid
router.get("/:pid", async (req, res) => {
    try {
        const product = await Product.findOne({
            pid: req.params.pid,
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve product",
            error: error.message,
        });
    }
});

// CREATE product
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create product",
            error: error.message,
        });
    }
});

// UPDATE product
router.put("/:pid", async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ pid: req.params.pid },
            req.body, {
            new: true,
            runValidators: true,
        }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
});

// DELETE product
router.delete("/:pid", async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            pid: req.params.pid,
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message,
        });
    }
});

module.exports = router;