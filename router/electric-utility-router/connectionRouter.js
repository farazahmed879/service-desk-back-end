const express  = require("express")

const upload = require("../../middleware/upload")

const router  = express.Router()

const {createConnection, getAllConnection, updateConnection, deleterecord} = require("../../controller/electric-utilty-contrller/connectionController")

// create electric connection 
router.post("/create" ,upload.fields([
{name:"cnicFrontImg" , maxCount :1},
{name:"cnicBackImg" , maxCount :1}
]) , createConnection )

// create electric connection 
router.put("/update" ,upload.fields([
{name:"cnicFrontImg" , maxCount :1},
{name:"cnicBackImg" , maxCount :1}
]) , updateConnection )


router.get("/get-all" ,getAllConnection)
router.delete("/delete/:id" ,deleterecord)

module.exports= router