"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { CalendarIcon, Plane, Car, Train, Ship, Check, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button as UIButton } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Material UI Components
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"

// Nominatim base URL for OpenStreetMap API
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"

// Location Search Component
const LocationSearch = ({ value, onChange, onSelect, placeholder }) => {
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
  
    // Auto-search after typing
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
          <OutlinedInput
            className="w-full border-[#DFD0D0]"
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
          <div className="border border-[#DFD0D0] rounded-md mb-4 max-h-64 overflow-y-auto bg-white z-20 relative">
            <List component="nav" aria-label="location results">
              {listPlace.map((item) => (
                <div key={item?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setIsProgrammaticUpdate(true)
                      onSelect(item)
                      setListPlace([])
                    }}
                  >
                    <ListItemIcon>
                      <MapPin className="h-6 w-6 text-[#7a6868]" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item?.display_name} 
                      className="text-[#7a6868]"
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    )
  }

export default function PlanTripPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [sourceLocation, setSourceLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState(null)

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

  // Get appropriate class options based on transport type
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

  const onSubmit = (data) => {
    // Include coordinates if locations were selected from search
    const formData = {
      ...data,
      startDate,
      endDate,
      sourceCoords: sourceLocation ? [sourceLocation.lat, sourceLocation.lon] : null,
      destCoords: destinationLocation ? [destinationLocation.lat, destinationLocation.lon] : null,
    }
    
    console.log(formData)
    setIsSubmitted(true)
    
    // Simulate a brief loading period before redirecting
    setTimeout(() => {
      // In a real app, you might use state management instead of URL params for complex data
      router.push(`/itinerary?source=${encodeURIComponent(data.source)}&destination=${encodeURIComponent(data.destination)}`)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7a6868] mb-4">Plan Your Trip</h1>
          <p className="text-[#9e8585]">Fill in the details below to start planning your perfect getaway</p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Creating Your Trip Plan!</h2>
            <p className="text-green-700">
              We're preparing your personalized itinerary from {source} to {destination}...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-in slide-in-from-bottom duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Source Location with OpenStreetMap */}
              <div>
                <label className="block text-[#7a6868] mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Departure Location
                </label>
                <LocationSearch 
                  value={source}
                  onChange={(value) => setValue("source", value)}
                  onSelect={(location) => {
                    setValue("source", location.display_name)
                    setSourceLocation(location)
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
                    setValue("destination", location.display_name)
                    setDestinationLocation(location)
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
                      <UIButton
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#DFD0D0] focus-visible:ring-[#b8a5a5]",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </UIButton>
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
                </div>

                <div>
                  <label className="block text-[#7a6868] mb-2">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <UIButton
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#DFD0D0] focus-visible:ring-[#b8a5a5]",
                          !endDate && "text-muted-foreground"
                        )}
                        disabled={!startDate}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </UIButton>
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
                            onChange: () => setValue("transportClass", "") // Reset class when transport changes
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

              {/* Transport Class Options - Only show for plane and train */}
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
                <select
                  {...register("travelers", { required: "Number of travelers is required" })}
                  className="w-full border border-[#DFD0D0] rounded-md p-2 focus:ring-[#b8a5a5]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                  <option value="10+">10+ Travelers</option>
                </select>
              </div>

              <UIButton 
                type="submit" 
                className="w-full bg-[#c9b8b8] hover:bg-[#b8a5a5] text-[#4a3e3e]"
                disabled={
                  (transport === 'plane' || transport === 'train') && !transportClass
                }
              >
                Plan My Trip
              </UIButton>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}