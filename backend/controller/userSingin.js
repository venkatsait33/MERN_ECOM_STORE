const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const data = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(data, uuidv4(), { expiresIn: 60 * 60 * 24 });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(200).json({
        data: token,
        success: true,
        error: false,
        message: "User Login Successful",
      });
    } else {
      throw new Error("Incorrect password");
    }
    console.log(checkPassword);
  } catch (error) {
    res.json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}
module.exports = userSignInController;
