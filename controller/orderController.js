const menu = require("../model/menuSchema");
const order = require("../model/orderSchema");
const table = require("../model/tableSchema");

exports.addOrder = async(req,res)=>{
    //the data comes like this 
//     {
//   orderItems: [ { items: '68499bd0343a3925dfa589f3', qty: 3 } ],
//   
//   tableNo: '684ab28c44a2bc1707e0f023'
// }
const {orderItems,tableNo}= req.body;
const tableNumber = await table.findOne({
    _id:tableNo
});
let totalPrice=0;
for(let item of orderItems){
const itemData = await menu.findOne(item.items);
totalPrice = item.qty*itemData.price;
}

    try {
        const createOrder =await order.create({
            orderItems: orderItems.map(item => ({
                items: item.items,
                qty: item.qty
            })),
            totalPrice,
            tableNo:tableNumber.tableNo
        });
   
    if(!createOrder){
        return res.status(404).json({message:"error in creating order"});
    }
        return res.status(200).json({message:"order created"})
    } catch (error) {
        console.log(error);
        
        return res.status(404).json({message:"Internal server error"})
    }
}