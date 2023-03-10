
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
cons

async function initialLoad() {
	await connectMongoose();
}

initialLoad()

app.get("/orders",async (req, res) => {
	
	if(!req.query.oid && req.query.uid) {
		Order.find({customerId:req.query.uid}).then( orders => {
			if(orders) {
				res.json(orders)
			} else {
				res.sendStatus(404)
			}
		})
	} else if(req.query.oid && req.query.uid) {
		Order.find({_id:req.query.oid, customerId: req.query.uid}).then( (order) => {
			if(order) {
				res.json(order);
			}else {
				res.sendStatus(404)
			}
		})
	}
})

// Create an order for a user
app.post("/order", async (req, res) => {
	const newOrder = {
		"name":req.body.name,
		"customerId":req.body.customerId,
		"amount":req.body.amount,
		"image":req.body.image,
		"createdAt":req.body.createdAt,
		"qty":req.body.qty,
	}
	
	// Create new Order instance..
	const order = new Order(newOrder)
	order.save().then((orderObj) => {
		res.send(orderObj)
	}).catch( (err) => {
		if(err) {
			throw err
		}
	})
	
})


// Delete a single order
app.delete("/orders/:oid", async (req, res) => {
	Order.findByIdAndDelete(req.params.oid).then(() => {
		res.send("Order deleted with success...")
	}).catch( () => {
		res.sendStatus(404)
	})
})

// Delete all orders for a user
app.delete("/orders", async (req, res) => {
	Order.findOneAndDelete({customerId: req.query.uid}).then((o) => {
		if(o) {
			res.send({success:true})
		} else {
			res.sendStatus(404)
		}
	})
})

// APP listening on port 5151
app.listen(5151, () => {
	console.log("Up and running! -- This is our Orders service")
})
