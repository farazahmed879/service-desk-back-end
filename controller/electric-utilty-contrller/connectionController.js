const EconnectionModel = require("../../models/electricUtiltyModels/connection")
 const cloudinary = require("../../config/cloudinary")
    
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



module.exports={
    createConnection,
}