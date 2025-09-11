const User = require("../Models/User.model");
const SavedDiets = require("../Models/SavedDiet.model");
const SavedWorkouts = require("../Models/SavedWorkout.model");
const {
  generateDietPlanFromAI,
  generateWorkoutPlanFromAI,
} = require("../Services/Gemini.service");

//controller to generate diet from gemini service
const generatediet = async (req, res, next) => {
  try {
    const userinput = {
      age,
      gender,
      height,
      weight,
      primaryGoal,
      activityLevel,
      dietaryPreference,
      allergies,
      medicalHistory,
      foodsToAvoid,
    };
    req.body(userinput);
    const generateddiet = await generateDietPlanFromAI(userinput);
    return res.status(200).json(generateddiet);
  } catch (err) {
    next(err);
  }
};
//controller to generate workout from gemini service
const generateworkout = async (req, res, next) => {
  try {
    const userinput = {
      primaryGoal,
      fitnessLevel,
      daysPerWeek,
      sessionDuration,
      availableEquipment,
      focusArea,
      injuriesOrLimitations,
    };
    req.body(userinput);
    const generatedworkout = await generateWorkoutPlanFromAI(userinput);
    return res.status(200).json(generatedworkout);
  } catch (err) {
    next(err);
  }
};
//con
//controller to save user's new diet plan generated to the db

//controller to save user;s  new workout plan generated to the db

//controllerto display user's saved diet plans

//controller to display user's saved workout plans

//controller to delete user's saved diet plan by id

//controller to delete user;s saved workout plan by id

//export the controllers
module.exports = { generatediet, generateworkout };
