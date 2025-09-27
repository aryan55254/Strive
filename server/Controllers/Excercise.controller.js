const Exercise = require("../Models/Exercise.model.js");
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const searchExercises = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await Exercise.aggregate([
      { $match: { $text: { $search: query } } },
      { $addFields: { score: { $meta: "textScore" } } },
      { $sort: { score: -1 } },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllExercises,
  searchExercises,
};
