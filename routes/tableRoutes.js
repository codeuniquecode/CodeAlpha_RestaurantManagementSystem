const express = require('express');
const { addTable } = require('../controller/tableController');
const router = express.Router();

router.route('/table').post(addTable);



module.exports = router;