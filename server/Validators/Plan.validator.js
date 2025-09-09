const { z } = require("zod");

const dietPlanSchema = z.object({
  body: z.object({
    age: z
      .number()
      .int()
      .positive()
      .min(13, "You must be at least 13 years old."),
    gender: z.enum(["Male", "Female", "Other"]),
    height: z.number().int().positive(),
    weight: z.number().positive(),
    primaryGoal: z.enum(["Lose Weight", "Gain Muscle", "Maintain Weight"]),
    activityLevel: z.enum([
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
    ]),
    dietaryPreference: z.enum([
      "None",
      "Vegetarian",
      "Vegan",
      "Keto",
      "Paleo",
      "Pescatarian",
      "Eggetarian",
    ]),
    allergies: z.string().optional(),
    medicalHistory: z.string().optional(),
    foodsToAvoid: z.string().optional(),
  }),
});

const workoutPlanSchema = z.object({
  body: z.object({
    primaryGoal: z.enum([
      "Build Muscle",
      "Lose Fat",
      "Improve Strength",
      "General Fitness",
    ]),
    fitnessLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
    daysPerWeek: z.number().int().min(1).max(7),
    sessionDuration: z.number().int().positive(),
    availableEquipment: z
      .array(z.string())
      .nonempty("Please select at least one equipment option."),
    focusArea: z.enum([
      "Full Body",
      "Upper Body",
      "Lower Body",
      "Push/Pull/Legs",
    ]),
    injuriesOrLimitations: z.string().optional(),
  }),
});

module.exports = {
  dietPlanSchema,
  workoutPlanSchema,
};
