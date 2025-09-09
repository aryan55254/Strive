const mongoose = require("mongoose");

const SavedWorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    PlanName: {
      type: String,
      default: "My Workout Plan",
      required: true,
    },
    PlanData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Saved_Workout_Plans", SavedWorkoutSchema);
