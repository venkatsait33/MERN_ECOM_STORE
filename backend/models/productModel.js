const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    price: Number,
    sellingPrice: Number,
    description: String,
    productImage: [],
  },
  {
    timeStamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema); //collection name is Product

module.exports = productModel; //export the model for use in other files.
