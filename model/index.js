const mongoose = require('mongoose');
const envConfig = require('../config/envConfig');


mongoose.connect(envConfig.url).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log('error in connecting database',e);
    process.exit();
});