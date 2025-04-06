"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { CalendarIcon, Plane, Car, Train, Ship, Check, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { differenceInDays } from 'date-fns';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"

const LocationSearch = ({ value, onChange, onSelect, placeholder }) => {
  const router = useRouter();
    const [searchText, setSearchText] = useState(value || "")
    const [listPlace, setListPlace] = useState([])
    const [isProgrammaticUpdate, setIsProgrammaticUpdate] = useState(false)

    useEffect(() => {
      setSearchText(value || "")
    }, [value])



    const handleSearch = () => {
      if (searchText.trim().length < 2) return
      
      const params = {
        q: searchText,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      }

      const queryString = new URLSearchParams(params).toString()
      
      fetch(`${NOMINATIM_BASE_URL}${queryString}`)
        .then((response) => response.json())
        .then((result) => {
          setListPlace(result)
        })
        .catch((err) => console.log("err: ", err))
    }

    useEffect(() => {
      if (isProgrammaticUpdate) {
        setIsProgrammaticUpdate(false)
        return
      }
      
      const timer = setTimeout(() => {
        if (searchText.trim().length >= 2) {
          handleSearch()
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }, [searchText])

    return (
      <div className="flex flex-col w-full">
        <div className="mb-2">
          <Input
            value={searchText}
            placeholder={placeholder}
            onChange={(event) => {
              const value = event.target.value
              setSearchText(value)
              onChange(value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </div>
        {listPlace.length > 0 && (
          <Card className="mb-4 max-h-64 overflow-y-auto bg-white z-20 relative">
            <div className="py-2">
              {listPlace.map((item) => (
                <div key={item?.place_id}>
                  <button
                    className="w-full px-4 py-2 hover:bg-muted/50 text-left flex items-center"
                    onClick={() => {
                      setIsProgrammaticUpdate(true)
                      onSelect(item)
                      setListPlace([])
                    }}
                  >
                    <MapPin className="h-6 w-6 text-[#7a6868] mr-3" />
                    <span className="text-[#7a6868]">{item?.display_name}</span>
                  </button>
                  <div className="border-t border-[#DFD0D0] my-1" />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
}

export default function PlanTripPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [sourceLocation, setSourceLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState(null)
  const [apiResponse, setApiResponse] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [meal, setmeal] = useState("")
  const [budget, setBudget] = useState("") 



const [minBudget, setMinBudget] = useState(2772);
  const [maxBudget, setMaxBudget] = useState(8018);
  const [budgetError, setBudgetError] = useState('');
  const [dragging, setDragging] = useState(null); // 'min', 'max', or null
  const sliderRef = useRef(null);

  const duration = differenceInDays(endDate, startDate);

const handleMinInputChange = (e) => {
  const value = Number(e.target.value);
  if (value >= 1000 && value <= maxBudget) {
    setMinBudget(value);
    setBudgetError('');
  } else {
    setBudgetError('Minimum budget must be between ₹1,000 and the maximum budget');
  }
};

// Update max budget from input
const handleMaxInputChange = (e) => {
  const value = Number(e.target.value);
  if (value >= minBudget && value <= 100000) {
    setMaxBudget(value);
    setBudgetError('');
  } else {
    setBudgetError('Maximum budget must be between the minimum budget and ₹1,00,000');
  }
};

// Handle mouse/touch interactions on the slider track
const handleSliderClick = (e) => {
  if (sliderRef.current) {
    const rect = sliderRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const clickPercentage = clickPosition / sliderWidth;
    const clickValue = Math.round(1000 + clickPercentage * (100000 - 1000));
    
    // Determine whether to move min or max handle based on which is closer
    const distanceToMin = Math.abs(clickValue - minBudget);
    const distanceToMax = Math.abs(clickValue - maxBudget);
    
    if (distanceToMin <= distanceToMax) {
      if (clickValue <= maxBudget) {
        setMinBudget(clickValue);
      }
    } else {
      if (clickValue >= minBudget) {
        setMaxBudget(clickValue);
      }
    }
  }
};

// Handle mouse/touch interactions for handles
const handleMouseDown = (handle) => {
  setDragging(handle);
};

useEffect(() => {
  const handleMouseMove = (e) => {
    if (dragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      let movePosition = e.clientX - rect.left;
      
      // Constrain to slider bounds
      movePosition = Math.max(0, Math.min(movePosition, sliderWidth));
      
      const movePercentage = movePosition / sliderWidth;
      const moveValue = Math.round(1000 + movePercentage * (100000 - 1000));
      
      if (dragging === 'min' && moveValue <= maxBudget) {
        setMinBudget(moveValue);
      } else if (dragging === 'max' && moveValue >= minBudget) {
        setMaxBudget(moveValue);
      }
    }
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };
  
  if (dragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  }
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  };
}, [dragging, minBudget, maxBudget]);

// Calculate percentages for styling
const minPercentage = ((minBudget - 1000) / (100000 - 1000)) * 100;
const maxPercentage = ((maxBudget - 1000) / (100000 - 1000)) * 100;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      source: "",
      destination: "",
      startDate: "",
      endDate: "",
      transport: "",
      transportClass: "",
      travelers: "1",
    }
  })

  const source = watch("source")
  const destination = watch("destination")
  const transport = watch("transport")
  const transportClass = watch("transportClass")

  const getTransportClassOptions = () => {
    switch(transport) {
      case 'plane':
        return [
          { value: 'economy', label: 'Economy' },
          { value: 'premium_economy', label: 'Premium Economy' },
          { value: 'business', label: 'Business' },
          { value: 'first', label: 'First' }
        ]
      case 'train':
        return [
          { value: 'first_ac', label: 'First AC' },
          { value: 'second_ac', label: 'Second AC' },
          { value: 'third_ac', label: 'Third AC' },
          { value: 'sleeper', label: 'Sleeper' }
        ]
      default:
        return []
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    setIsSubmitted(true)
    
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : ""
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : ""
    
    let travelClass = "Economy"
    if (transport === "plane") {
      switch(transportClass) {
        case "economy": travelClass = "Economy"; break
        case "premium_economy": travelClass = "PremiumEconomy"; break
        case "business": travelClass = "Business"; break
        case "first": travelClass = "First"; break
      }
    }

    const apiPayload = {
      source: data.source,
      destination: data.destination,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      travelClass: travelClass,
      passengerCount: data.travelers
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/travelplans/get-travel-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 2267a374bb9b908e98e106ec133a9d8c59bc63f7de321da3b5a114fc649d4009`
        },
        body: JSON.stringify(apiPayload)
      })
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      
      const responseData = await response.json()
      setApiResponse(responseData)
      
    } catch (error) {
      console.error('Submission error:', error)
      setError(error.message || "Failed to save travel plan. Please try again.")
      setIsSubmitted(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7a6868] mb-4">Plan Your Trip</h1>
          <p className="text-[#9e8585]">Fill in the details below to start planning your perfect getaway</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 animate-in fade-in">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isSubmitted && !error ? (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Creating Your Trip Plan!</h2>
              <p className="text-green-700">
                We're preparing your personalized itinerary from {source} to {destination}...
              </p>
            </div>

            {apiResponse ? (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-in slide-in-from-bottom">
                <h2 className="text-2xl font-bold text-[#7a6868] mb-6">Available Travel Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apiResponse.map((option, index) => (
                    <Card key={index} className={cn(
                      "p-4 hover:shadow-lg transition-shadow cursor-pointer",
                      selectedOption?.flightNumber === option.flightNumber && "ring-2 ring-[#7a6868]"
                    )}
                    onClick={() => setSelectedOption(option)} >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 border-b pb-2">
                          <div>
                            <h3 className="font-semibold text-[#7a6868]">{option.carrierName}</h3>
                            <p className="text-sm text-gray-500">{option.flightNumber}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-sm font-medium text-[#7a6868]">Departure</p>
                            <p className="text-sm">{format(new Date(option.departureTime), 'HH:mm')}</p>
                            <p className="text-xs text-gray-500">{option.departureAirport}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm font-medium text-[#7a6868]">Duration</p>
                            <p className="text-sm">
                              {Math.floor(option.duration / 60)}h {option.duration % 60}m
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[#7a6868]">Arrival</p>
                            <p className="text-sm">{format(new Date(option.arrivalTime), 'HH:mm')}</p>
                            <p className="text-xs text-gray-500">{option.arrivalAirport}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            {option.cabinClass}
                          </span>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">From</p>
                            <p className="text-lg font-bold text-[#7a6868]">
                              ₹{option.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {selectedOption && (
        <div className="mt-8 space-y-6">
          <div>
  <label className="block text-[#7a6868] mb-2">Meals</label>
  <Select onValueChange={setmeal} value={meal}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select meal type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="veg">Veg</SelectItem>
      <SelectItem value="non-veg">Non-Veg</SelectItem>
    </SelectContent>
  </Select>
</div>
<div>
      <label className="block text-[#7a6868] mb-2">Budget Range (INR)</label>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-600">Min</span>
        <Input
          type="number"
          value={minBudget}
          onChange={handleMinInputChange}
          className="w-32"
        />
        <span className="px-2">-</span>
        <span className="text-gray-600">Max</span>
        <Input
          type="number"
          value={maxBudget}
          onChange={handleMaxInputChange}
          className="w-32"
        />
      </div>
      
      <div className="px-1 py-6">
        <div 
          ref={sliderRef}
          className="relative h-1 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleSliderClick}
        >
          {/* Colored range track */}
          <div 
            className="absolute h-1 bg-blue-500 rounded-full"
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`
            }}
          />
          
          {/* Min handle */}
          <div 
            className={`absolute top-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow transform -translate-y-1.5 -translate-x-2 cursor-grab ${dragging === 'min' ? 'cursor-grabbing' : ''}`}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={() => handleMouseDown('min')}
            onTouchStart={() => handleMouseDown('min')}
          />
          
          {/* Max handle */}
          <div 
            className={`absolute top-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow transform -translate-y-1.5 -translate-x-2 cursor-grab ${dragging === 'max' ? 'cursor-grabbing' : ''}`}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={() => handleMouseDown('max')}
            onTouchStart={() => handleMouseDown('max')}
          />
        </div>
      </div>
      
      {budgetError && (
        <p className="text-red-500 text-sm mt-1">{budgetError}</p>
      )}
    </div>

<Button
  className="w-full bg-[#c9b8b8] hover:bg-[#b8a5a5] text-[#4a3e3e]"
  onClick={async () => {
    const dataToSend = {
      travelOption: selectedOption,
      meal,
      budgetRange: { min: minBudget, max: maxBudget },
      formData: {
        source: watch("source"),
        destination: watch("destination"),
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        transport: watch("transport"),
        transportClass: watch("transportClass"),
        travelers: watch("travelers"),
        duration: duration
      }
    };

    try {
      const response = await fetch("http://localhost:8000/api/travelplans/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 2267a374bb9b908e98e106ec133a9d8c59bc63f7de321da3b5a114fc649d4009`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        router.push("/dashboard"); 
      } else {
        console.error("Failed to store trip details");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }}
>
  Finalize Trip Details
</Button>

        </div>
      )}
    </div>
  )  : (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700">Fetching travel options...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-in slide-in-from-bottom duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-[#7a6868] mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Departure Location
                </label>
                <LocationSearch 
                  value={source}
                  onChange={(value) => setValue("source", value)}
                  onSelect={(location) => {
                    const shortName = location.display_name.split(',')[0].trim();
                    setValue("source", shortName);
                    setSourceLocation(location);
                  }}
                  placeholder="Where are you departing from?"
                />
                {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>}
              </div>

              {/* Destination with OpenStreetMap */}
              <div>
                <label className="block text-[#7a6868] mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Destination
                </label>
                <LocationSearch 
                  value={destination}
                  onChange={(value) => setValue("destination", value)}
                  onSelect={(location) => {
                    const shortName = location.display_name.split(',')[0].trim();
                    setValue("destination", shortName);
                    setDestinationLocation(location);
                  }}
                  placeholder="Where do you want to go?"
                />
                {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#7a6868] mb-2">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#DFD0D0] focus-visible:ring-[#b8a5a5]",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date)
                          setValue("startDate", date)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                </div>

                <div>
                  <label className="block text-[#7a6868] mb-2">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#DFD0D0] focus-visible:ring-[#b8a5a5]",
                          !endDate && "text-muted-foreground"
                        )}
                        disabled={!startDate}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => {
                          setEndDate(date)
                          setValue("endDate", date)
                        }}
                        disabled={(date) => date < startDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                </div>
              </div>

              {/* Transport Selection */}
              <div>
                <label className="block text-[#7a6868] mb-2">Transport Preference</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "plane", icon: Plane, label: "Plane" },
                    { value: "car", icon: Car, label: "Car" },
                    { value: "train", icon: Train, label: "Train" },
                    { value: "ship", icon: Ship, label: "Ship/Cruise" }
                  ].map((option) => {
                    const Icon = option.icon
                    return (
                      <label 
                        key={option.value}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 border border-[#DFD0D0] rounded-lg cursor-pointer hover:bg-[#f7f2f2] transition-all",
                          watch("transport") === option.value && "bg-[#e6dfdf] border-[#b8a5a5]"
                        )}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register("transport", { 
                            required: "Transport preference is required",
                            onChange: () => setValue("transportClass", "")
                          })}
                          className="sr-only"
                        />
                        <Icon className="h-8 w-8 mb-2 text-[#7a6868]" />
                        <span className="text-sm font-medium text-[#7a6868]">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
                {errors.transport && <p className="text-red-500 text-sm mt-1">{errors.transport.message}</p>}
              </div>

              {(transport === 'plane' || transport === 'train') && (
                <div>
                  <label className="block text-[#7a6868] mb-2">
                    {transport === 'plane' ? 'Plane:' : 'Train:'} Class
                  </label>
                  <RadioGroup 
                    value={transportClass}
                    onValueChange={(value) => setValue("transportClass", value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    {getTransportClassOptions().map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} className="border-[#DFD0D0] text-[#7a6868]" />
                        <Label htmlFor={option.value} className="text-[#7a6868]">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {transport && !transportClass && (
                    <p className="text-red-500 text-sm mt-1">Please select a class</p>
                  )}
                </div>
              )}

<div>
  <label className="block text-[#7a6868] mb-2">Number of Travelers</label>
  <Select
    {...register("travelers", { required: "Number of travelers is required" })}
    onValueChange={(value) => setValue("travelers", value)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select travelers" />
    </SelectTrigger>
    <SelectContent>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          {num} {num === 1 ? "Traveler" : "Travelers"}
        </SelectItem>
      ))}
      <SelectItem value="10+">10+ Travelers</SelectItem>
    </SelectContent>
  </Select>
  {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers.message}</p>}
</div>

              <Button 
                type="submit" 
                className={cn(
                  "w-full bg-[#c9b8b8] hover:bg-[#b8a5a5] text-[#4a3e3e]",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
                disabled={
                  isLoading || 
                  ((transport === 'plane' || transport === 'train') && !transportClass)
                }
              >
                {isLoading ? "Processing..." : "Plan My Trip"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}