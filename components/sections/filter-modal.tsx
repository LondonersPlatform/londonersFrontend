"use client"
import { useAllListing } from "@/context/AllListingContext";
import { useState } from "react"
import * as Slider from "@radix-ui/react-slider"
import { X, ChevronRight, Wifi, Wind, UtensilsCrossed, Baby } from "lucide-react"

interface FiltersModalProps {
  onClose: () => void
  onApply: (filters: FilterState) => void
}

interface FilterState {
  bedrooms: number | null
  beds: number
  bathrooms: number
  priceRange: [number, number]
  amenities: string[]
}

export default function FiltersModal({ onClose, onApply }: FiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    bedrooms: null,
    beds: 1,
    bathrooms: 1,
    priceRange: [100, 10000],
    amenities: [],
  })

  // Generate some random histogram data
  const histogramData = Array.from({ length: 50 }, (_, i) => {
    // Create a pattern similar to the image with 3 peaks
    if ((i > 10 && i < 15) || (i > 25 && i < 30) || (i > 40 && i < 45)) {
      return Math.floor(Math.random() * 30) + 40 // Higher values for peaks
    } else {
      return Math.floor(Math.random() * 20) + 5 // Lower values for non-peaks
    }
  })

  // Normalize histogram data for display
  const maxDataValue = Math.max(...histogramData)
  const normalizedData = histogramData.map((value) => value / maxDataValue)

  // Calculate which bars should be highlighted (between min and max)
  const highlightedBars = normalizedData.map((_, index) => {
    const barValue = 0 + (index / (normalizedData.length - 1)) * (10000 - 0)
    return barValue >= filters.priceRange[0] && barValue <= filters.priceRange[1]
  })

  const amenitiesList = [
    { id: "wifi", label: "Wifi", icon: <Wifi className="w-4 h-4 mr-2" /> },
    { id: "aircon", label: "Air conditioners", icon: <Wind className="w-4 h-4 mr-2" /> },
    { id: "kitchen", label: "Kitchen", icon: <UtensilsCrossed className="w-4 h-4 mr-2" /> },
    { id: "babysitter", label: "Babysitter", icon: <Baby className="w-4 h-4 mr-2" /> },
    { id: "aircon2", label: "Air conditioners", icon: <Wind className="w-4 h-4 mr-2" /> },
    { id: "kitchen2", label: "Kitchen", icon: <UtensilsCrossed className="w-4 h-4 mr-2" /> },
    { id: "babysitter2", label: "Babysitter", icon: <Baby className="w-4 h-4 mr-2" /> },
  ]

  const toggleAmenity = (id: string) => {
    setFilters((prev) => {
      if (prev.amenities.includes(id)) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== id) }
      } else {
        return { ...prev, amenities: [...prev.amenities, id] }
      }
    })
  }
  const { data, setData, copyData } = useAllListing();

  const handleClearAll = () => {
    setFilters({
      bedrooms: null,
      beds: 1,
      bathrooms: 1,
      priceRange: [100, 10000],
      amenities: [],
    })
    setData(copyData)
  }

  const formatPrice = (value: number) => {
    return value >= 1000 ? `$${value / 1000}K` : `$${value}`
  }
 
  return (
    <div className="fixed inset-0   shadow-lg border rounded-2xl bg-[#00000066] backdrop-blur-sm z-50 ">
    <div className=" p-6 relative bg-white my-6 rounded-2xl mx-auto  max-w-3xl">
    <div className="max-w-3xl bg-white h-[90vh]  px-3 overflow-auto">
        <div className="flex absolute right-[-12px] top-[-15px] items-center justify-center bg-white rounded-full w-12 h-12  hover:bg-gray-100">
          <button onClick={onClose} className="rounded-full ">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rooms and beds */}
        <div className=" mb-8">
          <h2 className="text-xl font-semibold mb-6">Rooms and beds</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="font-medium">Bedrooms</div>
              <div className="flex items-center">
                <button
                  className={`rounded-full px-6 py-2 mr-3 ${filters.bedrooms === null ? "border-2 border-black" : "border"}`}
                  onClick={() => setFilters((prev) => ({ ...prev, bedrooms: null }))}
                >
                  Any
                </button>
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                  onClick={() => setFilters((prev) => ({ ...prev, bedrooms: (prev.bedrooms || 0) + 1 }))}
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-medium">Beds</div>
              <div className="flex items-center space-x-4">
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                  onClick={() => setFilters((prev) => ({ ...prev, beds: Math.max(0, prev.beds - 1) }))}
                  disabled={filters.beds <= 0}
                >
                  <span className="text-lg">-</span>
                </button>
                <span>{filters.beds}</span>
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                  onClick={() => setFilters((prev) => ({ ...prev, beds: prev.beds + 1 }))}
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-medium">Bathrooms</div>
              <div className="flex items-center space-x-4">
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                  onClick={() => setFilters((prev) => ({ ...prev, bathrooms: Math.max(0, prev.bathrooms - 1) }))}
                  disabled={filters.bathrooms <= 0}
                >
                  <span className="text-lg">-</span>
                </button>
                <span>{filters.bathrooms}</span>
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                  onClick={() => setFilters((prev) => ({ ...prev, bathrooms: prev.bathrooms + 1 }))}
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200"></div>
        </div>

        {/* Price range */}
        <div >
          <h2 className="text-xl font-semibold mb-3">Price range</h2>

          {/* Histogram */}
          <div className="relative h-24 ">
            <div className="absolute inset-0 flex items-end">
              {normalizedData.map((height, index) => (
                <div
                  key={index}
                  className={`w-full h-[${Math.max(height * 100, 5)}%] mx-[1px] ${
                    highlightedBars[index] ? "bg-black" : "bg-gray-300"
                  }`}
                  style={{ height: `${Math.max(height * 100, 5)}%` }}
                />
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="relative  ">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={filters.priceRange}
              min={0}
              max={10000}
              step={100}
              onValueChange={(newValues) =>
                setFilters((prev) => ({ ...prev, priceRange: newValues as [number, number] }))
              }
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-black rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Minimum price"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Maximum price"
              />
            </Slider.Root>

            {/* Min/Max Labels */}
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <div className="flex flex-col items-start">
                <span>Minimum</span>
                <div className="mt-1 px-3 py-1 border rounded-full">{formatPrice(filters.priceRange[0])}</div>
              </div>
              <div className="flex flex-col items-end">
                <span>Maximum</span>
                <div className="mt-1 px-3 py-1 border rounded-full">{formatPrice(filters.priceRange[1])}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200"></div>
        </div>

        {/* Amenities */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-6">Amenities</h2>

          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity.id}
                className={`flex items-center px-4 py-2 rounded-full border ${
                  filters.amenities.includes(amenity.id) ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                {amenity.icon}
                {amenity.label}
              </button>
            ))}
          </div>

          <button className="flex items-center mt-4 font-semibold">
            Show more <ChevronRight className="w-4 h-4 ml-1" />
          </button>

          <div className="mt-6 border-b border-gray-200"></div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center py-4">
          <button onClick={handleClearAll} className="flex items-center text-black underline">
            Clear all <X className="w-4 h-4 ml-1" />
          </button>

          <button onClick={() => onApply(filters)} className="bg-black text-white rounded-lg px-6 py-3">
            Show 300 places
          </button>
        </div>
      </div> 


    </div>
    </div>
  )
}

