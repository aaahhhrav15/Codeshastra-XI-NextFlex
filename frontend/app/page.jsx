'use client'; // Needed for useRouter in app/page.js

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Image from 'next/image'; // If using CRA, replace this with a regular <img />
import { Button } from '@/components/ui/button';
import React from "react";
import {
  Globe,
  Play,
  Calendar,
  Unlock,
  User,
  MapPin,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  

  const handlePlanTrip = () => router.push('/plan-trip');
  const handleViewTrips = () => router.push('/my-trips');



  return (
    <div className="flex flex-col min-h-screen">

      <section className="relative bg-[#dfd0d0] overflow-hidden pb-20">
        {/* Main Content Container */}
        <div className="container mx-auto flex flex-col md:flex-row items-center min-h-[80vh] px-4 relative z-10">
          {/* Left Content */}
          <div className="md:w-1/2 flex flex-col justify-center gap-6 py-20">
            <button className="bg-white text-gray-700 px-6 py-2 rounded-full text-md w-fit shadow">
              Discover
            </button>
            <h1 className="text-5xl md:text-6xl font-serif italic font-bold leading-tight">
              Intelligent Travel
            </h1>
            <p className="text-gray-700 text-lg max-w-md">
              Unlock the world's most breathtaking destinations with our Intelligent Travel Planner. Explore the hidden gems, plan your dream itinerary, and embark on an unforgettable journey.
            </p>
            <button className="bg-white text-gray-900 px-10 py-4 rounded-md font-semibold text-md shadow w-fit">
              Start Planning
            </button>
          </div>

          {/* Hero Image */}
          <div className="md:absolute top-1/2 md:-translate-y-1/2 right-0 z-0 w-full md:w-[45%]">
            <img
              src="/images/heroLogo.png"
              alt="Mont Saint-Michel castle"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Feature Cards - Spaced properly */}
        <div className="container mx-auto px-4 pt-24 pb-3 z-20 relative">
          <h3 className="text-gray-700 mb-6">Elevate Your Travel Experience</h3>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center gap-2 w-[140px]">
              <img src="/images/vealth.png" alt="Vealtech Icon" className="h-5 w-5" />
              <span>Vealtech</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-2 w-[140px]">
              <img src="/images/tinylogo1.png" alt="Explore Icon" className="h-5 w-5" />
              <span>Explore</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-2 w-[140px]">
              <img src="/images/tinylogo2.png" alt="Discover Icon" className="h-5 w-5" />
              <span>Discover</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-2 w-[140px]">
              <img src="/images/tinylogo3.png" alt="Unlock Icon" className="h-5 w-5" />
              <span>Unlock</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-2 w-[140px]">
              <img src="/images/tinylogo4.png" alt="Personal Icon" className="h-5 w-5" />
              <span>Personal</span>
            </div>

          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="bg-[#f0ebe8] border-t border-b border-blue-200">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-sm text-gray-500 mb-4">About Our Intelligent Travel Planner</p>
            <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-6">Revolutionize the Way You Travel</h2>
            <p className="text-gray-700 mb-6 max-w-md">
              At Intelligent Travel Planner, we believe that every journey should be an unforgettable adventure. Our cutting-edge technology and curated recommendations empower you to explore the world like never before.
            </p>
            <p className="text-gray-700 font-medium mb-8">Discover the Future of Travel Planning</p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md">Plan Your Trip</button>
              <button className="bg-transparent text-gray-700 px-6 py-3">My Trips</button>
            </div>
            <div className="flex mt-8 gap-8">
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-700" />
                <span>Explore Destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-red-500" />
                <span>Manage Your Bookings</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-[400px] rounded-tl-[100px] rounded-br-[100px] overflow-hidden">
              <img src="/images/aboutimage.png" alt="Coastal town view" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-white border-b border-blue-100">
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-gray-500 mb-4">Discover the World's Most Captivating Destinations</p>
          <h2 className="text-3xl md:text-4xl font-serif italic text-center font-bold mb-4">Unlock Your Next Adventure</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Embark on a journey like no other with our Intelligent Travel Planner. Explore the world's most captivating destinations, from historic cities to breathtaking landscapes.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Charming Town",
                image: "/images/destination1.png",
                description: "Nestled on a Picturesque Cliff"
              },
              {
                title: "Tranquil Beach",
                image: "/images/destination2.png",
                description: "Endless Relaxation Under the Sun"
              },
              {
                title: "Vibrant City Street",
                image: "/images/destination3.png",
                description: "Experience the Local Charm"
              }
            ].map((destination, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-xl mb-2">{destination.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nature Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-gray-500 mb-4">Discover the Beauty of Nature</p>
          <h2 className="text-3xl md:text-4xl font-serif italic text-center font-bold mb-4">Reach New Heights</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Immerse yourself in the wonders of nature with our Intelligent Travel Planner. From majestic mountain peaks to serene lakeside towns, we'll guide you.
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative h-[500px] rounded-[40px] overflow-hidden">
                <img src="/images/nature.png" alt="Mountain view" className="object-cover w-full h-full" />
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg">
              <p className="text-purple-500 mb-2">Stunning Sunset</p>
              <h3 className="text-3xl font-serif italic font-bold mb-6">Breathtaking Vistas</h3>
              <p className="text-gray-700 mb-8">
                Perched atop a towering mountain, this vantage point offers a panoramic view that will take your breath away.
              </p>
              <button className="bg-white border border-gray-200 rounded-full px-6 py-3 text-gray-700">Explore More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="bg-[#f8f6f9]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-[#e9e4f3] p-8 rounded-lg">
              <p className="text-gray-500 mb-4">Effortless Planning</p>
              <h3 className="text-3xl font-serif italic font-bold mb-6">Personalized Recommendations</h3>
              <p className="text-gray-700 mb-8 max-w-md">
                Unlock the full potential of your travels with our Intelligent Travel Planner.
              </p>
              <button className="bg-white text-gray-800 rounded-full px-6 py-3">Book Now</button>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[400px] rounded-tl-[100px] rounded-br-[100px] overflow-hidden">
                <img src="/images/personalized.png" alt="Coastal town" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f6f9] pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                  <div className="h-5 w-5 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                © 2025 Waypoint, Inc.
                <br />
                All rights reserved.
              </p>
            </div>
            {[
              { title: "Quick Links", links: ["Home", "About", "Destinations", "Contact"] },
              { title: "Explore", links: ["Plan Your Trip", "Manage Bookings", "Travel Tips", "Partner with Us"] },
              { title: "Connect", links: ["Facebook", "Twitter", "Instagram", "LinkedIn"] },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-600 hover:text-gray-900">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );

}





