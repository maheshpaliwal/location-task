const http=require('http');
const mongoose=require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const registerRouter=require('./routes/createDriver');
const accessTokenRouter=require('./routes/accessToken');
const updateLocationRouter=require('./routes/updateLocationRouter');
const nearbyRouter=require('./routes/nearbyDrivers');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// server
const PORT_NUMBER=process.env.PORT||3000;
const server=http.createServer(app);
const url = 'mongodb://localhost:27017/oyeRickshawTask'
const connect = mongoose.connect(url);
server.listen(PORT_NUMBER,()=>{
  console.log(`server running at ${PORT_NUMBER}`);
})
connect.then(
  (db) => {
    console.log("connected to db oye rickshaw task");
  }
)
app.use('/register',registerRouter);
app.use('/auth',accessTokenRouter);
app.use('/updateLocation',updateLocationRouter);
app.use('/nearbyDrivers',nearbyRouter);





