const mongoose  = require("mongoose")

const  ElectricConnetionSchema =  new mongoose.Schema({
    clientId:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"Users" 
    }, 
   
   connectionType:{
    type:String,
    enum:["residential" , "commercial"],
    required:true,
   },
    meterNumber:{
        type:String, 
        required : true
    },
    status:{
        type:String,
        enum:["active","deactivate" ],
        default:true
    },
   cnicFrontImg:{
    type:String,
    required:true
   },
   cnicBackImg:{
    type:String,
    required:true,
   }
})


const EconnectionModel = mongoose.model("ELECTRICCONNECTION" ,ElectricConnetionSchema)
module.exports = EconnectionModel