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

// A function that converts a binary number input as string to an integer
// const binaryToInteger = (string) => {
//   //split the string
//   const stringArray = string.split(" "); // this returns an array of the string
//   const stringLength = stringArray.length;
//   let multipleArray = []
//   for (let i =  0; i <= stringLength; i++){
//     stringArray[0] * 2
//   }
// };
