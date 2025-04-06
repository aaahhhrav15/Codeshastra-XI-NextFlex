"use client"

import { useState } from "react"
import { Flame, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalorieDashboard({ data }) {
  const [calories] = useState({
    burned: 60,
    eaten: 536,
    goal: 2181,
  })

  const available = calories.goal - (calories.eaten - calories.burned)

  const progress = (available / calories.goal) * 100

  // Calculate the ring's stroke dash array and offset
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="min-h-screen bg-white grid grid-cols-2">
    <div className="  flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="relative flex justify-center">
          {/* Calorie indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-3xl font-bold mt-2">{calories.burned}</span>
              <span className="text-gray-500 text-sm">burn</span>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Utensils className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-3xl font-bold mt-2">{calories.eaten}</span>
              <span className="text-gray-500 text-sm">eaten</span>
            </div>
          </div>

          {/* Progress ring */}
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background ring */}
              <circle cx="100" cy="100" r={radius} className="stroke-gray-200" strokeWidth="12" fill="none" />
              {/* Progress ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-[url(#gradient)]"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray,
                  strokeDashoffset,
                }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-gray-800">{available}</span>
              <span className="text-gray-500">Kcal available</span>
            </div>
          </div>
        </div>

        {/* Goal display */}
        <div className="text-center space-y-2">
          <span className="text-4xl font-bold text-gray-800">{calories.goal}</span>
          <p className="text-gray-500">Kcal Goal</p>
        </div>
      </div>
    </div>
    <Card className="w-full max-w-md mx-auto m-10 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Health Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm space-y-2">
            <h3 className="font-semibold">Essentials</h3>
            <p>Date: {data?.date || "_"} | Weight: {data?.weight || "_"} kg | Steps: {data?.steps || "_"} | BMI: {data?.bmi || "_"} | TDEE: {data?.tdee || "_"} kcal</p>
          </div>
          
          <div className="text-sm space-y-2">
            <h3 className="font-semibold">Health</h3>
            <p>BP: {data?.bp || "_"} | HR: {data?.hr || "_"} bpm | Sleep: {data?.sleep || "_"} hrs | Water: {data?.water || "_"} L | Blood Sugar: {data?.bloodSugar || "_"}</p>
          </div>
          
          <div className="text-sm space-y-2">
            <h3 className="font-semibold">Nutrition</h3>
            <p>Calories: {data?.totalCalories || "_"} kcal | Protein: {data?.protein?.grams || "_"}g | Carbs: {data?.carbs?.grams || "_"}g | Fats: {data?.fats?.grams || "_"}g</p>
          </div>
          
          <div className="text-sm space-y-2">
            <h3 className="font-semibold">Insights</h3>
            <p>Balance: {available} kcal | Deficiencies: {data?.deficiencies || "_"} | Suggestions: {data?.suggestions || "_"}</p>
          </div>
        </CardContent>
      </Card>
      </div>
  )
}