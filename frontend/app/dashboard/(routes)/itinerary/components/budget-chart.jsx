"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BudgetChart({ budgetData }) {
  const categories = [
    { name: "Transportation", value: budgetData.transportation, color: "bg-blue-500" },
    { name: "Accommodation", value: budgetData.accommodation, color: "bg-green-500" },
    { name: "Activities", value: budgetData.activities, color: "bg-yellow-500" },
    { name: "Food", value: budgetData.food, color: "bg-orange-500" },
    { name: "Miscellaneous", value: budgetData.miscellaneous, color: "bg-purple-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span className="text-3xl font-bold">{budgetData.total}</span>
          <span className="text-muted-foreground ml-1">INR</span>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {category.value} INR ({(category.value / budgetData.total * 100).toFixed(0)}%)
                </span>
              </div>
              {/* Custom Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${category.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(category.value / budgetData.total) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}