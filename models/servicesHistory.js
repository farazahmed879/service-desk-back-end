const mongoose = require("mongoose")

const servicesHistorySchema = new mongoose.Schema(
    {
     clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
     },
     
     serviceType:{
        required:true,
        type:String,
        enum:['CNIC' ,"PASSPORT" , "BFORM" , "VEHICLE" ,"DRIVING_LICENSE"],
     },

     serviceRefId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    
     },

    },
    {timestamps:true}

)

const serviceModel = mongoose.model("ServiceHistory" , servicesHistorySchema)
module.exports=serviceModel