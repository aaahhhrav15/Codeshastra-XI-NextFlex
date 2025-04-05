import axios from "axios";

export const getFamousPlaces = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(`https://api.geoapify.com/v2/places`, {
      params: {
        categories: "tourism.sights,entertainment",
        filter: `circle:${lon},${lat},3000`,
        limit: 10,
        apiKey: process.env.GEOAPIFY_API_KEY,
      },
    });

    const places = response.data.features.map((feature) => {
      const props = feature.properties;

      return {
        name: props.name || "Unknown",
        formatted: props.formatted || "",
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        address_line1: props.address_line1 || "",
        address_line2: props.address_line2 || "",
        city: props.city || "",
        postcode: props.postcode || "",
        state: props.state || "",
        country: props.country || "",
        street: props.street || "",
        distance: props.distance || 0,
        category: props.categories || [],
        features: props.features || [],
        details: props.details || "",
        opening_hours: props.opening_hours?.weekday_text || [],
        website: props.website || "",
        phone: props.phone || "",
        source: "Geoapify",
      };
    });

    // Removed: await Place.insertMany(places);
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch places",
      details: err.message,
    });
  }
};
