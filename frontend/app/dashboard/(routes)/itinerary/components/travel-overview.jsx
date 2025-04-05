"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react"

export default function TravelOverview({ overview }) {
  const items = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Route",
      value: `${overview.source} to ${overview.destination}`,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Dates",
      value: `${new Date(overview.startDate).toLocaleDateString()} - ${new Date(overview.endDate).toLocaleDateString()}`,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Duration",
      value: `${overview.duration} ${overview.duration === 1 ? "day" : "days"}`,
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Budget",
      value: `${overview.totalBudget.amount} ${overview.totalBudget.currency}`,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}