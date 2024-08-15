const productModel = require("../../models/productModel");

async function getProductDetailsController(req, res) {
  try {
    const { productId } = req.body;
      const product = await productModel.findById(productId);
      
    res.json({
      message: "Product Details",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = getProductDetailsController;
