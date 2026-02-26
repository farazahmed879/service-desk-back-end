const express  = require("express")

const upload = require("../../middleware/upload")

const router  = express.Router()

const {createConnection} = require("../../controller/electric-utilty-contrller/connectionController")

// create electric connection 
router.post("/create" ,upload.fields([
{name:"cnicFrontImg" , maxCount :1},
{name:"cnicBackImg" , maxCount :1}
]) , createConnection )

module.exports= router