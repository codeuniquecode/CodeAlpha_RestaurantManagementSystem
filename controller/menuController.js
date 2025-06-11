const menu = require("../model/menuSchema");
const mongoose = require('mongoose');
exports.addItems = async(req,res)=>{
    // const {name,qty,price,category} = req.body;
    try {
         const addItems = await menu.create(req.body);
         if(!addItems){
            return res.status(404).json({message:"error in adding items to menu"});
         }
         return res.status(201).json({message:"items added in menu"});
    } catch (error) {
        console.log(error);
        if(error.name==='ValidationError'){
            return res.status(400).json({message:error.message});
        }
        return res.status(500).json({message:"internal server error"});
    }
}
exports.seeItems = async(req,res)=>{
    const items = await menu.find();
    return res.status(200).json({message:items});
}
exports.updateItems= async(req,res)=>{
    // res.send(req.query.id);
    try {
        const updateItem = await menu.findByIdAndUpdate(req.query.id,req.body,{
            runValidators:true
        });
        if(!updateItem){
            return res.status(404).json({message:"error in updating items in menu"});
        }
        return res.status(200).json({message:"item updated"});
    } catch (error) {
         if(error.name==='ValidationError'){
            return res.status(400).json({message:error.message});
        }
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
exports.deleteItems = async(req,res)=>{
    try {
        const deleteItem = await menu.findByIdAndDelete(req.query.id);
        if(!deleteItem){
            return res.status(404).json({message:"error in deleting item"});
        }
        return res.status(200).json({message:"items deleted"});
    } catch (error) {
        console.log(error);
        return res.status(404).json({message:"internal server error"});
    }
}