import mongoose from "mongoose";

const CostSchema = new mongoose.Schema(
  {
    amount: Number,
    currency: String,
  },
  { _id: false }
);

const ActivitySchema = new mongoose.Schema(
  {
    time: String,
    description: String,
    location: String,
    coordinates: {
      lat: Number,
      long: Number
    },
    cost: CostSchema,
    duration: String,
    notes: String,
  },
  { _id: false }
);

const ItineraryDaySchema = new mongoose.Schema(
  {
    day: Number,
    date: String,
    location: String,
    activities: [ActivitySchema],
  },
  { _id: false }
);

const BudgetBreakdownSchema = new mongoose.Schema(
  {
    transportation: Number,
    accommodation: Number,
    activities: Number,
    food: Number,
    miscellaneous: Number,
    total: Number,
  },
  { _id: false }
);

const WeatherForecastSchema = new mongoose.Schema(
  {
    date: String,
    condition: String,
    temperature: {
      high: Number,
      low: Number,
    },
  },
  { _id: false }
);

const OverviewSchema = new mongoose.Schema(
  {
    source: String,
    destination: String,
    duration: Number,
    totalBudget: CostSchema,
    startDate: String,
    endDate: String,
  },
  { _id: false }
);

const TravelPlanSchema = new mongoose.Schema({
  overview: OverviewSchema,
  itinerary: [ItineraryDaySchema],
  budgetBreakdown: BudgetBreakdownSchema,
  travelTips: [String],
  weatherForecast: [WeatherForecastSchema],
  owner: String,
});

const TravelPlan = mongoose.model("TravelPlan", TravelPlanSchema);
export default TravelPlan;