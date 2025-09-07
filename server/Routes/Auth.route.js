const express = require("express");
const authrouter = express.Router();
const {
  register,
  login,
  refresh,
  logout,
} = require("../Controllers/Auth.controller");
const zodvalidator = require("../Middlewares/zodvalidator.middleware");
const { loginSchema, registerSchema } = require("../Validators/Auth.validator");

authrouter.post("/register", zodvalidator(registerSchema), register);
authrouter.post("/login", zodvalidator(loginSchema), login);
authrouter.post("/refresh", refresh);
authrouter.post("/logout", logout);

module.exports = authrouter;
