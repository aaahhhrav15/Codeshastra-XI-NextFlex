"use client";

import { useAuth } from "@/providers/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import TravelOverview from "@/app/dashboard/(routes)/itinerary/components/travel-overview"
import ActivityCard from "@/app/dashboard/(routes)/itinerary/components/activity-card"
import BudgetChart from "@/app/dashboard/(routes)/itinerary/components/budget-chart"
import WeatherCard from "@/app/dashboard/(routes)/itinerary/components/weather-card"
import TravelTips from "@/app/dashboard/(routes)/itinerary/components/travel-tips"

export default function TravelItinerary() {
    const router = useRouter();
  const params = useParams();
  const tripId = params?.id;
    const [itinerary, setItinerary] = useState(null);
    const {token} = useAuth();


  useEffect(() => {
    async function getItinerary() {
        const response = await fetch(`http://localhost:8000/api/travelplans/get/${tripId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(response.ok) {
            const data = await response.json();
            setItinerary(data);
        }
    }

    if(token) {
        getItinerary();
    } else {
        router.push("/login");
        return;
    }
  }, []);

  const [selectedDay, setSelectedDay] = useState("1")
  const [expandedCardId, setExpandedCardId] = useState(null)

  const handleCardToggle = (cardId) => {
    setExpandedCardId(prevId => prevId === cardId ? null : cardId)
  }

  return (
    itinerary && 
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Your Trip to {itinerary.overview.destination}
          </h1>
          <p className="text-muted-foreground text-center">
            {new Date(itinerary.overview.startDate).toLocaleDateString()} -{" "}
            {new Date(itinerary.overview.endDate).toLocaleDateString()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <TravelOverview overview={itinerary.overview} />

            <div className="mt-8">
              <div className="flex gap-2 mb-6">
                {itinerary.itinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => {
                      setSelectedDay(day.day.toString())
                      setExpandedCardId(null) 
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      selectedDay === day.day.toString()
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {itinerary.itinerary.map((day) => (
                <AnimatePresence key={day.day}>
                  {selectedDay === day.day.toString() && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-4 mb-6">
                        <div className="flex items-center mb-4">
                          <Calendar className="mr-2 h-5 w-5 text-primary" />
                          <h3 className="text-lg font-medium">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </h3>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-primary" />
                          <span>{day.location}</span>
                        </div>
                      </Card>

                      <div className="space-y-4">
                        {day.activities.map((activity, index) => {
                          const cardId = `${day.day}-${index}`
                          return (
                            <ActivityCard
                              key={cardId}
                              activity={activity}
                              isExpanded={expandedCardId === cardId}
                              onToggle={() => handleCardToggle(cardId)}
                            />
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <BudgetChart budgetData={itinerary.budgetBreakdown} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {itinerary.weatherForecast.map((forecast, index) => (
                <WeatherCard key={index} forecast={forecast} />
              ))}
            </div>
            <TravelTips tips={itinerary.travelTips} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}