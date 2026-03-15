const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  challanNum: {
    required: true,
    type: String,
  },

  challanName: {
    type: String,
    required: true,
  },
  vehicleNum: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum:['car' , "bike", "heavy vehicle"]  
},
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    required: true,
  },

  cnicFrontImg: {
    type: String,
    required: true,
  },
  cnicBackImg: {
    type: String,
    required: true,
  },
});

const challanModel = mongoose.model("CHALLAN", challanSchema);

module.exports = challanModel;
