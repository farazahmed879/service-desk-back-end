const EconnectionModel = require("../../models/electricUtiltyModels/connection")
 const cloudinary = require("../../config/cloudinary")
const { updateBformClientfromId } = require("../servicesController/bFormController")
    
const createConnection = async  (req,res)=>{

    try {
        
    
    const {clientID , connectionType , meterNumber , status  } = req.body
  if(!clientID){
    return res.status(400).json({
        message:"clientID must br requried",
        success:false
    })
  }

  const img1 = req.files?.cnicFrontImg?.[0];   
  const img2 = req.files?.cnicBackImg?.[0];   
  


  if (!img1 , !img2){
    return res.status(400).json({
        message:"images required",
        success:false
    })
  }

let cnicFrontImg = "";
let cnicBackImg = "";

if(img1){
let upload1 = await  cloudinary.uploader.upload(img1.path ,{
    folder:"meterConnectionDoc"
})
cnicFrontImg = upload1.secure_url
}

if(img2){
    let upload2 = await cloudinary.uploader.upload(img2.path,{
        folder:"meterConnectionDoc"
    })
    cnicBackImg  = upload2.secure_url
}




if(!meterNumber , !status ,!connectionType){
    return res.status(401).json({
        message:"all field must be request",
        success:"false" 

    })
}


const meterRecord = await EconnectionModel.create({
    clientID,
    meterNumber, 
    status,
    connectionType ,
    cnicBackImg,
    cnicFrontImg
})
if(meterRecord){
return res.status(200).json({
    success:true,
    message:"created",
    data:meterRecord
})
}


  } catch (error) {
        return res.status(400).json({
            message:"connection not create",
            error: error.message,
            success:false
        })
    }
  


}


const getAllConnection = async (req , res)=>{

    try{
    const allConnection = await EconnectionModel.find().populate("clientID")

    if(allConnection){
        return res.status(200).json({
            data:allConnection,
            message:"success"
        })
    }
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"something went wrong",
            data:error.message
        })
    }
}

const updateConnection = async (req,res)=>{
    try {
        const {id , connectionType , meterNumber, status , clientID} = req.body
    if(!id){
        return res.status(400).json({
            message:"id must be required"
        })
    }

   const getdata = await EconnectionModel.findById(id)
   if(!getdata){
    return res.status(400).json({
        message:"record not found with this id"
    })

   } 
 let updateData ={}
 if (connectionType){
   updateData.connectionType = connectionType   
 }
 
 if (meterNumber){
   updateData.meterNumber = meterNumber   
 }
 
 if (status){
   updateData.status= status   
 }
 
 if (clientID){
   updateData.clientID = clientID   
 }
 

 
  const update1 = req.files?.cnicFrontImg?.[0];   
  const update2 = req.files?.cnicBackImg?.[0];
  if(update1){
    const  upload1 = await cloudinary.uploader.upload(update1.path,{
        folder:"meterConnectionDoc"
    })
    updateData.cnicFrontImg=upload1.secure_url
  }   
  if(update2){
    const  upload2 = await cloudinary.uploader.upload(update2.path,{
        folder:"meterConnectionDoc"
    })
    updateData.cnicBackImg=upload2.secure_url
  }   
  
  const updateMeterData = await EconnectionModel.findByIdAndUpdate(id , updateData,{
    new:true,
    runValidators:true
  })

  return res.status(200).json(
    {message:"successFully update record",
    data:updateMeterData}
  )
   

    } catch (error) {
         return res.status(400).json({
            success:false,
            message:"something went wrong",
            data:error.message
        })
    }

}


 const deleterecord = async (req,res)=>{
 try {
       const {id}=req.params
   if(!id){
    return res.status(400).json({
        message:"id must be required",
        success:false
    })
   }
 const deletee = await EconnectionModel.findByIdAndDelete(id)
 return res.status(200).json({
    message:"record delete",
    data:deletee
 }) 


 } catch (error) {
     return res.status(400).json({
        message:error.message,
        success:false
    })
    
 }
 }

module.exports={
    createConnection,
    getAllConnection,
    updateConnection,
    deleterecord,
}