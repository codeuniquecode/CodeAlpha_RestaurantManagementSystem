const express = require('express');
const { addItems, seeItems, updateItems, deleteItems } = require('../controller/menuController');
const router = express.Router();

router.route('/items').post(addItems).get(seeItems).patch(updateItems).delete(deleteItems);




module.exports = router;