const User = require("../Models/User.model");
const Saved_Diets = require("../Models/SavedDiet.model");
const Saved_Workouts = require("../Models/SavedWorkout.model");

//controler to save a diet to db
const savenewdiet = async (req, res, next) => {
  try {
    const { planName, planData } = req.body;
    const userId = req.user._id;
    const newdiet = new Saved_Diets({
      userId,
      PlanName: planName,
      PlanData: planData,
    });
    await newdiet.save();
    return res.status(201).json({ message: "new diet plan saved" });
  } catch (err) {
    next(err);
  }
};
//controller to save a workout to db
const savenewworkout = async (req, res, next) => {
  try {
    const { planName, planData } = req.body;
    const userId = req.user._id;
    const newworkout = new Saved_Workouts({
      userId,
      PlanName: planName,
      PlanData: planData,
    });
    await newworkout.save();
    return res.status(201).json({ message: "new workout plan saved" });
  } catch (err) {
    next(err);
  }
};
//controller to delete a diet from db
const deletediets = async (req, res, next) => {
  try {
    const diet = await Saved_Diets.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!diet) {
      return res.status(404).json({
        message: "Diet not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({ message: "diet deleted" });
  } catch (err) {
    next(err);
  }
};
//controller to delete a workout from db
const deleteworkouts = async (req, res, next) => {
  try {
    const workout = await Saved_Workouts.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!workout) {
      return res.status(404).json({
        message: "Workout not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({ message: "Workout deleted" });
  } catch (err) {
    next(err);
  }
};
//controller to get diets
const getdiets = async (req, res, next) => {
  try {
    const diets = await Saved_Diets.find({
      userId: req.user._id,
    });
    res.status(200).json(diets);
  } catch (err) {
    next(err);
  }
};
//controller to get workouts
const getworkouts = async (req, res, next) => {
  try {
    const workouts = await Saved_Workouts.find({
      userId: req.user._id,
    });
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
};
//exports
module.exports = {
  deletediets,
  deleteworkouts,
  getdiets,
  getworkouts,
  savenewdiet,
  savenewworkout,
};
