const {
  generateDietPlanFromAI,
  generateWorkoutPlanFromAI,
} = require("../Services/Gemini.service");

//controller to generate diet from gemini service
const generatediet = async (req, res, next) => {
  try {
    const generatedPlan = await generateDietPlanFromAI(req.body);
    return res.status(200).json(generatedPlan);
  } catch (err) {
    next(err);
  }
};
//controller to generate workout from gemini service
const generateworkout = async (req, res, next) => {
  try {
    const generatedPlan = await generateWorkoutPlanFromAI(req.body);
    return res.status(200).json(generatedPlan);
  } catch (err) {
    next(err);
  }
};

//export the controllers
module.exports = { generatediet, generateworkout };
