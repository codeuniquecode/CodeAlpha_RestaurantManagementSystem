const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    qty:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:['Drinks','Momo','Khaja Set','Combo Platter'],
        required:false,
    }

});

const menu = new mongoose.model("menu",menuSchema);
module.exports = menu;