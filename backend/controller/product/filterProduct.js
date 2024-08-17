const productModel = require("../../models/productModel");

async function filterProduct(req, res) {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
      category: { $in: categoryList },
    });

    res.json({
      data: product,
      success: true,
      message: "Filtered products fetched successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
}

module.exports = filterProduct;
