// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Calendar, MapPin, DollarSign, Users, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/providers/AuthContext"
// import { useRouter } from "next/navigation"

// // Sample trip data
// // const sampleTrips = [
// //   {
// //     id: 1,
// //     destination: "Paris, France",
// //     image: "/placeholder.svg?height=300&width=500",
// //     startDate: "May 15, 2025",
// //     endDate: "May 22, 2025",
// //     budget: "$2,500",
// //     travelers: 2,
// //     status: "upcoming",
// //   },
// //   {
// //     id: 2,
// //     destination: "Tokyo, Japan",
// //     image: "/placeholder.svg?height=300&width=500",
// //     startDate: "July 10, 2025",
// //     endDate: "July 24, 2025",
// //     budget: "$4,800",
// //     travelers: 1,
// //     status: "planning",
// //   },
// //   {
// //     id: 3,
// //     destination: "Bali, Indonesia",
// //     image: "/placeholder.svg?height=300&width=500",
// //     startDate: "September 5, 2025",
// //     endDate: "September 15, 2025",
// //     budget: "$3,200",
// //     travelers: 2,
// //     status: "planning",
// //   },
// //   {
// //     id: 4,
// //     destination: "New York City, USA",
// //     image: "/placeholder.svg?height=300&width=500",
// //     startDate: "December 20, 2025",
// //     endDate: "December 27, 2025",
// //     budget: "$3,800",
// //     travelers: 4,
// //     status: "planning",
// //   },
// // ]

// export default function MyTripsPage() {
//   const [trips, setTrips] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const {token} = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         // Fetch trips data from your API
//         const response = await fetch("http://localhost:8000/api/travelplans/get", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
          
           
//       } catch (error) {
//         console.error("Error fetching trips:", error);
//         setTrips([]);
//       }
//     };
  
//     if (token) {
//       fetchTrips();
//     } else {
//       router.push("/login");
//     }
//   }, [token, router]);

//   const filteredTrips = trips.length > 0 && filter === "all" ? trips : trips.filter((trip) => trip.status === filter) || [];

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   }

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
      
//     </div>
//   )
// }

import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page

