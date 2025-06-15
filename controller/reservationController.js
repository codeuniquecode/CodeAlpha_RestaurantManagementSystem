const reservation = require("../model/reservationSchema");
const table = require("../model/tableSchema")

exports.availableTable = async (req, res) => {
    try {
        const availableTable = await table.find({
            status: 'available' 
        }).populate();
        if (!availableTable){
            return res.status(404).json({message:"no table available"});
        }
        return res.status(200).json({message:`there are total ${availableTable.length}, ${availableTable}`})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"});
    }
}
exports.reservedTable = async (req, res) => {
    try {
        const availableTable = await reservation.find();
        if (!availableTable){
            return res.status(404).json({message:"no table available"});
        }
        return res.status(200).json({message:`there are total ${availableTable.length}, ${availableTable}`})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"});
    }
}
exports.reserveTable = async (req, res) => {
    try {
        const { userName, reservationDate, peopleCount, status } = req.body;
        const tableNo = req.query.id;
        const reservedTable = await table.findOne({_id:tableNo,status:'available'});
        if (!tableNo) {
            return res.status(404).json({ message: 'Table ID is missing in query' });
        }
        if(!reservedTable){
            return res.status(404).json({message:"table is already reserved"});
        }

        const newReservation = await reservation.create({
            userName,
            reservationDate,
            peopleCount,
            status,
            tableNo
        });

        // Optionally, mark table as reserved/occupied
        await table.findByIdAndUpdate(tableNo, { status: 'reserved' });

        return res.status(200).json({ message: 'Reservation successful', reservation: newReservation });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.cancelReservation = async(req,res)=>{
    try {
        const reservationId = req.query.id;
       const reservedTable = await reservation.findOne({ _id: reservationId }).populate('tableNo');
        if(reservedTable.status==='confirmed'){
            // const data = await reservation.findOne({_id:req.query.id})
            const updateReservation = await reservation.findByIdAndUpdate(reservationId,{
                status:'cancelled'
            });
            await table.findByIdAndUpdate(updateReservation.tableNo,{
                status:'available'
            })
            if(!updateReservation){
                
        return res.status(404).json({message:"error in cancelling reservation"});
            }
            
        return res.status(200).json({message:"reservation cancelled successfully"});
        }
        else{
            return res.status(404).json({message:"unable to find reserved table"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({message:"internal server error"})
    }
}