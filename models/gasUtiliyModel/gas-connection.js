const { getCipherInfo } = require("crypto");
const mongoose = require("mongoose");

const gasConnectionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  connectionType: {
    enum: ["residential", "commercial"],
    require: true,
    type: String,
  },

  meterNumber: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "deactivate"],
    require: true,
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


const GconnectionModel = mongoose.model ("GASCONNECTION",gasConnectionSchema)

module.exports= GconnectionModel 
