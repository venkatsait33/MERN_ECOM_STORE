const orderModel = require("../../models/orderProductModel");

async function ordersController(req, res) {
  try {
    const currentUserId = req.userId;

    const orderList = await orderModel.find({ userId: currentUserId });

    res.json({
      data: orderList,
      success: true,
      message: "Order list fetched successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
      data: [],
    });
  }
}

module.exports = ordersController;
