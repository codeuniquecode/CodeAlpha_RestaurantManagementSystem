const express = require('express');
const { addOrder, clearOrder, viewOrder } = require('../controller/orderController');
const router = express.Router();

router.route('/order').post(addOrder).patch(clearOrder).get(viewOrder);


module.exports = router;