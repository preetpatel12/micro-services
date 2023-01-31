const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute=require("./routes/user")
const orderRoute=require("./routes/order")

require('./utils/orderDB')
require('./utils/userDB')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(userRoute)
app.use(orderRoute)


app.listen(8000,()=>{
    console.log("server is run at ",8000);
})
