const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cleanJsonString(text) {
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = text.match(codeBlockRegex);
  if (match) {
    return match[1].trim();
  }
  return text.trim();
}

function getSmartMockDietPlan(formData) {
  let bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age;
  bmr += formData.gender === "male" ? 5 : -161;

  let targetCalories = Math.round(bmr * 1.3);
  if (formData.primaryGoal && formData.primaryGoal.toLowerCase().includes("lose")) targetCalories -= 500;
  if (formData.primaryGoal && (formData.primaryGoal.toLowerCase().includes("muscle") || formData.primaryGoal.toLowerCase().includes("gain"))) targetCalories += 300;

  let protein, carbs, fats;
  if (formData.primaryGoal && formData.primaryGoal.toLowerCase().includes("muscle")) {
    protein = Math.round(formData.weight * 2.2);
    fats = Math.round((targetCalories * 0.25) / 9);
  } else {
    protein = Math.round(formData.weight * 1.8);
    fats = Math.round((targetCalories * 0.30) / 9);
  }
  carbs = Math.round((targetCalories - (protein * 4 + fats * 9)) / 4);

  const isVeg = formData.dietaryPreference && formData.dietaryPreference.toLowerCase().includes("veg");
  const breakfast = isVeg ? "Oatmeal with Almonds & Whey/Pea Protein" : "3 Eggs Omelette with Spinach & Toast";
  const lunch = isVeg ? "Lentil Soup (Dal) with Brown Rice & Curd" : "Grilled Chicken Breast with Quinoa & Veggies";
  const dinner = isVeg ? "Paneer/Tofu Stir Fry with Mixed Vegetables" : "Baked Salmon/Fish with Steamed Broccoli";

  return {
    planTitle: `Personalized ${formData.primaryGoal || "Fitness"} Plan (AI Generated)`,
    dailyAverage: {
      calories: targetCalories,
      proteinGrams: protein,
      carbsGrams: carbs,
      fatGrams: fats
    },
    weeklySchedule: Array.from({ length: 7 }).map((_, i) => ({
      day: `Day ${i + 1}`,
      dailyTotalCalories: targetCalories,
      meals: [
        {
          mealType: "Breakfast",
          time: "08:00",
          totalMealCalories: Math.round(targetCalories * 0.25),
          items: [{ food: breakfast, quantity: "1 serving", calories: Math.round(targetCalories * 0.25) }]
        },
        {
          mealType: "Lunch",
          time: "13:00",
          totalMealCalories: Math.round(targetCalories * 0.35),
          items: [{ food: lunch, quantity: "1 bowl", calories: Math.round(targetCalories * 0.35) }]
        },
        {
          mealType: "Snack",
          time: "17:00",
          totalMealCalories: Math.round(targetCalories * 0.10),
          items: [{ food: "Protein Shake or Greek Yogurt", quantity: "1 cup", calories: Math.round(targetCalories * 0.10) }]
        },
        {
          mealType: "Dinner",
          time: "20:00",
          totalMealCalories: Math.round(targetCalories * 0.30),
          items: [{ food: dinner, quantity: "1 plate", calories: Math.round(targetCalories * 0.30) }]
        }
      ]
    })),
    generalGuidance: {
      hydration: "3-4 Liters of water daily",
      medicalNotes: ["Consult a physician before starting."],
      generalTips: ["Consistency is key.", "Focus on whole foods."]
    }
  };
}

function getSmartMockWorkoutPlan(formData) {
  const days = parseInt(formData.daysPerWeek) || 4;
  const focus = formData.focusArea || "Full Body";
  
  return {
    planTitle: `Custom ${focus} Strength Program`,
    summary: {
      goal: formData.primaryGoal || "General Fitness",
      split: days >= 5 ? "Push/Pull/Legs" : "Upper/Lower Split",
      frequency: `${days} days per week`
    },
    guidance: {
      warmup: "5-10 mins dynamic stretching (arm circles, leg swings)",
      cooldown: "Static stretching for major muscle groups",
      progressiveOverload: "Increase weight or reps every 2 weeks"
    },
    weeklySchedule: Array.from({ length: days }).map((_, i) => ({
      day: i + 1,
      dayOfWeek: `Day ${i + 1}`,
      focus: i % 2 === 0 ? "Upper Body / Push" : "Lower Body / Pull",
      exercises: [
        { name: "Compound Movement (Squat/Bench/Deadlift)", sets: 3, reps: "5-8", restMinutes: 3, tip: "Focus on form" },
        { name: "Secondary Compound (Press/Row)", sets: 3, reps: "8-10", restMinutes: 2, tip: "Control the eccentric" },
        { name: "Isolation Exercise 1", sets: 3, reps: "10-12", restMinutes: 1, tip: "Squeeze at the top" },
        { name: "Isolation Exercise 2", sets: 3, reps: "12-15", restMinutes: 1, tip: "Feel the burn" },
        { name: "Core Work", sets: 3, reps: "15-20", restMinutes: 1, tip: "Brace your core" }
      ]
    })),
    generalGuidance: {
      medicalNotes: ["Stop if you feel sharp pain."],
      generalTips: ["Sleep 7-8 hours for recovery.", "Hydrate during workouts."]
    }
  };
}

async function generateDietPlanFromAI(formData) {
  let responseText;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    
    const prompt = `
      You are a world-class nutritionist. Create a personalized diet plan.
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

      Generate a 7-day plan.
      CRITICAL: Return ONLY a valid JSON object matching this structure:
      {
        "planTitle": "string",
        "dailyAverage": { "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number },
        "weeklySchedule": [ { "day": "string", "dailyTotalCalories": number, "meals": [ { "mealType": "string", "time": "string", "totalMealCalories": number, "items": [ { "food": "string", "quantity": "string", "calories": number } ] } ] } ],
        "generalGuidance": { "hydration": "string", "medicalNotes": ["string"], "generalTips": ["string"] }
      }
    `;
    
    const result = await model.generateContent(prompt);
    responseText = result.response.text();
    const cleanJson = cleanJsonString(responseText);
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("AI Generation Failed. Switching to Fallback Mode.", error.message);
    return getSmartMockDietPlan(formData);
  }
}

async function generateWorkoutPlanFromAI(formData) {
  let responseText;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      You are an expert personal trainer. Create a workout plan.
      User Data:
      - Primary Goal: ${formData.primaryGoal}
      - Fitness Level: ${formData.fitnessLevel}
      - Days Per Week: ${formData.daysPerWeek}
      - Session Duration: ${formData.sessionDuration} minutes
      - Available Equipment: ${formData.availableEquipment.join(", ")}
      - Focus Area: ${formData.focusArea}
      - Injuries: ${formData.injuriesOrLimitations || "None"}

      Generate a weekly plan.
      CRITICAL: Return ONLY a valid JSON object matching this structure:
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
    const cleanJson = cleanJsonString(responseText);
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("AI Generation Failed. Switching to Fallback Mode.", error.message);
    return getSmartMockWorkoutPlan(formData);
  }
}

module.exports = { generateDietPlanFromAI, generateWorkoutPlanFromAI };