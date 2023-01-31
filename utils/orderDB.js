const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const orderDB=mongoose.createConnection('mongodb://127.0.0.1:27017/ordersDB')

module.exports=orderDB
