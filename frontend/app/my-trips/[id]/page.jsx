'use client';
import { useAuth } from "@/providers/AuthContext";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripSummary() {
  const router = useRouter();
  const params = useParams();
  const tripId = params?.tripId;

  // const [token, setToken] = useState(null);
  const [trips, setTrips] = useState([]);
  const {token} = useAuth();

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    if (token) {
      // setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/travelplans/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          const tripsWithImages = await Promise.all(
            data.map(async (trip) => {
              try {
                const unsplashResponse = await fetch(
                  `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                    trip.overview.destination
                  )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&per_page=1`
                );

                const unsplashData = await unsplashResponse.json();
                const imageUrl = unsplashData.results?.[0]?.urls?.regular || "/placeholder.svg";

                return { ...trip, image: imageUrl };
              } catch {
                return { ...trip, image: "/placeholder.svg" };
              }
            })
          );

          setTrips(tripsWithImages);
        } else {
          setTrips([]);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        setTrips([]);
      }
    };

    if (token) fetchTrips();
  }, [token]);

  const filteredTrips = tripId && trips.length > 0
    ? trips.filter((trip) => trip._id === tripId)
    : trips;

  const data = filteredTrips?.[0]?.ResponseSchema || {};

  const {
    source,
    destination,
    startDate,
    endDate,
    travelers,
    mealPreferences = [],
    budgetRange = { min: 0, max: 0 },
    travelOption = {},
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Trip Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Source" value={source} />
        <Info label="Destination" value={destination} />
        <Info label="Start Date" value={startDate} />
        <Info label="End Date" value={endDate} />
        <Info label="Travelers" value={travelers} />
        <Info label="Meal" value={mealPreferences[0]} />
        <Info label="Budget Range" value={`₹${budgetRange.min} - ₹${budgetRange.max}`} />
      </div>

      <div className="my-6 border-t" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#f9f5f5] p-4 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-semibold mb-2">Flight Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Arrival Time" value={travelOption.arrivalTime} />
        </div>
      </motion.div>
    </motion.div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);
