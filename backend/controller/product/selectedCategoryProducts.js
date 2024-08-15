const productModel = require("../../models/productModel");

async function selectedCategoryProducts(req, res) {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });

    res.json({
      data: product,
      success: true,
      error: false,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = selectedCategoryProducts;
