const TravelPlan = require("../models/TravelPlanModel");
const { getPrompt2 } = require("../util/prompt.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiApiKey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(geminiApiKey);
let genAIModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function store(req, res) {
  let prompt = getPrompt2(
    req.body.source,
    req.body.destination,
    req.body.departureDate,
    req.body.returnDate,
    req.body.travelers,
    req.body.duration,
    req.body.budget,
    req.body.preferences.accomodationType,
    req.body.preferences.travelClass,
    req.body.preferences.activities,
    req.body.preferences.mealPreferences,
    req.body.preferences.transportModes
  );
  const result = await genAIModel.generateContent(prompt);
  const geminiResponse = JSON.parse(result.response.text().slice(8, -3));

  try {
    const {
      overview,
      itinerary,
      budgetBreakdown,
      travelTips,
      weatherForecast,
    } = geminiResponse;

    const newPlan = new TravelPlan({
      overview,
      itinerary,
      budgetBreakdown,
      travelTips,
      weatherForecast,
      owner: req.user._id,
    });

    await newPlan.save();

    res.status(201).json({
      message: "Travel plan saved successfully!",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error saving travel plan:", error);
    res.status(500).json({
      message: "Failed to save travel plan",
      error: error.message,
    });
  }
}

/**
 * 
 * getPrompt2(
    "Mumbai",
    "Matheran",
    "2025-05-01",
    "2025-05-2",
    1,
    2,
    30000,
    "mid-range",
    "economy",
    ["relaxation"],
    ["vegetarian"],
    ["car"]
  )
 */
