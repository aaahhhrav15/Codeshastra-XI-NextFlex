export function getPrompt(
  source,
  destination,
  departureDate,
  returnDate,
  travelers,
  duration,
  budget,
  accommodationType,
  travelClass,
  activities,
  mealPreferences,
  transportModes
) {
  return `
You are a travel planning assistant. Based on the user's input, generate a complete travel itinerary that includes:

1. Flight information for outbound and inbound journeys.
2. Hotel/accommodation recommendations.
3. Local transport options during the trip.
4. A day-wise itinerary covering attractions, activities, meals, transport, and accommodation.
5. A detailed budget breakdown.
6. Travel tips and weather forecast.

Return your response strictly in the following JSON format, which follows the exact structure provided below.

### USER INPUT
{
  "source": "${source}",
  "destination": "${destination}",
  "departureDate": "${departureDate}", // YYYY-MM-DD
  "returnDate": "${returnDate}", // YYYY-MM-DD
  "travelers": ${travelers},
  "duration": ${duration},
  "budget": ${budget},
  "preferences": {
    "accommodationType": "${accommodationType}",
    "travelClass": "${travelClass}",
    "activities": ${JSON.stringify(activities)},
    "mealPreferences": ${JSON.stringify(mealPreferences)},
    "transportModes": ${JSON.stringify(transportModes)}
  }
}

### RETURN THE ITINERARY IN THIS STRUCTURE:
{
  overview: {
    source: String,          // Starting point
    destination: String,     // Destination
    duration: Number,        // Trip duration in days
    totalBudget: {
      amount: Number,        // Total estimated cost
      currency: String       // Currency code
    },
    startDate: Date,         // YYYY-MM-DD format
    endDate: Date            // YYYY-MM-DD format
  },
  transportation: {
    outbound: [Flight],      // Outbound flight details
    inbound: [Flight],       // Return flight details (if applicable)
    localTransport: [LocalTransport] // Local transportation options
  },
  accommodation: [Hotel],    // Selected hotels
  itinerary: [{
    day: Number,             // Day number
    date: Date,              // Date for this day
    activities: [{
      time: String,          // Time for activity
      description: String,   // What to do
      location: String,      // Where to go
      cost: {
        amount: Number,
        currency: String
      },
      duration: String,      // How long it takes
      notes: String          // Additional information
    }],
    meals: [{
      type: String,          // "breakfast", "lunch", "dinner"
      recommendation: String, // Restaurant or food recommendation
      estimatedCost: {
        amount: Number,
        currency: String
      }
    }],
    transport: [LocalTransport], // Transport for this specific day
    accommodation: Hotel     // Where to stay this night
  }],
  budgetBreakdown: {
    transportation: Number,  // Total transport costs
    accommodation: Number,   // Total accommodation costs
    activities: Number,      // Total activities costs
    food: Number,            // Estimated food costs
    miscellaneous: Number,   // Extra/buffer amount
    total: Number            // Total estimated cost
  },
  travelTips: [String],      // Travel tips for the destination
  weatherForecast: [{
    date: Date,              // Date for forecast
    condition: String,       // Weather condition
    temperature: {
      high: Number,          // High temperature
      low: Number            // Low temperature
    }
  }]
}

The 'Flight', 'Hotel', 'LocalTransport', 'Attraction', and 'Itinerary' sections must match the following schema templates exactly:

Flight:
{
  airline: String,           // Airline name
  flightNumber: String,      // Flight number
  departure: {
    airport: String,         // Departure airport code
    terminal: String,        // Terminal information
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  arrival: {
    airport: String,         // Arrival airport code
    terminal: String,        // Terminal information
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  duration: String,          // Flight duration (HH:MM)
  stops: Number,             // Number of stops
  layovers: [{
    airport: String,         // Layover airport
    duration: String         // Layover duration
  }],
  price: {
    amount: Number,          // Price amount
    currency: String         // Currency code (INR, USD, etc.)
  },
  cabinClass: String,        // Class of travel
  baggageAllowance: String,  // Baggage information
  refundable: Boolean        // Is the ticket refundable
}

Hotel:
{
  name: String,              // Hotel name
  location: {
    address: String,         // Full address
    coordinates: {           // For mapping
      latitude: Number,
      longitude: Number
    },
    proximity: String        // Distance from city center or attractions
  },
  rating: {
    stars: Number,           // Hotel star rating
    userRating: Number,      // User rating (out of 5)
    reviews: Number          // Number of reviews
  },
  price: {
    amount: Number,          // Price per night
    currency: String,        // Currency code
    totalForStay: Number     // Total price for the stay
  },
  amenities: [String],       // ["pool", "spa", "gym", "restaurant", etc.]
  roomTypes: [{
    type: String,            // "deluxe", "standard", etc.
    beds: String,            // "1 king bed", "2 twin beds", etc.
    capacity: Number,        // Number of guests
    price: Number            // Price for this room type
  }],
  images: [String],          // URLs to hotel images
  availability: Boolean      // Is the hotel available for selected dates
}

LocalTransport:
{
  type: String,              // "bus", "train", "taxi", "car rental", etc.
  // For buses and trains:
  operator: String,          // Service operator name
  departure: {
    station: String,         // Departure station/terminal
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  arrival: {
    station: String,         // Arrival station/terminal
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  duration: String,          // Travel duration
  // For rentals:
  provider: String,          // Rental provider
  vehicle: String,           // Vehicle type/model
  pickupLocation: String,    // Where to get the vehicle
  dropoffLocation: String,   // Where to return the vehicle
  // Common fields:
  price: {
    amount: Number,          // Price amount
    currency: String         // Currency code
  },
  availability: Boolean,     // Is this option available
  features: [String]         // ["AC", "sleeper", "food", "wifi", etc.]
}

Attraction:
{
  name: String,              // Attraction name
  type: String,              // "museum", "park", "monument", etc.
  location: {
    address: String,         // Full address
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  description: String,       // Short description
  timings: {
    open: String,            // Opening time
    close: String,           // Closing time
    daysOpen: [String]       // Days when open
  },
  entryFee: {
    amount: Number,          // Fee amount
    currency: String         // Currency code
  },
  rating: Number,            // User rating
  estimatedTimeRequired: String, // Time needed to visit
  images: [String]           // URLs to attraction images
}

**Constraints**:
- Dates, transport modes, and accommodation should match the user input.
- The plan must stay within the given budget.
- Meals should reflect user preferences (e.g. vegetarian).
- All cost fields must include currency ('INR').
- Include realistic weather forecasts for the destination.
- Structure must be clean, valid JSON — no additional text outside of JSON.
- The LocalTransport and Flight, and accomodation must be realistic, with all the real data.

Only respond with the completed JSON document. Do not include explanations or extra commentary.
`;
}

export function getPrompt2(
  source,
  destination,
  departureDate,
  returnDate,
  travelers,
  duration,
  budget,
  accommodationType,
  travelClass,
  activities,
  mealPreferences,
  transportModes
) {
  return `
You are a travel planning assistant. Based on the user's input, generate a complete travel itinerary that includes:

1. A day-wise itinerary covering attractions, activities, meals, transport, and accommodation.
2. A detailed budget breakdown.
3. Travel tips and weather forecast.

Return your response strictly in the following JSON format, which follows the exact structure provided below.

### USER INPUT
{
  "source": "${source}",
  "destination": "${destination}",
  "departureDate": "${departureDate}", // YYYY-MM-DD
  "returnDate": "${returnDate}", // YYYY-MM-DD
  "travelers": ${travelers},
  "duration": ${duration},
  "budget": ${budget},
  "preferences": {
    "accommodationType": "${accommodationType}",
    "travelClass": "${travelClass}",
    "activities": ${JSON.stringify(activities)},
    "mealPreferences": ${JSON.stringify(mealPreferences)},
    "transportModes": ${JSON.stringify(transportModes)}
  }
}

### RETURN THE ITINERARY IN THIS STRUCTURE:
{
  overview: {
    source: String,          // Starting point
    destination: String,     // Destination
    duration: Number,        // Trip duration in days
    totalBudget: {
      amount: Number,        // Total estimated cost
      currency: String       // Currency code
    },
    startDate: Date,         // YYYY-MM-DD format
    endDate: Date            // YYYY-MM-DD format
  },
  itinerary: [{
    day: Number,             // Day number
    date: Date,              // Date for this day
    location: String         // The place where the traveler is on that day
    activities: [{
      time: String,          // Time for activity
      description: String,   // What to do
      location: String,      // Where to go
      coordinates: {
        lat: Number,         // Exact latitude of the location till 6 decimal places
        long: Number         // Exact longitude of the location till 6 decimal places
      },
      cost: {
        amount: Number,
        currency: String
      },
      duration: String,      // How long it takes
      notes: String          // Additional information
    }],
  }],
  budgetBreakdown: {
    transportation: Number,  // Total transport costs
    accommodation: Number,   // Total accommodation costs
    activities: Number,      // Total activities costs
    food: Number,            // Estimated food costs
    miscellaneous: Number,   // Extra/buffer amount
    total: Number            // Total estimated cost
  },
  travelTips: [String],      // Travel tips for the destination
  weatherForecast: [{
    date: Date,              // Date for forecast
    condition: String,       // Weather condition
    temperature: {
      high: Number,          // High temperature
      low: Number            // Low temperature
    }
  }]
}

The 'Attraction', and 'Itinerary' sections must match the following schema templates exactly:

Attraction:
{
  name: String,              // Attraction name
  type: String,              // "museum", "park", "monument", etc.
  location: {
    address: String,         // Full address
    coordinates: {
      latitude: Number,      // Proper latitude of the location
      longitude: Number      // Proper longitude of the location
    }
  },
  description: String,       // Short description
  timings: {
    open: String,            // Opening time
    close: String,           // Closing time
    daysOpen: [String]       // Days when open
  },
  entryFee: {
    amount: Number,          // Fee amount
    currency: String         // Currency code
  },
  rating: Number,            // User rating
  estimatedTimeRequired: String, // Time needed to visit
  images: [String]           // URLs to attraction images
}

**Constraints**:
- The plan must stay within the given budget.
- All cost fields must include currency ('INR').
- Include realistic weather forecasts for the destination.
- Structure must be clean, valid minified JSON — no additional text outside of JSON.
- All the latitude and longitude coordinates must be of the accurate location and have 6 digits after decimal

Only respond with the completed minified JSON document. Do not include explanations or extra commentary.
`;
}
