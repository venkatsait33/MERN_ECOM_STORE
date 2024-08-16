const addToCartModel = require("../../models/cartProductModel");

async function addToCartController(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({ productId });

    if (isProductAvailable) {
      return res.json({
        message: "Product already exists in the cart",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "product add to cart successfully",
      data: saveProduct,
      success: true,
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

module.exports = addToCartController;
