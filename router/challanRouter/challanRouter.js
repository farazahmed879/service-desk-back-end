const express = require("express");

const upload = require("../../middleware/upload");

const router = express.Router();

const {
  createChallan,
  getChallan,
  updateChallan,
  deleteChallan,
} = require("../../controller/challan-controller/challanController");

// create electric connection
router.post(
  "/create",
  upload.fields([
    { name: "cnicFrontImg", maxCount: 1 },
    { name: "cnicBackImg", maxCount: 1 },
  ]),
  createChallan,
);

// create electric connection
router.put(
  "/update",
  upload.fields([
    { name: "cnicFrontImg", maxCount: 1 },
    { name: "cnicBackImg", maxCount: 1 },
  ]),
  updateChallan,
);

router.get("/get", getChallan);
router.delete("/delete/:id", deleteChallan);

module.exports = router;
