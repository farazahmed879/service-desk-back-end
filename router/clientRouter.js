const express= require("express");
const {createClient} =require("../controller/clientController")
const {getAllClient} =require("../controller/clientController")
const {getClientByEmail}  =require("../controller/clientController")
const {clientDeleteById}  =require("../controller/clientController")

const upload = require("../middleware/upload")

const router = express.Router()


router.post("/create" ,upload.single("facePicture") ,createClient)
router.get("/get-all",getAllClient )
router.get("/get-by-email",getClientByEmail )
router.get("/delete-by-id/:id",clientDeleteById )






module.exports =router

