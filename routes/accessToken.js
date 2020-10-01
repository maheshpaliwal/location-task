const express = require('express');
const bodyParser = require('body-parser');
const error = require('../responseClass/errorClass');
const genError = new error("Operation Not Supported");
const passwordHash = require('password-hash');
const driverInfo = require('../db_models/driverInfo');
const driverObject = require("../responseClass/driverModel");
const cors = require('cors');
const { Mongoose } = require('mongoose');
const driverRouter = express.Router();
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
        const userName = req.body.userName;
        const password = req.body.password;

        driverInfo.findOne({ userName: userName }).then((driver) => {
            if (passwordHash.verify(password, driver.passwordHash)) {
                var accessToken = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const length = characters.length;
                for (var i = 0; i < 56; i++) {
                    accessToken += characters.charAt(Math.floor(Math.random() * length));
                }
                driver.accessToken = accessToken;
                driver.save();
                res.json({
                    userName: userName,
                    accessToken: accessToken
                })
            }
            else {
                const authError = new error("auth error");
                res.json(authError);
            }

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

module.exports = driverRouter;
