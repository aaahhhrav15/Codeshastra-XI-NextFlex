"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react"

export default function WeatherCard({ forecast }) {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {new Date(forecast.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="flex items-center mt-1">
                <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                <span className="font-medium">{forecast.temperature.high}°C</span>
                <span className="mx-1 text-muted-foreground">/</span>
                <span className="text-muted-foreground">{forecast.temperature.low}°C</span>
              </div>
              <p className="text-sm mt-1">{forecast.condition}</p>
            </div>
            <div>{getWeatherIcon(forecast.condition)}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}