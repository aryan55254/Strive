const express = require("express");
const authmiddleware = require("../Middlewares/verifyJWT.middleware");
const authrouter = express.Router();
const {
  register,
  login,
  refresh,
  logout,
  getuser,
} = require("../Controllers/Auth.controller");
const zodvalidator = require("../Middlewares/zodvalidator.middleware");
const { loginSchema, registerSchema } = require("../Validators/Auth.validator");

authrouter.post("/register", zodvalidator(registerSchema), register);
authrouter.post("/login", zodvalidator(loginSchema), login);
authrouter.post("/refresh", refresh);
authrouter.post("/logout", logout);
authrouter.get("/getuser", authmiddleware, getuser);

module.exports = authrouter;
// Final version.