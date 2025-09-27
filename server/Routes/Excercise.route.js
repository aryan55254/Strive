const express = require("express");
const {
  getAllExercises,
  searchExercises,
} = require("../Controllers/Excercise.controller");

const router = express.Router();

router.get("/", getAllExercises);
router.get("/search", searchExercises);

module.exports = router;
