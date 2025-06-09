const mongoose = require('mongoose');
const Table = require('./tableSchema');

const orderSchema = new mongoose.Schema({
    orderItems:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    tableNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Table,
        required:true
    }

});

const order = new mongoose.model("order",orderSchema);
module.exports = order;