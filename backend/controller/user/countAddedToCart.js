const addToCartModel = require("../../models/cartProductModel");

async function countAddedToCartProduct(req, res) {
  try {
    const userId  = req?.userId;
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    res.json({
      data: { count: count },
      success: true,
      message: "Cart count fetched successfully",
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

module.exports = countAddedToCartProduct;