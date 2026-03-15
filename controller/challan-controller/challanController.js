const challanModel = require("../../models/challanModels/challan");
const cloudinary = require("../../config/cloudinary");

const createChallan = async (req, res) => {
  try {
    const {
      clientID,
      status,
      challanNum,
      challanName,
      vehicleNum,
      vehicleType,
    } = req.body;
    if (!clientID) {
      return res.status(400).json({
        message: "clientID must br requried",
        success: false,
      });
    }

    const img1 = req.files?.cnicFrontImg?.[0];
    const img2 = req.files?.cnicBackImg?.[0];

    if ((!img1 || !img2)) {
      return res.status(400).json({
        message: "images required",
        success: false,
      });
    }

    let cnicFrontImg = "";
    let cnicBackImg = "";

    if (img1) {
      let upload1 = await cloudinary.uploader.upload(img1.path, {
        folder: "challanDocs",
      });
      cnicFrontImg = upload1.secure_url;
    }

    if (img2) {
      let upload2 = await cloudinary.uploader.upload(img2.path, {
        folder: "challanDocs",
      });
      cnicBackImg = upload2.secure_url;
    }

    if ((!challanName || !challanNum || !status || !vehicleNum ||  !vehicleType)) {
      return res.status(401).json({
        message: "all field must be request",
        success: false,
      });
    }

    const challanGenerate = await challanModel.create({
      clientID,
      challanName,
      status,
      challanNum,
      vehicleNum,
      vehicleType,
      cnicBackImg,
      cnicFrontImg,
    });
    if (challanGenerate) {
      return res.status(200).json({
        success: true,
        message: "generated",
        data: challanGenerate,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getChallan = async (req, res) => {
  try {
    const {id} = req.body;
    if (!id) {
      return res.status(400).json({
        message: "id must be required",
        data: null,
      });
    }
    const challan = await challanModel.findById(id).populate("clientID");

    if (challan) {
      return res.status(200).json({
        data: challan,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: error.message,
    });
  }
};

const updateChallan = async (req, res) => {
  try {
    const {
      id,
      challanName,
      challanNum,
      status,
      clientID,
      vehicleNum,
      vehicleType,
    } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "id must be required",
      });
    }

    const getChallan = await challanModel.findById(id);
    if (!getChallan) {
      return res.status(400).json({
        message: "challan  not found with this id",
      });
    }
    let updatechallan = {
      ...(status && { status }),
      ...(challanName && { challanName }),
      ...(challanNum && { challanNum }),
      ...(vehicleType && { vehicleType }),
      ...(vehicleNum && { vehicleNum }),
      ...(clientID && { clientID }),
    };

    const update1 = req.files?.cnicFrontImg?.[0];
    const update2 = req.files?.cnicBackImg?.[0];
    if (update1) {
      const upload1 = await cloudinary.uploader.upload(update1.path, {
        folder: "challanDocs",
      });
      updatechallan.cnicFrontImg = upload1.secure_url;
    }
    if (update2) {
      const upload2 = await cloudinary.uploader.upload(update2.path, {
        folder: "challanDocs",
      });
      updatechallan.cnicBackImg = upload2.secure_url;
    }

    const updateChallanData = await challanModel.findByIdAndUpdate(
      id,
      updatechallan,
      {
        new: true,
        runValidators: true,
      },
    );

    return res
      .status(200)
      .json({ message: "successFully update record", data: updateChallanData });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: error.message,
    });
  }
};

const deleteChallan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id must be required",
        success: false,
      });
    }
    const deletee= await challanModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "challan delete",
      data: deletee,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createChallan,
  getChallan,
  updateChallan,
  deleteChallan,
};
