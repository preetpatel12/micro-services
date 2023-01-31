const orderDB=require('./../utils/orderDB')

const mongoose=require('mongoose')

const Order=orderDB.model("Order", {
	name: {
		type: String,
		required: true
	},
	customerId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default:Date.now()
	},
	qty: {
		type: Number,
		required: false
	}

})

module.exports=Order