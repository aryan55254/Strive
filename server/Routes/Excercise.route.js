const express = require("express");
const {
  getAllExercises,
  searchExercises,
} = require("../Controllers/Excercise.controller");

const excerciserouter = express.Router();

excerciserouter.get("/", getAllExercises);
excerciserouter.get("/search", searchExercises);

module.exports = excerciserouter;
