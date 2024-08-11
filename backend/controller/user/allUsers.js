const userModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("user-id", req.userId);

    const users = await userModel.find();
    res.json({
      data: users,
      error: false,
      success: true,
      message: "All users fetched successfully",
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

module.exports = allUsers;
