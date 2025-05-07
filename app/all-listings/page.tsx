"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Search, SlidersHorizontal, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FiltersModal from "@/components/sections/filter-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Bedrooms from "../../public/svg-assets/Bedrooms";
import BathIcon from "../../public/svg-assets/BathIcon";
import Beds from "../../public/svg-assets/Beds";
import GeuestIcon from "../../public/svg-assets/GeuestIcon";
import LocationIcon  from "../../public/svg-assets/LocationIcon";
import DistarrowIcon  from "../../public/svg-assets/DistarrowIcon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Marlybone book",
    location: "Phuket, Thailand",
    area: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedroom: 1,
    beds: 4,
    bath: 1,
    guests: 5,
    dateRange: "Feb 12 - Mar 18 (35 nights)",
    pricePerNight: 500,
    totalPrice: 1200,
    images: ["/la1.png", "./la2.png"],
    isFavorite: false,
  },
  {
    id: 2,
    title: "Marlybone book",
    location: "Phuket, Thailand",
    area: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedroom: 1,
    beds: 4,
    bath: 1,
    guests: 5,
    dateRange: "Feb 12 - Mar 18 (35 nights)",
    pricePerNight: 500,
    totalPrice: 1200,
    images: ["/la1.png", "/la2.png"],
    isFavorite: true,
  },
  {
    id: 3,
    title: "Marlybone book",
    location: "Phuket, Thailand",
    area: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedroom: 1,
    beds: 4,
    bath: 1,
    guests: 5,
    dateRange: "Feb 12 - Mar 18 (35 nights)",
    pricePerNight: 500,
    totalPrice: 1200,
    images: ["/la1.png", "/la2.png"],
    isFavorite: true,
  },
]

export default function AllListingsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<any>(null)

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters)
    setShowFilters(false)
    console.log("Applied filters:", filters)
    // Here you would typically filter the listings based on the applied filters
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and filter section */}
      <div className="mb-8">
        <div className="relative lg:w-1/2 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-gray-100 py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
        </div>

        <div className="flex flex-col w-full gap-4 md:items-center md:flex-row">
      <h1 className="text-2xl font-bold flex-grow">20 Rentals</h1>

      <div className="flex items-center gap-3 justify-end w-full md:w-auto">
        {/* Mobile view: Icon only */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg border border-gray-300 md:hidden"
          onClick={() => setShowFilters(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filters</span>
        </Button>

        {/* Desktop view: Icon with text */}
        <Button
          variant="outline"
          className="hidden md:flex items-center space-x-2 rounded-lg border border-gray-300"
          onClick={() => setShowFilters(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </Button>

        <div className="flex items-center space-x-2">
          <span className="hidden md:inline text-sm font-medium">Sort by:</span>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Default order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default order</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
      </div>

      {/* Listings */}
      <div className="space-y-6">
        {listings.map((listing, index) => (
          <Link
        href="all-listings/1"
            key={listing.id}
            className=" rounded-xl   transition-shadow   hover:shadow-sm"
          >
            <div className="flex rounded-2xl p-0  my-6 border-gray-300 border-[1px] flex-col md:flex-row">
              {/* Images */}
              <div className="relative p-0 m-0 rounded-xl items-center  flex w-full md:w-2/5">
                <div className="relative h-full w-1/2">
                  <Image
                    src={listing.images[1] || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                
                  />
                </div>
                <div className="relative h-full w-1/2">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    fill
               
                  />
                </div>
              </div>
              <div className={`relative lg:hidden p-0 m-0 rounded-xl w-full `}>
              <Carousel className="w-full">
  <CarouselContent>
    {listing.images.map((src, index) => (
      <CarouselItem key={index}>
        <div className="keen-slider__slide relative h-64 w-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-2" />
  <CarouselNext className="right-2" />
</Carousel>

      </div>
              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{listing.title}</h2>
                    <button className="rounded-full p-1 hover:bg-gray-100">
                      <Heart className={`h-6 w-6 ${listing.isFavorite ? "fill-black text-black" : ""}`} />
                    </button>
                  </div>

                  <div className="mb-4 flex items-center space-x-2">
                    <div className="flex items-center gap-1 text-red-500">
                   <LocationIcon/>
                      <span className="ml-1 text-sm">{listing.location}</span>
                    </div>
                    <span className="text-gray-400"><DistarrowIcon/></span>
                    <span className="text-sm text-gray-600">{listing.area}</span>
                  </div>

                  <div className="mb-4 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(listing.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium">{listing.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({listing.reviews} Reviews)</span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
              <Bedrooms/>
                      <span className="text-sm">{listing.bedroom} Bedroom</span>
                    </div>
                    <div className="flex items-center gap-2">
                  <Beds/> 
                      <span className="text-sm">{listing.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
              <BathIcon/>
                      <span className="text-sm">{listing.bath} Bath</span>
                    </div>
                    <div className="flex items-center gap-2">
             <GeuestIcon/>
                      <span className="text-sm">{listing.guests} Guests</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="my-4 text-sm">{listing.dateRange}</div>
                  <div className="flex items-end gap-5 ">
                    <div>
                      <span className="text-xl font-bold">${listing.pricePerNight}</span>
                      <span className="text-sm text-gray-500">/night</span>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xl font-bold">${listing.totalPrice}</span>
                      <div className="text-sm text-gray-500">Total (including fees and taxes)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show more button */}
      <div className="mt-8 flex justify-center">
        <Button variant="primary" className="flex items-center space-x-2 rounded-full bg-black px-6 py-3 text-white">
          <span>Show more</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters Modal */}
      {showFilters && <FiltersModal onClose={() => setShowFilters(false)} onApply={handleApplyFilters} />}
    </div>
  )
}

