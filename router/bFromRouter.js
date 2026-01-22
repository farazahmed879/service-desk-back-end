const express = require("express");

const upload = require("../middleware/upload");

const router = express.Router();

const {
  createBform,
  getBFormClientByCnicNumber,
  getAllBformClient,
  bFormCLientDataDeleteByCnic,
  updateBformClientfromId,
} = require("../controller/servicesController/bFormController");



router.post(
  "/create",
  upload.fields([
    { name: "fatherCnicFrontPic", maxCount: 1 },
    { name: "fatherCnicBackPic", maxCount: 1 },
    { name: "motherCnicFrontPic", maxCount: 1 },
    { name: "motherCnicBackPic", maxCount: 1 },
    
    
  ]),
  createBform
);






router.post("/get-by-cnic", getBFormClientByCnicNumber);

router.get("/get-all", getAllBformClient);
router.get("/delete-by-cnic", bFormCLientDataDeleteByCnic);

router.put(
  "/update/:id",
  upload.fields([
    { name: "fatherCnicFrontPic", maxCount: 1 },
    { name: "fatherCnicBackPic", maxCount: 1 },
    { name: "motherCnicFrontPic", maxCount: 1 },
    { name: "motherCnicBackPic", maxCount: 1 },
  ]),
  updateBformClientfromId
);

module.exports = router;
