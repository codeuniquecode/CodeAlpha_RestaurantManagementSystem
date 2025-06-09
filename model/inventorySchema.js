const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    
});

const inventory = new mongoose.model("inventory",inventorySchema);
module.exports = inventory;