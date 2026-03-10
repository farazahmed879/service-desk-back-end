const express = require("express");

const router = express.Router();
const upload = require("../../middleware/upload");
const {
  createGasConection,
  getAll,
  updateGasConnection,
  delRec,
} = require("../../controller/gas-utility-controller/gasConnectionController");

router.post(
  "/create",
  upload.fields([
    { name: "cnicFrontImg", maxCount: 1 },
    { name: "cnicBackImg", maxCount: 1 },
  ]),
  createGasConection,
);

// update

router.put(
  "/update",
  upload.fields([
    { name: "cnicFrontImg", maxCount: 1 },
    { name: "cnicBackImg", maxCount: 1 },
  ]),
  updateGasConnection,
);

router.get("/record", getAll);
router.delete("/delete/:id", delRec);

module.exports = router;
