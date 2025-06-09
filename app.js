const express = require('express');
const app = express();
require('dotenv').config();
const envConfig = require('./config/envConfig');
require('./model/index');

app.listen(envConfig.port,()=>{
    console.log(`server is running on ${envConfig.port}`);
})