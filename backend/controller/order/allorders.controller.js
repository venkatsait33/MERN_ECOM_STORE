const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (user.role !== "ADMIN") {
      return response.status(500).json({
        message: "Unauthorized Access",
        success: false,
        data: null,
      });
    }

    const allOrders = await orderModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: allOrders,
      success: true,
      message: "All orders fetched successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = allOrderController;
