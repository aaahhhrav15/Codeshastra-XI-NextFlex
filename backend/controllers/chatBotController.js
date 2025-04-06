import TravelPlan from "../models/TravelPlanModel.js";
import genAIModel from "../utils/genAIModel.js";

// Cache for recently accessed travel plans to reduce database calls
const planCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export const chatWithTravelPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "User message is required." });
    }
    
    // Check cache first
    let plan;
    const cacheKey = userId.toString();
    
    if (planCache.has(cacheKey)) {
      const cachedData = planCache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < CACHE_TTL) {
        plan = cachedData.plan;
      }
    }
    
    // If not in cache or cache expired, fetch from database
    if (!plan) {
      plan = await TravelPlan.findOne({ owner: userId });
      if (!plan) {
        return res.status(404).json({ error: "No travel plan found for this user." });
      }
      
      // Update cache
      planCache.set(cacheKey, { 
        plan, 
        timestamp: Date.now() 
      });
    }
    
    // Format plan data for improved readability in the prompt
    const formattedOverview = formatOverview(plan.overview);
    const formattedItinerary = formatItinerary(plan.itinerary);
    const formattedBudget = formatBudget(plan.budgetBreakdown);
    
    const systemPrompt = `
    You are a helpful travel assistant for a specific user's travel plan to ${plan.overview.destination}.
    
    Here is their plan data:
    
    ${formattedOverview}
    
    ${formattedItinerary}
    
    ${formattedBudget}
    
    Travel Tips:
    ${plan.travelTips.map(tip => `- ${tip}`).join('\n')}
    
    Weather Forecast:
    ${plan.weatherForecast.map(day => 
      `- ${day.date}: ${day.condition}, ${day.temperature.low}°C to ${day.temperature.high}°C`
    ).join('\n')}
    
    Now answer this question: "${message}"
    
    Your response must be in the following **pure JSON** format only (no markdown formatting or explanations):
    {
      "response": "Give a helpful answer to the question using the provided travel data.",
      "options": ["Relevant Option 1", "Relevant Option 2", "Relevant Option 3"]
    }
    `;
    
    const result = await genAIModel.generateContent(systemPrompt);
    let responseText = await result.response.text();
    
    // Clean up any markdown formatting from AI response
    responseText = responseText.trim();
    
    // Remove Markdown ```json ... ```
    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    } else if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```/g, "").trim();
    }
    
    try {
      const chatResponse = JSON.parse(responseText);
      res.status(200).json(chatResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", responseText);
      res.status(500).json({ 
        error: "Failed to parse AI response", 
        details: parseError.message 
      });
    }
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to process chat", details: err.message });
  }
};

// Helper functions for formatting data
function formatOverview(overview) {
  return `OVERVIEW:
- Trip: ${overview.source} to ${overview.destination}
- Duration: ${overview.duration} days (${overview.startDate} to ${overview.endDate})
- Total Budget: ${overview.totalBudget.amount} ${overview.totalBudget.currency}`;
}

function formatItinerary(itinerary) {
  return `ITINERARY:
${itinerary.map(day => `
DAY ${day.day} (${day.date}):
${day.activities.map(activity => `
  ${activity.time} - ${activity.description}
  Location: ${activity.location}
  Cost: ${activity.cost.amount} ${activity.cost.currency}
  Duration: ${activity.duration}
  Notes: ${activity.notes}
`).join('')}
`).join('')}`;
}

function formatBudget(budget) {
  return `BUDGET BREAKDOWN:
- Transportation: ${budget.transportation} INR
- Accommodation: ${budget.accommodation} INR
- Activities: ${budget.activities} INR
- Food: ${budget.food} INR
- Miscellaneous: ${budget.miscellaneous} INR
- Total: ${budget.total} INR`;
}