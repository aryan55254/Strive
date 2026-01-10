const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
function cleanJsonString(text) {
  // Remove markdown code blocks (```json ... ``` or just ``` ... ```)
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = text.match(codeBlockRegex);
  if (match) {
    return match[1].trim();
  }
  return text.trim();
}

async function generateDietPlanFromAI(formData) {
  let responseText;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
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
    responseText = result.response.text();
    
    // Clean and parse
    const cleanJson = cleanJsonString(responseText);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error(
      "Failed to process AI response. Raw text:",
      responseText,
      "Error:",
      error
    );
    if (responseText === undefined) {
      throw new Error("Failed to get a response from the AI service. Reason: " + error.message);
    } else {
      throw new Error(
        "The AI returned invalid JSON. Check the server logs for the raw text."
      );
    }
  }
}

async function generateWorkoutPlanFromAI(formData) {
  let responseText;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
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
    responseText = result.response.text();

    // Clean and parse
    const cleanJson = cleanJsonString(responseText);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error(
      "Failed to process AI response. Raw text:",
      responseText,
      "Error:",
      error
    );

    if (error.message && (error.message.includes("401") || error.message.includes("403") || error.message.includes("API key"))) {
      const authError = new Error("Invalid or expired Gemini API Key. Please check your Render environment variables.");
      authError.statusCode = 401;
      throw authError;
    }

    if (error.message && error.message.includes("429")) {
      const rateLimitError = new Error("Gemini API Quota Exceeded. Please try again later.");
      rateLimitError.statusCode = 429;
      throw rateLimitError;
    }

    if (responseText === undefined) {
      throw new Error("Failed to get a response from the AI service. Reason: " + error.message);
    } else {
      throw new Error(
        "The AI returned invalid JSON. Check the server logs for the raw text."
      );
    }
  }
}

module.exports = { generateDietPlanFromAI, generateWorkoutPlanFromAI };
