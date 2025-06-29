const express = require('express');
const app = express();
require('dotenv').config();
const envConfig = require('./config/envConfig');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./model/index');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/',menuRoutes);
app.use('/',orderRoutes);
app.use('/',tableRoutes);
app.use('/',reservationRoutes);
app.use('/',inventoryRoutes);
app.listen(envConfig.port,()=>{
    console.log(`server is running on ${envConfig.port}`);
})