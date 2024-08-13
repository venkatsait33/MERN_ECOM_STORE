const productModel = require("../../models/productModel");

async function getProductsController(req, res) {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.json({
      data: products,
      success: true,
      message: "Products fetched successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = getProductsController;
