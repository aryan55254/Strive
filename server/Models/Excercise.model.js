const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bodyPart: { type: String, required: true },
    description: { type: String, required: true },
    equipment: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);
exerciseSchema.index({ name: "text", description: "text", bodyPart: "text" });

module.exports = mongoose.model("Exercise", exerciseSchema);
