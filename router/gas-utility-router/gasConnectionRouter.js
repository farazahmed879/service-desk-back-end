const express = require("express")

const router = express.Router()
const upload = require("../../middleware/upload")
const createGasConection = require("../../controller/gas-utility-controller/gasConnectionController")

router.post("/create"  , upload.fields([
    {name :"cnicFrontImg" , maxCount:1},
    {name :"cnicBackImg" , maxCount:1},
])  ,createGasConection)



module.exports= router

