const mongoose = require("mongoose");

const SavedDietSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    PlanName: {
      type: String,
      default: "My Diet Plan",
      required: true,
    },
    PlanData: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saved_Diet_Plans", SavedDietSchema);
