const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function uploadProductController(req, res) {
  try {
    const currentUser = req.userId;

    if (!uploadProductPermission(currentUser)) {
      throw new Error("You are not authorized to upload a product");
    }
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(200).json({
      message: "Product uploaded successfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = uploadProductController;
