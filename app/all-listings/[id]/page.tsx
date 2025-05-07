import { PropertyAmenities } from "@/components/sections/property-amenities"
import { PropertyBooking } from "@/components/sections/property-booking"
import { PropertyCarousel } from "@/components/sections/property-carousel"
import { PropertyLocation } from "@/components/sections/property-location"
import { PropertyNearby } from "@/components/sections/property-nearby"
import { PropertyOverview } from "@/components/sections/property-overview"
import PropertyReviews from "@/components/sections/property-reviews"

import { PropertyRooms } from "@/components/sections/property-rooms"
import { PropertyThingsToKnow } from "@/components/sections/property-things-to-know"
import { PropertyTransportation } from "@/components/sections/property-transportation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
  
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <PropertyCarousel />
              <div className="mt-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-transparent border-b h-auto p-0 space-x-6">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Location
                    </TabsTrigger>
                  </TabsList>
                  
                    <PropertyOverview />
                    <PropertyAmenities />
                    <PropertyTransportation />
                    <PropertyRooms />
                
              
                    <PropertyReviews/>
                
                
                    <PropertyLocation />
                    <PropertyThingsToKnow/>
             
                </Tabs>
              </div>
              <PropertyNearby />
            </div>
            <div className="w-full lg:w-1/3 ">
              <PropertyBooking />
      
            </div>
          </div>
        </div>
      </main>
 
    </div>
  )
}

