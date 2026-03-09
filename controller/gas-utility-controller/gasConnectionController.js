const cloudinary = require("../../config/cloudinary");
const GconnectionModel = require("../../models/gasUtiliyModel/gas-connection");
const createGasConection = async (req, res) => {
  try {
    const { clientID, connectionType, meterNumber, status } = req.body;
    if (!clientID) {
      return res.status(400).json({
        success: false,
        message: "client must be required",
      });
    }

    if (!connectionType || !meterNumber || !status) {
      return res.status(400).json({
        success: false,
        message: "all Field Must be required",
      });
    }

    const img1 = req.files?.cnicFrontImg?.[0];
    const img2 = req.files?.cnicBackImg?.[0];
    if (!img1 || !img2) {
      return res.status(300).json({
        success: false,
        message: "cnic Images must be requird",
      });
    }

    let cnicFrontImg = "";
    let cnicBackImg = "";

    if (img1) {
      const upload1 = await cloudinary.uploader.upload(img1.path, {
        folder: "gasConnectionDoc",
      });
      cnicFrontImg = upload1.secure_url;
    }

    if (img2) {
      const upload2 = await cloudinary.uploader.upload(img2.path, {
        folder: "gasConnectionDoc",
      });
      cnicBackImg = upload2.secure_url;
    }

    const createRecord = await GconnectionModel.create({
      clientID,
      meterNumber,
      status,
      connectionType,
      cnicBackImg,
      cnicFrontImg,
    });
    return res.status(200).json({
      success: true,
      message: "successfully completed",
      data: createRecord,
    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: error.message,
    });
  }
};

const updateGasConnection = async (req, res) => {
  try {
    const { id, connectionType, meterNumber, status, clientID } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id must be required",
      });
    }

    const updateData = {};
    if (connectionType) {
      updateData.connectionType = connectionType;
    }
    if (meterNumber) {
      updateData.meterNumber = meterNumber;
    }
    if (status) {
      updateData.status = status;
    }
    if (clientID) {
      updateData.clientID = clientID;
    }

    const img1 = req.files?.cnicFrontImg?.[0];
    const img2 = req.files?.cnicBackImg?.[0];

    let cnicFrontImg = "";
    let cnicBackImg = "";

    if (img1) {
      const upload1 = await cloudinary.uploader.upload(img1.path, {
        folder: "gasConnectionDoc",
      });
      cnicFrontImg = upload1.secure_url;
    }

    if (img2) {
      const upload2 = await cloudinary.uploader.upload(img2.path, {
        folder: "gasConnectionDoc",
      });
      cnicBackImg = upload2.secure_url;
    }

    if (cnicFrontImg) {
      updateData.cnicFrontImg = cnicFrontImg;
    }
    if (cnicBackImg) {
      updateData.cnicBackImg = cnicBackImg;
    }

    const updatedData = await GconnectionModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "successFully Update record",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const record = await GconnectionModel.find().populate("clientID");
    if (!record) {
      return res.status(400).json({
        success:false,
        message:"something went wrong"
      })
    }

    return res.status(200).json({
      success: true,
      message: "data recieved",
      data: record,
    });
  } catch (error) {
    return res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const delRec = async (req, res) => {
  try {
    const { id } = req.params;

    const delrecord = await GconnectionModel.findByIdAndDelete(id);
    if (delrecord) {
      return res.status(200).json({
        success: true,
        message: "data recieved",
        data: delrecord,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

module.exports = { createGasConection, updateGasConnection, getAll, delRec };
