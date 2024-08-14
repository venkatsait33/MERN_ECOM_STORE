const productModel = require("../../models/productModel");

async function categoryProductsController(req, res) {
  try {
    const productCategory = await productModel.distinct("category");

    // to store the one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      data: productByCategory,
      success: true,
      error: false,
      message: "Category Products",
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = categoryProductsController;
