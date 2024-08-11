const userModel = require("../../models/userModel");

async function updateUserRole(req, res) {
  try {
    const currentUser = req.userId;
    const { userId, role, email, username } = req.body;

    const user = await userModel.findById(currentUser);

    const payload = {
      ...(email && { email: email }),
      ...(username && { username: username }),
      ...(role && { role: role }),
    };
    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    res.json({
      data: updateUser,
      success: true,
      message: "User updated successfully",
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

module.exports = updateUserRole;
