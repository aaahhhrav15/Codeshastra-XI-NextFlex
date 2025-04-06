"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export default function TravelTips({ tips }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start"
            >
              <Info className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}