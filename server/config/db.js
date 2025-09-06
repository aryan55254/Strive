const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectdb = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MONGO DB connected to the server");
    })
    .catch((err) => {
      console.log(`Error While Connecting To MongoDB: ${err}`);
    });
};

module.exports = connectdb;
