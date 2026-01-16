const express = require("express");

const upload = require("../middleware/upload");

const router = express.Router();

const {
  updateVehicleData,
  deleteVehileDataByCnic,
  getAllVehicleData,
  getVehicleData,
  getVehicleDataByCnic,
} = require("../controller/servicesController/vehicleController");

router.post("/create", getVehicleData);

router.put("/update", updateVehicleData);

router.delete("/delete", deleteVehileDataByCnic);

router.get("/get-all", getAllVehicleData);

router.get("/get-by-cnic", getVehicleDataByCnic);

module.exports = router;
