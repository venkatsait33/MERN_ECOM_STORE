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
const categoryProductsController = require("../controller/product/getCategoryProducts");
const selectedCategoryProducts = require("../controller/product/selectedCategoryProducts");
const getProductDetailsController = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCart");
const countAddedToCartProduct = require("../controller/user/countAddedToCart");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateCart = require("../controller/user/UpdateCart");
const deleteCartProduct = require("../controller/user/deleteCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProduct = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const ordersController = require("../controller/order/orderController");
const webhooks = require("../controller/order/webhook");
const allOrderController = require("../controller/order/allorders.controller");

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
router.get("/get-category", categoryProductsController);
router.post("/category-product", selectedCategoryProducts);
router.post("/product-details", getProductDetailsController);

// add to cart
router.post("/add-to-cart", authToken, addToCartController);
router.get("/countAddedToCartProduct", authToken, countAddedToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart", authToken, updateCart);
router.post("/delete-cart", authToken, deleteCartProduct);

// search product
router.get("/search", searchProduct);

//sort products

router.post("/filter-products", filterProduct);

//payment

router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks); //http://localhost:8080/api/webhook

router.get("/order-list", authToken, ordersController);
router.get("/all-order", authToken, allOrderController);

module.exports = router;
