const menu = require("../model/menuSchema");
const order = require("../model/orderSchema");
const table = require("../model/tableSchema");

exports.addOrder = async (req, res) => {
    //the data comes like this 
    //     {
    //   orderItems: [ { items: '68499bd0343a3925dfa589f3', qty: 3 } ],
    //   
    //   tableNo: '684ab28c44a2bc1707e0f023'
    // }
    const { orderItems, tableNo } = req.body;
    if(orderItems.length <1){
        return res.status(404).json({message:"the order is empty"});
    }
    const tableNumber = await table.findOne({
        _id: tableNo
    });
    if (!tableNumber) {
        return res.status(404).json({ message: "table not found" });
    }
    await table.findByIdAndUpdate(tableNo, {
        status: 'occupied'
    })
    let totalPrice = 0;
    for (let item of orderItems) {
        const itemData = await menu.findOne({ _id: item.items });
        totalPrice += item.qty * itemData.price;
    }

    try {
        const createOrder = await order.create({
            orderItems: orderItems.map(item => ({
                items: item.items.name,
                qty: item.qty
            })),
            totalPrice,
            tableNo
        });

        if (!createOrder) {
            return res.status(404).json({ message: "error in creating order" });
        }
        return res.status(200).json({ message: "order created" })
    } catch (error) {
        console.log(error);

        return res.status(404).json({ message: "Internal server error" })
    }
}
exports.clearOrder = async (req, res) => {
    try {

        const currentOrder = await order.findById(req.query.id);
        if (!currentOrder) {
            return res.status(404).json({ message: "error, order not found" });
        }
        await order.findByIdAndUpdate(req.query.id, { status: 'paid' });
        await table.findByIdAndUpdate(currentOrder.tableNo, { status: 'available' });

        return res.status(200).json({ message: "Order cleared" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "internal server error" })
    }
}
exports.viewOrder = async(req,res)=>{
    try {
        const allOrders = await order.find().populate('orderItems');
        return res.status(200).json({message:allOrders});

    } catch (error) {
        console.log(error);
        return res.status(404).json({message:"internal server error"})
    }
}