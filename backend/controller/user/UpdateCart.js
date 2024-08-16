const addToCartModel = require("../../models/cartProductModel");

async function updateCart(req, res) {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req?.body?._id;
    const qty = req?.body?.quantity;
    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.json({
      message: "Cart updated successfully",
      success: true,
      data: updateProduct,
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

module.exports = updateCart;
