const addToCartModel = require("../../models/cartProductModel");

async function deleteCartProduct(req, res) {
  try {
    const currentUserId = req.userId;
    const cartProductId = req.body._id;
    const deleteProduct = await addToCartModel.deleteOne({
      _id: cartProductId,
    });
    res.json({
      data: deleteProduct,
      message: "Product deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = deleteCartProduct;
