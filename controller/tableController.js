const table = require("../model/tableSchema")

exports.addTable = async(req,res)=>{
    try {
    const createTable = await table.create(req.body);
    if(!createTable){
        return res.status(404).json({message:"error in creating table"});
    }
    return res.status(200).json({message:"table added"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal sever error"});
    }
}