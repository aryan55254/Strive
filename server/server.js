const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./config/db");

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(cors());

connectdb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
