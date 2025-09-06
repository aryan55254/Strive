const express = require("express");
const authrouter = express.Router();
const { register } = require("../Controllers/Auth.controller");

authrouter.post("/register", register);

module.exports = authrouter;
