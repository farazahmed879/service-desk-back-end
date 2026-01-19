const nodemailer = require('nodemailer')

const   sendemail = async({to , subject , html})=>{
    
   const transporter  = nodemailer.createTransport({



    service:"Gmail",
     

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD,

    },


   })

await transporter.sendMail({
    
  from: `auth system ${process.env.EMAIL_USER}`,
  
  to , 
  subject,
  html,


})


}


module.exports = sendemail