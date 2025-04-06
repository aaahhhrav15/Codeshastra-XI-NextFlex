"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react"

export default function ActivityCard({ activity, isExpanded, onToggle }) {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <motion.div layout className="mb-4" initial={{ borderRadius: 8 }} animate={{ borderRadius: 8 }}>
      <Card className="overflow-hidden">
        <motion.div layout className="border-l-4 border-primary">
          <CardContent className="p-0">
            <div
              className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={onToggle}
            >
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-medium rounded-full h-10 w-10 flex items-center justify-center mr-4">
                  {formatTime(activity.time).split(":")[0]}
                </div>
                <div>
                  <h3 className="font-medium">{activity.description}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{activity.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {activity.cost.amount > 0 && (
                  <Badge variant="outline" className="mr-2">
                    {activity.cost.amount} {activity.cost.currency}
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 pt-0"
                >
                  <div className="pt-4 border-t mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{activity.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {activity.cost.amount} {activity.cost.currency}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-1">Notes:</h4>
                      <p className="text-sm text-muted-foreground">{activity.notes}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  )
}