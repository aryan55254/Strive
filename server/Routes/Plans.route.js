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
} = require("../Controllers/Plan.controller");

const planrouter = express.Router();
//route for generating workouts from user input form
planrouter.post(
  "/generate/workout",
  authmiddleware,
  zodvalidator(workoutPlanSchema),
  generatediet
);
//route for generating diets from user input form
planrouter.post(
  "/generate/diet",
  authmiddleware,
  zodvalidator(dietPlanSchema),
  generateworkout
);
//route to save a  diet to db
planrouter.post("/savediet", authmiddleware, zodvalidator);
//route to save a workout to db
planrouter.post("/saveworkout", authmiddleware, zodvalidator);
//route to delete a diet from db
planrouter.post("/delete/diet/:id", authmiddleware, zodvalidator);
//route to delete a workout from db
planrouter.post("/delete/workout/:id", authmiddleware, zodvalidator);
//route to get saved diets from server
planrouter.post("/saveddiets", authmiddleware, zodvalidator);
//route to get saved workouts from server
planrouter.post("/savedworkouts", authmiddleware, zodvalidator);

module.exports = planrouter;
