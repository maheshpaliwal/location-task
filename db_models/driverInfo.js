const mongoose=require('mongoose');
const schema = mongoose.Schema;

const trackSchema=new schema(
    {
driverId:{
    type:String,
    unique:true
},
userName:{
    type:String,
    unique:true
},
passwordHash:{
    type:String,
    required:true
},
currentLocation:{
    type:{type:String},
    coordinates:[]
},
locationUpdateTime:{
    type:Number
},
accessToken:{
    type:String
}

    }
)
trackSchema.index({ currentLocation: "2dsphere" });
const trackDriver=mongoose.model('driverLiveLocation',trackSchema);
module.exports=trackDriver;