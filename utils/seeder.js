require("dotenv").config();
const Books = require("../model/bookModel");
const connectDB = require("../db/connectDB");
const bookData = require("../data/data.json");
connectDB(process.env.MONGO_URI);
const seedProduct = async (req, res) => {
  try {
    await Books.deleteMany();
    console.log("products are deleted");

    await Books.insertMany(bookData);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProduct();
