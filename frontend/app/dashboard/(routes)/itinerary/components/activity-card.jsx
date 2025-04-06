"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function ActivityCard({ activity, isExpanded, onToggle }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [mapUrl, setMapUrl] = useState("")

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Set coordinates with fallbacks
  const lat = activity.locationCoordinates?.lat || 19.0760
  const lon = activity.locationCoordinates?.lon || 72.8777

  useEffect(() => {
    // Construct the map URL when component mounts
    setMapUrl(`http://10.120.134.199:8501`);
  }, [lat, lon, activity.description])

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

                    {/* Streamlit Map Iframe */}
                    <div className="w-full h-[500px] mb-4 rounded-lg overflow-hidden border relative">
                      {!iframeLoaded && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <p>Loading map...</p>
                        </div>
                      )}
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        className={`border-0 ${iframeLoaded ? 'visible' : 'invisible'}`}
                        onLoad={() => setIframeLoaded(true)}
                        allow="geolocation"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
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