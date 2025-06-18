const express = require('express');
const { addOrder, clearOrder, viewOrder, orderInfo } = require('../controller/orderController');
const router = express.Router();

router.route('/order').post(addOrder).patch(clearOrder).get(viewOrder);
router.route('/testOrder').post(orderInfo);

module.exports = router;