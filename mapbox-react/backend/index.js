const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const axios = require('axios')
const uniqid = require('uniqid');
const { Schema } = mongoose;

const dbURI = 'mongodb://127.0.0.1:27017/uber';

const dbConnection = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    phoneNumber:{type:Number,unique:true},
    orilatLon:{type:Array,default:[]},
    isRequested:{type:Boolean,default:false,},
    driverId:{type:String,default:""},
})

const DriverSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    phoneNumber:{type:Number,unique:true},
    carRegNo:{type:String,unique:true,default:""},
    carModel:{type:String,default:""},
    carColor:{type:String,default:""},
    orilatlon:{type:Array,default:[]},
    deslatlon:{type:Array,default:[]},
    isAvailable:{type:Boolean,default:false,},
    isRequested:{type:Boolean,default:false,},
    userId:{type:String,default:""},
})

const BookedSchema = mongoose.Schema({
    userId:{type:String},
    driverId:{type:String,default:""},
    picklatLon:{type:Array},
    droplatLon:{type:Array},
    status:{type:Boolean,default:false},
    otp:{type:String}
})
const User = dbConnection.model("user",UserSchema)
const Driver = dbConnection.model("drivers",DriverSchema)
const Ride = dbConnection.model("rides",BookedSchema)

dbConnection.on('connected', () => {
    console.log('Connected to DB...');
});
dbConnection.on('error', (err) => {
    console.log('DB connection error:', err)
});
app.use(bodyParser.json())
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())

app.post('/login',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const user=await User.findOne({
        email:email,
        password:password
    
    })
    if(user){
        res.status(200).send(user._id)
    }else{
        res.status(200).send("Failed")
    }
})

app.post('/driverlogin',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const user=await Driver.findOne({
        email:email,
        password:password
    
    })
    if(user){
        res.status(200).send(user._id)
    }else{
        res.status(200).send("Failed")
    }
})
app.get('/availableDrivers',async(req,res)=>{
    const users = await Driver.find({
        isAvailable:true
    })
    res.status(200).json(users)
})

app.post('/storeRide', async (req, res) => {
    const newUser = new Ride({
        userId: req.body.id,
        picklatLon: req.body.pickUp,
        droplatLon: req.body.drop,
        driverId:""
    });

    await newUser.save()
        .then(result => {
        console.log("success");
        res.status(200).send("success");
        })
        .catch(error => {
        console.log("failure");
        res.status(200).send("failure");
        });
});

app.post('/showDrivers',async (req,res)=>{
    const drivers = await Driver.find({
        carModel:req.body.carModel
    })
    res.status(200).json(drivers)
})
// function waitForFieldUpdate(docId, timeout) {
//     return new Promise((resolve, reject) => {
//         const startTime = Date.now();
        
//         const checkFieldUpdate = async () => {
//         const document = await Ride.findOne({ status: true,
//          driverId:docId});
        
//         if (document && document.field === 'desired_value') {
//             resolve(document);
//         } else if (Date.now() - startTime >= timeout) {
//             reject(new Error('Field update not found within the specified timeout.'));
//         } else {
//             setTimeout(checkFieldUpdate, 1000); 
//         }
//         };
        
//         checkFieldUpdate();
//     });
// }
app.post('/checkForDriver',async(req,res) =>{
    const adddriver = await Ride.updateOne(
        {userId:req.body.userId },
        {$set:{driverId:req.body.driverId }}
    )
    const driver = await Driver.updateOne(
        { _id: req.body.driverId ,isAvailable:true},
        { $set: { isRequested: true } },
    )
    if (driver.matchedCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 60000));
        const modifiedDriver = await Ride.findOne({
            driverId:req.body.driverId
        })
        // const updatedDocument = await waitForFieldUpdate(req.body.driverId, 60000);
        if(modifiedDriver){
            res.status(200).send("accepted")
        }else{
            res.status(200).send("Not accepted")
        }
    } else {
        console.log('No document matched the update criteria');
    }
})

app.post('/checkForUser',async(req,res)=>{
    console.log('checkforuser');
    const ride = await Ride.findOne({
        driverId:req.body.driverId
    })
    console.log(ride);
    if(ride){
        res.status(200).json(ride)
    }else{
        res.status(200).json({
            driverId:""
        })
    }
})
app.post('/driverAccepted',async(req,res)=>{
    const uniqueNumber = uniqid.process().substring(0, 4);
    const ride = await Ride.updateOne(
        {driverId:req.body.driverId},
        {$set:{status:true,otp:uniqueNumber}}
    )
    const driver = await Driver.updateOne(
        { _id: req.body.driverId ,isAvailable:true},
        { $set: { isAvailable: false } },
    )
    if(ride.matchedCount===1){
        res.status(200).json("ok")
    }else{
        res.status(200).json("not ok")
    }
})
app.post('/driverdeclined',async(req,res)=>{
    const ride = await Ride.updateOne(
        { driverId: req.body.driverId },
        { $set: { driverId: "" } },
    )
    const driver = await Driver.updateOne(
        { _id: req.body.driverId ,isAvailable:true},
        { $set: { isRequested: false } },
    )
    if((ride.nModified===1) && (driver.nModified===1)){
        res.status(200).json("ok")
    }else{
        res.status(200).json("not ok")
    }
})
app.post('/cancelRide' ,async(req,res)=>{
    console.log("cancelRide request");
    const ride = await Ride.deleteOne({
        userId:req.body.userId
    })
    if(ride.deletedCount===1){
        res.status(200).json("ride deleted")
    }
    else{
        res.status(200).json("ride not deleted")
    }
})

app.post('/checkConfirmRide',async(req,res)=>{
    const ride = await Ride.findOne({
        driverId:req.body.driverId
    })
    if(ride){   
        res.status(200).json("ride is active")
    }else{
        res.status(200).json("ride is not active")
    }
})
app.listen(5000,()=>{
    console.log("server is running");
})
