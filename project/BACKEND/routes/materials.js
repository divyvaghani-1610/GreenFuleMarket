// const express = require('express');
// const router = express.Router();
// const Material = require('../models/Material'); // Mongoose model

// // Add a new material
// router.post('/add', async (req, res) => {
//     try {
//         const newMaterial = new Material(req.body);
//         await newMaterial.save();
//         res.status(201).json({ message: "Material listed successfully!", material: newMaterial });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to list material", error: error.message });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Material = require("../models/Material"); // Mongoose model


// Fetch all materials
router.get("/", async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch (error) {
        console.error("Error fetching materials:", error);
        res.status(500).json({ message: "Failed to fetch materials", error: error.message });
    }
});

// Add a new material
router.post("/", async (req, res) => {  // Changed '/add' to '/'
    try {
        const { name, category, price, quantity, unit, location, description, section, image, seller } = req.body;

        // Check if required fields are present
        if (!name || !category || !price || !quantity || !unit || !location || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newMaterial = new Material({
            name,
            category,
            price,
            quantity,
            unit,
            location,
            description,
            section,
            image,
            seller
        });

        await newMaterial.save();
        res.status(201).json({ message: "Material listed successfully!", material: newMaterial });

    } catch (error) {
        console.error("Error saving material:", error);
        res.status(500).json({ message: "Failed to list material", error: error.message });
    }
});

module.exports = router;
