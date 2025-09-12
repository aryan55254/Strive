const express = require("express");
const authmiddleware = require("../Middlewares/verifyJWT.middleware");
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
  zodvalidator(workoutPlanSchema),
  generateworkout
);
//route for generating diets from user input form
generationrouter.post(
  "/diet",
  authmiddleware,
  zodvalidator(dietPlanSchema),
  generatediet
);

module.exports = generationrouter;
