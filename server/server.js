const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./config/db");
const authroutes = require("./Routes/Auth.route.js");
const errorhandler = require("./Middlewares/errorhandler.middleware");

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(cors());

connectdb();

app.use("/api/auth", authroutes);

app.use(errorhandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
