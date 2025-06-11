const mongoose = require('mongoose');
const table = require('./tableSchema');

const reservationSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    tableNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'table'
    },
    reservationDate:{
        type:Date,
        required:true
    },
    peopleCount:{
        type:Number,
        required:false,
        default:1
    },
    status:{
        type:String,
        enum:['confirmed','cancelled']
    }

});

const reservation = new mongoose.model("reservation",reservationSchema);
module.exports = reservation;