const express = require('express');
const { availableTable, reserveTable, reservedTable, cancelReservation } = require('../controller/reservationController');
const router = express.Router();

router.route('/reserve').get(availableTable).post(reserveTable).patch(cancelReservation);
router.route('/reserved').get(reservedTable);
module.exports = router;