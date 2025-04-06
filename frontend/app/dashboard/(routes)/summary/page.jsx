'use client'
import { motion } from "framer-motion";
import { data } from "./data/data"

export default function TripSummary() {
  console.log(data)

  // Added travelOption to destructured properties
  const { formData, meal, budgetRange, travelOption } = data

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Trip Summary</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Source" value={formData.source} />
        <Info label="Destination" value={formData.destination} />
        <Info label="Start Date" value={formData.startDate} />
        <Info label="End Date" value={formData.endDate} />
        <Info label="Transport" value={formData.transport} />
        <Info label="Class" value={formData.transportClass} />
        <Info label="Travelers" value={formData.travelers} />
        <Info label="Meal" value={meal} />
        <Info label="Budget Range" value={`₹${budgetRange.min} - ₹${budgetRange.max}`} />
      </div>

      {/* Divider */}
      <div className="my-6 border-t" />

      {/* Travel Option */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#f9f5f5] p-4 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-semibold mb-2">Flight Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Airline" value={travelOption.airlineName} />
          <Info label="Flight Number" value={travelOption.flightNumber} />
          <Info label="Departure" value={`${travelOption.departureAirport} — ${travelOption.departureTime}`} />
          <Info label="Arrival" value={`${travelOption.arrivalAirport} — ${travelOption.arrivalTime}`} />
          <Info label="Cabin Class" value={travelOption.cabinClass} />
          <Info label="Price" value={`₹${travelOption.price.toLocaleString()}`} />
        </div>
        <img
          src={travelOption.airlineLogo}
          alt="Airline Logo"
          className="mt-4 w-32 h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value}</p>
  </div>
);