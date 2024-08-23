async function userLogout(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("token",tokenOption);
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
