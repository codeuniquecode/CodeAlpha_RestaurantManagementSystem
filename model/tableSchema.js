const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNo:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['occupied','reserved','available'],
        default:'available'
    },
    
});

const table = new mongoose.model("table",tableSchema);
module.exports = table;