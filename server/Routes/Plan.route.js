const express = require("express");
const authmiddleware = require("../Middlewares/verifyJWT.middleware");
const {
  deletediets,
  deleteworkouts,
  getdiets,
  getworkouts,
  savenewdiet,
  savenewworkout,
} = require("../Controllers/Plan.controller");
const planrouter = express.Router();

//route to save a  diet to db
planrouter.post("/save_diet", authmiddleware, savenewdiet);
//route to save a workout to db
planrouter.post("/save_workout", authmiddleware, savenewworkout);
//route to delete a diet from db
planrouter.delete("/delete_diet/:id", authmiddleware, deletediets);
//route to delete a workout from db
planrouter.delete("/delete_workout/:id", authmiddleware, deleteworkouts);
//route to get saved diets from server
planrouter.get("/saved_diets", authmiddleware, getdiets);
//route to get saved workouts from server
planrouter.get("/saved_workouts", authmiddleware, getworkouts);

//exports
module.exports = planrouter;
