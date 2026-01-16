const express = require("express");
const {
  createCnic,
  getAllClientWithCnic,
  getCnicClientByCnicNumber,
  updateCnic,
} = require("../controller/servicesController/cnicController");


const upload=require('../middleware/upload')

const router = express.Router();




// create

router.post(
  "/create",
  upload.fields([
    { name: "frontPicture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  createCnic
);


// getAllCnic

router.get("/get-all", getAllClientWithCnic);

// getCnicClientByCnicNumber

router.post("/get-by-cnic-number", getCnicClientByCnicNumber);



router.put(
  "/update/:cnicID",
  upload.fields([
    { name: "frontPicture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  updateCnic
);




module.exports=router

