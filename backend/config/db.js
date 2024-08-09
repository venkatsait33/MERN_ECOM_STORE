const mongoose = require("mongoose");

async function connectDB() {
  try {
      mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
      
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
