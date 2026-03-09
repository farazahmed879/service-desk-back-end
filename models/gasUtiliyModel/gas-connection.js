
const mongoose = require("mongoose");

const gasConnectionSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  connectionType: {
    enum: ["residential", "commercial"],
    required: true,
    type: String,
  },

  meterNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "deactivate"],
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


const GconnectionModel = mongoose.model ("GASCONNECTION",gasConnectionSchema)

module.exports= GconnectionModel 
