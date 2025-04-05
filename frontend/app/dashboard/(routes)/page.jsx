"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, User, Calendar, Utensils, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import DailyActivityChart from "./components/charts/DailyActivityChart"
import Form from "@/components/Form"
import { useEffect, useState } from "react"
import { useUser } from '@clerk/clerk-react';

const Page = () => {
  const router = useRouter()
  const { user } = useUser();
  const [detail, setDetail] = useState({})

  useEffect(() => {
    const fetchDetails = async () => {
      // Ensure user info is available
      if (!user) return;
      
      // Extract the email from Clerk's user object
      const email = user.primaryEmailAddress?.emailAddress;
      
      try {
        const response = await fetch("http://192.168.0.141:5000/api/checkUser/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Add email in the request body
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setDetail(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    
    fetchDetails();
  }, [user]);

  // const details = {
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   profilePic: "/placeholder.svg?height=200&width=200",
  //   age: 28,
  //   gender: "Female",
  //   height: 165,
  //   weight: 60,
  //   activityLevel: "Moderate",
  //   target: "Maintain",
  //   numberOfMealsPerDay: 3,
  //   allergies: "Peanuts, Shellfish",
  //   sleeping: {
  //     time: "7 hours",
  //     schedule: "11 PM - 6 AM",
  //     feedback: "Generally restful, occasional insomnia",
  //   },
  //   food_intake: [
  //     {
  //       time: "8:00 AM",
  //       type: "Breakfast",
  //       meal_name: "Oatmeal with berries",
  //       cal: 350,
  //       taste: 8,
  //     },
  //     {
  //       time: "1:00 PM",
  //       type: "Lunch",
  //       meal_name: "Grilled chicken salad",
  //       cal: 450,
  //       taste: 7,
  //     },
  //     {
  //       time: "7:00 PM",
  //       type: "Dinner",
  //       meal_name: "Salmon with roasted vegetables",
  //       cal: 550,
  //       taste: 9,
  //     },
  //   ],
  //   exercise_done: [
  //     {
  //       time: "7:00 AM",
  //       type: "Cardio",
  //       exercise_name: "Morning jog",
  //       cal_burnt: 300,
  //       feeling_after_exercise: "Fresh",
  //     },
  //     {
  //       time: "6:00 PM",
  //       type: "Strength",
  //       exercise_name: "Weight training",
  //       cal_burnt: 200,
  //       feeling_after_exercise: "Exhausted",
  //     },
  //   ],
  // }

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="container mx-auto p-6 bg-background text-foreground">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col items-center">
            <Image
              src={detail.profilePic || "/placeholder.svg"}
              alt="User Profile"
              width={200}
              height={200}
              className="rounded-full mb-4 border-4 border-blue-300"
            />
            <h1 className="text-3xl font-bold mb-2">{detail.name}</h1>
            <p className="text-lg font-semibold text-blue-400">{detail.target} Plan</p>
            <p className="text-sm text-muted-foreground">Activity Level: {detail.activityLevel}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <Button
              onClick={() => router.push("/settings")}
              className="w-64 mb-4 text-blue-300 border-blue-300 hover:bg-blue-300 hover:text-gray-900"
            >
              Settings
            </Button>
            <Card className="w-full bg-card text-card-foreground border-border hover:bg-accent hover:bg-opacity-70 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <User className="w-5 h-5 mr-2" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold text-muted-foreground">Age:</dt>
                    <dd>{detail.age} years</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Gender:</dt>
                    <dd>{detail.gender}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Height:</dt>
                    <dd>{detail.height} cm</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Weight:</dt>
                    <dd>{detail.weight} kg</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Email:</dt>
                    <dd>{detail.email}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-6">
            <Card className="bg-card text-card-foreground border-border hover:bg-accent hover:bg-opacity-70 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Utensils className="w-5 h-5 mr-2" /> Dietary Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold text-muted-foreground">Target:</dt>
                    <dd>{detail.target}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Meals per Day:</dt>
                    <dd>{detail.numberOfMealsPerDay}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Allergies:</dt>
                    <dd>{detail.allergies}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground border-border hover:bg-accent hover:bg-opacity-70 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Moon className="w-5 h-5 mr-2" /> Sleep Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold text-muted-foreground">Sleep Duration:</dt>
                    <dd>{detail.sleeping?.time}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Sleep Schedule:</dt>
                    <dd>{detail.sleeping?.schedule}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Sleep Quality:</dt>
                    <dd>{detail.sleeping?.feedback}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {
          detail.age === null && <Form user={detail}/>
        }


        <div className="mt-12">
          <Card className="p-6 bg-card">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> Daily Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DailyActivityChart
                foodIntake={detail.food_intake || []}
                exerciseDone={detail.exercise_done || []}
                />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
