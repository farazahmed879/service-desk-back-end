const express = require("express");

const upload = require("../middleware/upload");
const { createDrivingLicense } = require("../controller/servicesController/drivingLicense.controller");
const { getClientWithService } = require("../controller/servicesHistory/servicesHistory");

const router = express.Router();

router.post("/driLicense"  , createDrivingLicense)

  

router.post("/history", getClientWithService)

module.exports = router;
