const express = require('express')
const route=express.Router()
const User=require('./../models/Users')

route.get("/", (req, res, next) => {
    res.send("This is our main endpoint")
})

route.get("/users", (req, res, next) => {
    User.find().then((users) => {
        res.send({ "users": users })
    }).catch((err) => {
        console.log("error");
    })
})

route.get("/users/:uid", (req, res, next) => {
    User.findById(req.params.uid).then((user) => {
        if (user) {
            res.json(user)
        } else {
            res.sendStatus(404)
        }
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

route.post("/user", async (req, res) => {
    const newUser = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "phone": req.body.phone,
        "address": req.body.address,
        "orders": req.body.orders
    }
    console.log("hello wolrd");

    User.create(newUser).
        then((r) => {
            res.send("User created..")
        }).catch((err) => {
            if (err) {
                throw err
            }
        })
})

module.exports=route