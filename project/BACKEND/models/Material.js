const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    section: { type: String },
    image: { type: String, default: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80" },
    seller: {
        name: { type: String },
        rating: { type: Number },
        yearsActive: { type: Number },
        phone: { type: String },
        email: { type: String },
        address: { type: String },
        certifications: { type: [String] }
    }
}, { timestamps: true });

const Material = mongoose.model('Material', MaterialSchema);
module.exports = Material;
