const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./config/db");
const authroutes = require("./Routes/Auth.route.js");
const errorhandler = require("./Middlewares/errorhandler.middleware");
const generationrouter = require("./Routes/Generation.route.js");
const planrouter = require("./Routes/Plan.route.js");
const exerciserouter = require("./Routes/Excercise.route.js");

const app = express();

const corsOptions = {
  origin: "https://strive-chi.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieparser());
app.use(express.json());

connectdb();

app.use("/api/auth", authroutes);
app.use("/api/generate", generationrouter);
app.use("/api/plans", planrouter);
app.use("/api/exercise", exerciserouter);

app.use(errorhandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
