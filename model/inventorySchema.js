const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Ingredient name (e.g., "Tomato", "Rice")
    quantity: { type: Number, required: true }, // Available stock
    unit: { type: String, enum: ['kg', 'pcs'], required: true }, // Measurement unit
    threshold: { type: Number, required: true }, // Minimum stock before alert
    updatedAt: { type: Date, default: Date.now() }, // Last update timestamp
    isAvailable: { type: Boolean, default: true }, // Auto-update based on threshold

});

const inventory = new mongoose.model("inventory", inventorySchema);
module.exports = inventory;