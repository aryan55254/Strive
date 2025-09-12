const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function generateDietPlanFromAI(formData) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    const prompt = `
      You are a world-class nutritionist and fitness coach. Your task is to create a personalized diet plan based on the user's specific data.

      User Data:
      - Age: ${formData.age}
      - Gender: ${formData.gender}
      - Height: ${formData.height} cm
      - Weight: ${formData.weight} kg
      - Primary Goal: ${formData.primaryGoal}
      - Activity Level: ${formData.activityLevel}
      - Dietary Preference: ${formData.dietaryPreference}
      - Allergies: ${formData.allergies || "None"}
      - Medical History: ${formData.medicalHistory || "None"}
      - Foods to Avoid: ${formData.foodsToAvoid || "None"}

      Please generate a comprehensive, 7-day diet plan.

      CRITICAL INSTRUCTIONS:
      1. Your entire response MUST be a single, valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON.
      2. The JSON object must strictly follow this exact structure:
      {
        "planTitle": "string",
        "dailyAverage": { "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number },
        "weeklySchedule": [ { "day": "string", "dailyTotalCalories": number, "meals": [ { "mealType": "string", "time": "string", "totalMealCalories": number, "items": [ { "food": "string", "quantity": "string", "calories": number } ] } ] } ],
        "generalGuidance": { "hydration": "string", "medicalNotes": ["string"], "generalTips": ["string"] }
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating diet plan from AI:", error);
    throw new Error("Failed to generate diet plan from AI.");
  }
}

async function generateWorkoutPlanFromAI(formData) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      You are an expert personal trainer and strength coach. Create a personalized workout plan based on the user's data.

      User Data:
      - Primary Goal: ${formData.primaryGoal}
      - Fitness Level: ${formData.fitnessLevel}
      - Days Per Week: ${formData.daysPerWeek}
      - Session Duration: ${formData.sessionDuration} minutes
      - Available Equipment: ${formData.availableEquipment.join(", ")}
      - Focus Area: ${formData.focusArea}
      - Injuries or Limitations: ${formData.injuriesOrLimitations || "None"}

      Please generate a detailed, week-long workout plan.

      CRITICAL INSTRUCTIONS:
      1. Your entire response MUST be a single, valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON.
      2. The JSON object must strictly follow this exact structure:
      {
        "planTitle": "string",
        "summary": { "goal": "string", "split": "string", "frequency": "string" },
        "guidance": { "warmup": "string", "cooldown": "string", "progressiveOverload": "string" },
        "weeklySchedule": [ { "day": number, "dayOfWeek": "string", "focus": "string", "exercises": [ { "name": "string", "sets": number, "reps": "string", "restMinutes": number, "tip": "string" } ] } ],
        "generalGuidance": { "medicalNotes": ["string"], "generalTips": ["string"] }
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating workout plan from AI:", error);
    throw new Error("Failed to generate workout plan from AI.");
  }
}

module.exports = { generateDietPlanFromAI, generateWorkoutPlanFromAI };
