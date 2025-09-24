const express = require("express");
const authmiddleware = require("../Middlewares/verifyJWT.middleware");
const rateLimiter = require("../Middlewares/rateLimiter.middleware");
const {
  dietPlanSchema,
  workoutPlanSchema,
} = require("../Validators/Plan.validator");
const zodvalidator = require("../Middlewares/zodvalidator.middleware");
const {
  generatediet,
  generateworkout,
} = require("../Controllers/Generation.controller");

const generationrouter = express.Router();
//route for generating workouts from user input form
generationrouter.post(
  "/workout",
  authmiddleware,
  rateLimiter,
  zodvalidator(workoutPlanSchema),
  generateworkout
);
//route for generating diets from user input form
generationrouter.post(
  "/diet",
  authmiddleware,
  rateLimiter,
  zodvalidator(dietPlanSchema),
  generatediet
);

module.exports = generationrouter;
