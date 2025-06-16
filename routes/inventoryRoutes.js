const express = require('express');
const { addItems, fetchItems } = require('../controller/inventoryController');
const router = express.Router();

router.route('/inventory').post(addItems).get(fetchItems);


module.exports = router;