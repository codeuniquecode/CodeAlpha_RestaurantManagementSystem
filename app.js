const express = require('express');
const app = express();
require('dotenv').config();
const envConfig = require('./config/envConfig');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./model/index');
const menuRoutes = require('./routes/menuRoutes');

app.use('/',menuRoutes);
app.listen(envConfig.port,()=>{
    console.log(`server is running on ${envConfig.port}`);
})