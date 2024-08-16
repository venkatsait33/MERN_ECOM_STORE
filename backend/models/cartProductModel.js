const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type:String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timeStamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", cartProductSchema); //collection name is Product

module.exports = addToCartModel; //export the model for use in other files.
