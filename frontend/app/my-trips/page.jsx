"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, DollarSign, Users, ArrowRight, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthContext"
import { useRouter } from "next/navigation"

// Sample trip data
// const sampleTrips = [
//   {
//     id: 1,
//     destination: "Paris, France",
//     image: "/placeholder.svg?height=300&width=500",
//     startDate: "May 15, 2025",
//     endDate: "May 22, 2025",
//     budget: "$2,500",
//     travelers: 2,
//     status: "upcoming",
//   },
//   {
//     id: 2,
//     destination: "Tokyo, Japan",
//     image: "/placeholder.svg?height=300&width=500",
//     startDate: "July 10, 2025",
//     endDate: "July 24, 2025",
//     budget: "$4,800",
//     travelers: 1,
//     status: "planning",
//   },
//   {
//     id: 3,
//     destination: "Bali, Indonesia",
//     image: "/placeholder.svg?height=300&width=500",
//     startDate: "September 5, 2025",
//     endDate: "September 15, 2025",
//     budget: "$3,200",
//     travelers: 2,
//     status: "planning",
//   },
//   {
//     id: 4,
//     destination: "New York City, USA",
//     image: "/placeholder.svg?height=300&width=500",
//     startDate: "December 20, 2025",
//     endDate: "December 27, 2025",
//     budget: "$3,800",
//     travelers: 4,
//     status: "planning",
//   },
// ]

export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  const {token} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // Fetch trips data from your API
        const response = await fetch("http://localhost:8000/api/travelplans/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Fetch Unsplash images for each trip
          const tripsWithImages = await Promise.all(
            data.map(async (trip) => {
              try {
                // Fetch image from Unsplash based on destination
                const unsplashResponse = await fetch(
                  `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                    trip.overview.destination
                  )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&per_page=1`
                );
                
                if (!unsplashResponse.ok) {
                  throw new Error("Unsplash API error");
                }
                
                const unsplashData = await unsplashResponse.json();
                
                // Use the first result if available, otherwise fallback to placeholder
                const imageUrl = unsplashData.results?.[0]?.urls?.regular || "/placeholder.svg";
                
                return {
                  ...trip,
                  image: imageUrl
                };
              } catch (error) {
                console.error("Error fetching Unsplash image:", error);
                return {
                  ...trip,
                  image: "/placeholder.png" // Fallback image
                };
              }
            })
          );
          
          setTrips(tripsWithImages);
        } else {
          setTrips([]);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        setTrips([]);
      }
    };
  
    if (token) {
      fetchTrips();
    } else {
      router.push("/login");
    }
  }, []);

  const filteredTrips = trips.length > 0 && filter === "all" ? trips : trips.filter((trip) => trip.status === filter) || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7a6868] mb-4">My Trips</h1>
          <p className="text-[#9e8585] max-w-2xl mx-auto">
            View and manage all your planned and upcoming trips in one place
          </p>
        </div>

        

        {/* Trips Grid */}
        {trips.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
         <div className="w-16 h-16 bg-[#DFD0D0] rounded-full mb-4 flex items-center justify-center text-white text-xl font-bold">
           !
         </div>
         <div className="text-gray-700 text-lg font-semibold mb-2">No Planned Trips</div>
         <div className="text-gray-500 text-sm">We couldn't find any results to display.</div>
       </div>
       
        ) : (
          <motion.div className="grid md:grid-cols-2 gap-6" variants={container} initial="hidden" animate="show">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                variants={item}
              >
                <div className="relative h-48">
                  <Image src={trip.image} alt={trip.overview.destination} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{trip.overview.destination}</h3>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{trip.status === "upcoming" ? "Confirmed" : "Planning"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-[#b8a5a5] mr-2 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#9e8585]">Dates</p>
                        <p className="text-sm text-[#7a6868]">
                          {trip.overview.startDate} - {trip.overview.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <IndianRupee className="h-4 w-4 text-[#b8a5a5] mr-2 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#9e8585]">Budget</p>
                        <p className="text-sm text-[#7a6868]">{trip.overview.totalBudget.amount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-[#b8a5a5] mr-2" />
                      <span className="text-sm text-[#7a6868]">
                        {trip.travelers} {trip.travelers === 1 ? "Traveler" : "Travelers"}
                      </span>
                    </div>
                    <Button
  asChild
  variant="ghost"
  className="text-[#7a6868] hover:text-[#4a3e3e] hover:bg-[#f0e8e8] p-0"
>
  <Link href={`/dashboard/itinerary/${trip._id}`}> 
  
    Trip Summary
    <ArrowRight className="ml-1 h-4 w-4" />
  </Link>
</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Trips Found */}
        {filteredTrips.length === 0 && trips.length > 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0e8e8] mb-4">
              <Calendar className="h-8 w-8 text-[#b8a5a5]" />
            </div>
            <h3 className="text-xl font-semibold text-[#7a6868] mb-2">No {filter} trips found</h3>
            <p className="text-[#9e8585] mb-6">Try changing your filter or plan a new trip</p>
            
          </div>
        )}

        {/* CTA */}
        {trips.length > 0 && (
          <div className="mt-12 text-center animate-in fade-in duration-700">
            <Button asChild className="bg-[#c9b8b8] hover:bg-[#b8a5a5] text-[#4a3e3e] rounded-full px-6">
              <Link href="/plan-trip">
                Plan a New Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
