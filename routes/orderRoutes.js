const express = require('express');
const { addOrder } = require('../controller/orderController');
const router = express.Router();

router.route('/order').post(addOrder);


module.exports = router;