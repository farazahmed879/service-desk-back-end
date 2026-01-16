const express = require("express");

const upload = require("../middleware/upload");

const router = express.Router();

const {
  createPassport,
  getAllPassportApplication,
  getPassportclientByCnic,
  updatePassportdetailById,
} = require("../controller/servicesController/passportController");

// create new passport

router.post(
  "/create",
  upload.fields([
    { name: "cnicFrontPic", maxCount: 1 },
    { name: "cnicBackPic", maxCount: 1 },
    { name: "degreePicture", maxCount: 1 },
  ]),
  createPassport
);

// get all passport

router.get("/get-all", getAllPassportApplication);

// get passport by cnic

router.post("/get-by-cnic", getPassportclientByCnic);



router.put(
  "/update/:id",
  upload.fields([
    { name: "cnicFrontPic", maxCount: 1 },
    { name: "cnicBackPic", maxCount: 1 },
    { name: "degreePicture", maxCount: 1 },
  ]),
  updatePassportdetailById
);



module.exports=router