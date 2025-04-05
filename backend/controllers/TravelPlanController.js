import TravelPlan from "../models/TravelPlanModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrompt2 } from "../util/prompt.js";

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

export async function getTravelOptions(req, res) {
  const source = req.body.source;
  const destination = req.body.destination;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const travelClass = req.body.travelClass;
  const passengerCount = req.body.passengerCount;

  const sourceAirportCode = await getAirportCode(source);
  const destinationAirportCode = await getAirportCode(destination);

  const data = await getFlights(
    sourceAirportCode,
    destinationAirportCode,
    startDate,
    endDate,
    travelClass,
    passengerCount
  );

  console.log(data);

  res.status(200).json(data);
}

async function getFlights(
  source,
  destination,
  start,
  end,
  travelClass,
  passengerCount
) {
  const url = `https://agoda-com.p.rapidapi.com/flights/search-roundtrip?origin=${source}&destination=${destination}&departureDate=${start}&returnDate=${end}&sort=Price&limit=5&adults=${passengerCount}&cabinType=${travelClass}&stops=0&currency=INR`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1c0b23dc25msh78041305e95e13ep192037jsnda2daecfedfd",
      "x-rapidapi-host": "agoda-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const dataArray = [];
    console.log(result)
    result.data.bundles.forEach((item) => {
      const obj = {
        price: item.bundlePrice[0].price.inr.display.averagePerPax.allInclusive,
        arrivalTime: item.outboundSlice.segments[0].arrivalDateTime,
        departureTime: item.outboundSlice.segments[0].departDateTime,
        duration: item.outboundSlice.segments[0].duration,
        flightNumber: item.outboundSlice.segments[0].flightNumber,
        arrivalCity:
          item.outboundSlice.segments[0].airportContent.arrivalCityName,
        departureCity:
          item.outboundSlice.segments[0].airportContent.departureCityName,
        arrivalAirport:
          item.outboundSlice.segments[0].airportContent.arrivalAirportName,
        departureAirport:
          item.outboundSlice.segments[0].airportContent.departureAirportName,
        cabinClass: item.outboundSlice.segments[0].cabinClassContent.cabinName,
        carrierCode: item.outboundSlice.segments[0].carrierContent.carrierCode,
        carrierIcon: item.outboundSlice.segments[0].carrierContent.carrierIcon,
        carrierName: item.outboundSlice.segments[0].carrierContent.carrierName,
      };
      dataArray.push(obj);
    });
    return dataArray;
  } catch (error) {
    return error;
  }
}

async function getAirportCode(query) {
  const url =
    `https://agoda-com.p.rapidapi.com/flights/auto-complete?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1c0b23dc25msh78041305e95e13ep192037jsnda2daecfedfd",
      "x-rapidapi-host": "agoda-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    console.log("Fetching Data");
    
    const result = await response.json();
    console.log(result.data[0].airports)
    return result.data[0].airports[0].code;
  } catch (error) {
    return error;
  }
}
