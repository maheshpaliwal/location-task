const express=require('express');
const bodyParser=require('body-parser');
const error=require('../responseClass/errorClass');
const genError=new error("Operation Not Supported");
const passwordHash=require('password-hash');
const driverInfo=require('../db_models/driverInfo');
const driverObject=require("../responseClass/driverModel");
const cors=require('cors');
const { Mongoose } = require('mongoose');
const driverRouter=express.Router();
driverRouter.use(bodyParser.json());
driverRouter.use(cors());
driverRouter.route('/')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.json(genError)
})
.post((req, res, next) => {
    res.statusCode = 200;
    const userName=req.body.userName;
    console.log(userName)
    const password=req.body.password;
    var accessToken = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = characters.length;
    for (var i = 0; i < 56; i++) {
        accessToken += characters.charAt(Math.floor(Math.random() * length));
    }
    var newDriver=new driverInfo();
    newDriver.driverId=newDriver._id;
    newDriver.userName=userName;
    newDriver.passwordHash=passwordHash.generate(password)
    newDriver.accessToken=accessToken;
    newDriver.save();
    res.json({
        "Message":"user registered successfuly"
    })
   
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.json(genError)
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.json(genError)
})

module.exports = driverRouter;
