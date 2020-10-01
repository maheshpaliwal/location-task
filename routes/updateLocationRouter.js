const express=require('express');
const bodyParser=require('body-parser');
const error=require('../responseClass/errorClass');
const genError=new error("Operation Not Supported");
const driverInfo=require('../db_models/driverInfo');
const cors=require('cors');
const locationRouter=express.Router();
locationRouter.use(bodyParser.json());
locationRouter.use(cors());
locationRouter.route('/')
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
    const accessToken=req.body.accessToken;
    console.log(accessToken)
    const longitude=Number(req.body.longitude);
    const latitude=Number(req.body.latitude);
    driverInfo.findOne({accessToken:accessToken}).then((driver)=>{
        console.log(driver)
        driver.currentLocation.type="Point";
        driver.currentLocation.coordinates=[longitude,latitude];
        driver.locationUpdateTime=new Date().getTime()
        driver.save();
        res.json({
            "message":"location saved"
        })
    })
    .catch((e)=>{
        res.statusCode = 404;
        const notFoundError = new error("user not found");
        res.json(notFoundError);})
   
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.json(genError)
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.json(genError)
})

module.exports = locationRouter;
