const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSingin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUserRole = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductsController = require("../controller/product/getProducts");
const updateProductController = require("../controller/product/updateProduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

//Admin-panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUserRole);

//upload products

router.post("/upload-product", authToken, uploadProductController);
router.get("/all-products", getProductsController);
router.post("/update-product", authToken, updateProductController);

module.exports = router;
