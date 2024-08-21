const productModel = require("../../models/productModel");

async function searchProduct(req, res) {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      "$or": [{ productName: regex }, { category: regex }],
    });
    res.json({
      data: product,
      success: true,
      message: "Products found",
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

module.exports = searchProduct;
