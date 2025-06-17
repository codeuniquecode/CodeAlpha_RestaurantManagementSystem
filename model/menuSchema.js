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
    },
    ingredients: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        required: true
      },
      unit: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }}]

});

const menu = new mongoose.model("menu",menuSchema);
module.exports = menu;