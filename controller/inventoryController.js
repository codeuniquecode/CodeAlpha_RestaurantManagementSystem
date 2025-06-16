const inventory = require("../model/inventorySchema")

exports.addItems = async(req,res)=>{
    try {
    const createItems = await inventory.create(req.body);
    if(!createItems){
        return res.status(404).json({message:"error in adding inventory"});
    }
    
        return res.status(200).json({message:"added in inventory"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}

exports.fetchItems = async(req,res)=>{
    try {
        const allItems = await inventory.find();
        if(!allItems || allItems.length<1){
        return res.status(404).json({message:"no items in inventory"})
        }
        return res.status(404).json({message:allItems});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}