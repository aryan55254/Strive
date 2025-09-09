const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  generationCount: {
    type: Number,
    default: 0,
  },
  lastGenerationDate: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
