const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("You are not authorized to upload a product");
    }
    const { _id, ...resBody } = req.body;
    
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.json({
      data: updateProduct,
      success: true,
      error: false,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = updateProductController;
