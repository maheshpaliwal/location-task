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
    const longitude=req.body.longitude;
    const latitude=req.body.latitude;
    const minTime=new Date().getTime()-120*1000;// query only those users which were active in last 60 seconds
    driverInfo.find({
        currentLocation: {
         $near: {
          $maxDistance: 200,
          $geometry: {
           type: "Point",
           coordinates: [longitude, latitude]
          }
          
         }
        },
        locationUpdateTime:{
            $gt:minTime
        }
       },{currentLocation:1,driverId:1,userName:1,locationUpdateTime:1}).find((error, results) => {
        if (error){
            const newError=error(error);
            res.json(newError);
        }
        res.json({results:results})
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
