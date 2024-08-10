async function userLogout(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      data: [],
      success: true,
      message: "User logged out successfully",
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

module.exports = userLogout;
