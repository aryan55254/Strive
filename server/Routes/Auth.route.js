const express = require("express");
const authrouter = express.Router();
const { register, login, refresh } = require("../Controllers/Auth.controller");
const zodvalidator = require("../Middlewares/zodvalidator.middleware");
const { loginSchema, registerSchema } = require("../Validators/Auth.validator");

authrouter.post("/register", zodvalidator(registerSchema), register);
authrouter.post("/login", zodvalidator(loginSchema), login);
authrouter.post("/refresh", refresh);

module.exports = authrouter;
