const cloudinary = require("../../config/cloudinary");
const GconnectionModel = require("../../models/gasUtiliyModel/gas-connection");
const createGasConection = async (req, res) => {
  try {
    const { clientId, connectionType, meterNumber, status } = req.body;
    if (!clientId) {
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
      clientId,
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
    const { id, connectionType, meterNumber, status, clientId } = req.body;
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
    if (clientId) {
      updateData.clientId = clientId;
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

    updateData.cnicFrontImg = cnicFrontImg;
    updateData.cnicBackImg = cnicBackImg;

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

module.exports = { createGasConection, updateGasConnection };
