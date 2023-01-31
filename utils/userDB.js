const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const userDB=mongoose.createConnection('mongodb://127.0.0.1:27017/userDB')

module.exports=userDB

