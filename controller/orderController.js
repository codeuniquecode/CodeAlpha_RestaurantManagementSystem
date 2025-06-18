const inventory = require("../model/inventorySchema");
const menu = require("../model/menuSchema");
const order = require("../model/orderSchema");
const table = require("../model/tableSchema");

// exports.addOrder = async (req, res) => {
//     //the data comes like this 
//     //     {
//     //   orderItems: [ { items: '68499bd0343a3925dfa589f3', qty: 3 } ],
//     //   
//     //   tableNo: '684ab28c44a2bc1707e0f023'
//     // }
//     const { orderItems, tableNo } = req.body;
//     if(orderItems.length <1){
//         return res.status(404).json({message:"the order is empty"});
//     }
//     const tableNumber = await table.findOne({
//         _id: tableNo
//     });
//     if (!tableNumber) {
//         return res.status(404).json({ message: "table not found" });
//     }
//     await table.findByIdAndUpdate(tableNo, {
//         status: 'occupied'
//     })
//     let totalPrice = 0;
//     for (let item of orderItems) {
//         const itemData = await menu.findOne({ _id: item.items });
//         totalPrice += item.qty * itemData.price;
//     }

//     try {
//         const createOrder = await order.create({
//             orderItems: orderItems.map(item => ({
//                 items: item.items.name,
//                 qty: item.qty
//             })),
//             totalPrice,
//             tableNo
//         });

//         if (!createOrder) {
//             return res.status(404).json({ message: "error in creating order" });
//         }
//         return res.status(200).json({ message: "order created" })
//     } catch (error) {
//         console.log(error);

//         return res.status(404).json({ message: "Internal server error" })
//     }
// }
exports.addOrder = async (req, res) => {
    const { orderItems, tableNo } = req.body;
    if (orderItems.length < 1) {
        return res.status(404).json({ message: "the order is empty" });
    }

    const tableNumber = await table.findOne({ _id: tableNo });
    if (!tableNumber) {
        return res.status(404).json({ message: "table not found" });
    }

    await table.findByIdAndUpdate(tableNo, { status: 'occupied' });

    let totalPrice = 0;

    // Step 1: Calculate total and prepare to update inventory
    for (let item of orderItems) {
        const itemData = await menu.findById(item.items).populate('ingredients.item');
        if (!itemData) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        totalPrice += item.qty * itemData.price;

        // Step 2: Update inventory for each ingredient
        for (let ing of itemData.ingredients) {
            const usedQty = ing.quantity * item.qty;

            // Fetch inventory item
            const inventoryItem = await inventory.findById(ing.item._id);
            if (!inventoryItem) {
                return res.status(404).json({ message: `Inventory item not found: ${ing.item.name}` });
            }

            if (inventoryItem.quantity < usedQty) {
                return res.status(400).json({ message: `Not enough ${inventoryItem.name} in stock.` });
            }

            // Deduct quantity
            inventoryItem.quantity -= usedQty;

            // Check availability
            inventoryItem.isAvailable = inventoryItem.quantity >= inventoryItem.threshold;

            await inventoryItem.save();
        }
    }

    try {
        const createOrder = await order.create({
            orderItems: orderItems.map(item => ({
                items: item.items,
                qty: item.qty
            })),
            totalPrice,
            tableNo
        });

        if (!createOrder) {
            return res.status(404).json({ message: "error in creating order" });
        }

        return res.status(200).json({ message: "order created and inventory updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
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
exports.orderInfo = async(req,res)=>{
    // console.log(req.body);
    const {orderItems} = req.body;
    console.log(orderItems);
    let itemData = [];
    for(items of orderItems){
         itemData = await menu.find({_id:items.items});
          console.log(itemData);
    }
   
    for(menuIng of itemData){
        // const ingredientsData = await inventory.findById(menuIng.item)
        // console.log(ingredientsData);
        console.log(menuIng);
    }

    return res.status(200).json({message:"done"});
}