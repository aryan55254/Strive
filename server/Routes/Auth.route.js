const express = require("express");
const authrouter = express.Router();
const { register } = require("../Controllers/Auth.controller");
const zodvalidator = require("../Middlewares/zodvalidator.middleware");
const { loginSchema, registerSchema } = require("../Validators/Auth.validator");

authrouter.post("/register", zodvalidator(registerSchema), register);

module.exports = authrouter;
