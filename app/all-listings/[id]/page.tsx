"use client";
import { PropertyAmenities } from "@/components/sections/property-amenities";
import { PropertyBooking } from "@/components/sections/property-booking";
import { PropertyCarousel } from "@/components/sections/property-carousel";
import { PropertyLocation } from "@/components/sections/property-location";
import { PropertyNearby } from "@/components/sections/property-nearby";
import { PropertyOverview } from "@/components/sections/property-overview";
import PropertyReviews from "@/components/sections/property-reviews";

import { PropertyRooms } from "@/components/sections/property-rooms";
import { PropertyThingsToKnow } from "@/components/sections/property-things-to-know";
import { PropertyTransportation } from "@/components/sections/property-transportation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { fetchListingById } from "../Listing";
import { useParams, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

export default function Home() {
  const { id } = useParams(); // 👈 Get ID from route

  const listingId = id;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchListingById(id),
  });

  const overviewRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);

  const handleTabClick = (ref: any) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  if (isLoading) return <div className="p-8">

<Loading/>
    
  </div>;
  if (isError)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen lg:mx-32 overflow-x-hidden flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <PropertyCarousel imagesDummy={data[0].imagesDummy} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="mt-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="sticky top-0 z-20 bg-white/80 backdrop-blur w-full justify-start mb-6 border-b h-auto p-0 space-x-6">
                    <TabsTrigger
                      value="overview"
                      onClick={() => handleTabClick(overviewRef)}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      onClick={() => handleTabClick(reviewsRef)}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      onClick={() => handleTabClick(locationRef)}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-0 py-2 bg-transparent"
                    >
                      Location
                    </TabsTrigger>
                  </TabsList>

                  {/* Sections */}
                  <div ref={overviewRef}>
                    <PropertyOverview
                      dummyPropertyData={data[1].dummyPropertyData}
                    stars={data[5]?.propertyReviews.ratingSummary?.stars}
                    />
                    <PropertyAmenities amenityData={data[2].amenityData} />
                    <PropertyTransportation
                      transportData={data[3].transportData}
                    />
                    <PropertyRooms roomData={data[4].roomData} />
                  </div>

                  <div ref={reviewsRef}>
                    <PropertyReviews
                      propertyReviews={data[5].propertyReviews}
                    />
                  </div>

                  <div ref={locationRef}>
                    <PropertyLocation location={data[6].dummyLocationData} />
                    <PropertyThingsToKnow
                      title={data[7].dummyThingsToKnowData.title}
                      sections={data[7].dummyThingsToKnowData.sections}
                    />
                  </div>
                </Tabs>
              </div>

              <PropertyNearby />
            </div>

            <div className="w-full mt-12 lg:w-1/3">
              <div className="sticky top-24">
                <PropertyBooking
                whatsup={data[0].whatsup}
                listingId={listingId}
                PricePerNight={data[0].PricePerNight}
                  Cleaningfee={data[0].Cleaningfee}
                  serviceFee={data[0].Servicefee ?data[0].Servicefee  :0  }
                  reviews={data[0].reviews}
                  numReviews={data[0].numReviews}
                  MaxNumofGuests={data[0].MaxNumofGuests}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
