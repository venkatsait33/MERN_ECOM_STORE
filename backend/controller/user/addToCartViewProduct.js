const addToCartModel = require("../../models/cartProductModel");

async function addToCartViewProduct(req, res) {
  try {
    const currentUser = req.userId;
    const cartProducts = await addToCartModel.find({
      userId: currentUser,
    }).populate("productId")

    res.json({
      data: cartProducts,
      success: true,
      message: "Cart products fetched successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      error: true,
      success: true,
      message: error.message || error,
    });
  }
}

module.exports = addToCartViewProduct;