const mongoose = require('mongoose');
const Table = require('./tableSchema');
const menu = require('./menuSchema');

const orderSchema = new mongoose.Schema({
    orderItems:[{
        //this should be in array
        items:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'menu'
        },
    qty:{
        type:Number,
        required:true
    }
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
   
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    tableNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Table',
        required:true
    },
    status:{
        type:String,
        enum:['paid','unpaid'],
        required:true,
        default:'unpaid'
    },

});

const order = new mongoose.model("order",orderSchema);
module.exports = order;