"use client";

import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyAmenities } from "@/components/sections/property-amenities";
import { PropertyCarousel } from "@/components/sections/property-carousel";
import { PropertyLocation } from "@/components/sections/property-location";
import { PropertyNearby } from "@/components/sections/property-nearby";
import { PropertyOverview } from "@/components/sections/property-overview";
import PropertyReviews from "@/components/sections/property-reviews";
import { PropertyRooms } from "@/components/sections/property-rooms";
import { PropertyThingsToKnow } from "@/components/sections/property-things-to-know";
import { PropertyTransportation } from "@/components/sections/property-transportation";
import Loading from "@/app/loading";
import BookingCard from "@/components/sections/BookingEngine/BookingCard";
import { fetchListingById, getCalendarByListingId } from "../Listing";
import { usePhotoTourImages } from "@/app/PhotoTour/query/query";

import { BookingProvider, useBooking } from "@/context/DatePickerContext";
import { DateRangePickerList } from "@/components/sections/DateRangePickerList";

export default function PropertyPage() {
  const { id } = useParams();
  const listingId = Array.isArray(id) ? id[0] : id;
  const [showStickyTabs, setShowStickyTabs] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const listing_id = searchParams.get('listingId');
  const { data: dataImage, isLoading: isLoadingImage } = usePhotoTourImages(listingId ?? "");
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listing", listingId],
    enabled: !!listingId,
    queryFn: () => fetchListingById(listingId as string),
  });

  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsContainerRef.current) {
        const containerTop = tabsContainerRef.current.getBoundingClientRect().top;
        setShowStickyTabs(containerTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref?.current) {
      const offset = 104;
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  if (isLoading) return <div className="p-8"><Loading /></div>;
  if (isError) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
 
      <PropertyPageContent 
        id={id}
        listingId={listingId}
        data={data}
        dataImage={dataImage}
        showStickyTabs={showStickyTabs}
        tabsContainerRef={tabsContainerRef}
        overviewRef={overviewRef}
        reviewsRef={reviewsRef}
        locationRef={locationRef}
        handleTabClick={handleTabClick}
      />
   
  );
}

function PropertyPageContent({
  id,
  listingId,
  data,
  dataImage,
  showStickyTabs,
  tabsContainerRef,
  overviewRef,
  reviewsRef,
  locationRef,
  handleTabClick
}: {
  id: string | string[];
  listingId: string;
  data: any;
  dataImage: any;
  showStickyTabs: boolean;
  tabsContainerRef: React.RefObject<HTMLDivElement>;
  overviewRef: React.RefObject<HTMLDivElement>;
  reviewsRef: React.RefObject<HTMLDivElement>;
  locationRef: React.RefObject<HTMLDivElement>;
  handleTabClick: (ref: React.RefObject<HTMLDivElement>) => void;
}) {
  const { 
    dateRange, 
    setDateRange, 
    setIsDatePickerOpen,
    availableDates,
    
    setAvailableDates,
    setLoadingDates
  } = useBooking();

  // Fetch available dates when listingId changes
  useEffect(() => {
    const fetchDates = async () => {
      try {
        setLoadingDates(true);
        const dates = await getCalendarByListingId(listingId);
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error loading calendar dates:", error);
      } finally {
        setLoadingDates(false);
      }
    };

    if (listingId) {
      fetchDates();
    }
  }, [listingId, setAvailableDates, setLoadingDates]);
  
  
    const searchParams = useSearchParams();
  const name = searchParams.get("title");
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header Tabs */}
      {showStickyTabs && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm h-[80px] flex items-center">
          <div className="w-[83%] mx-auto">
            <Tabs defaultValue="overview">
              <TabsList className="bg-white space-x-6 p-0">
                <TabsTrigger
                  value="overview"
                  onClick={() => handleTabClick(overviewRef)}
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none px-0 py-4"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  onClick={() => handleTabClick(reviewsRef)}
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none px-0 py-4"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  onClick={() => handleTabClick(locationRef)}
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none px-0 py-4"
                >
                  Location
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}

      <main className="flex-1">
        <div className="">
          <div className="mx-auto md:w-[83%]">
            <PropertyCarousel
              imagesDummy={data[0].imagesDummy}
              listingId={listingId}
            />
          </div>

          <div ref={tabsContainerRef} className="flex div-content flex-col mx-auto w-[83%] lg:flex-row gap-8 relative">
            {/* Left Content Column */}
            <div className="w-full lg:w-2/3 space-y-6 ">
              {/* Content Sections */}
              <div ref={overviewRef} className="scroll-mt-[104px]   space-y-12">
                <PropertyOverview
                  dummyPropertyData={data[1].dummyPropertyData}
                  stars={data[5]?.propertyReviews.ratingSummary?.stars}
                />
                <PropertyTransportation transportData={data[3].transportData} />
                <PropertyAmenities amenityData={data[2].amenityData} />
                <PropertyRooms roomData={dataImage} />
              </div>

              <div ref={reviewsRef} className="scroll-mt-[104px]">
                <PropertyReviews propertyReviews={data[5].propertyReviews} />

                             </div>
   <DateRangePickerList
                  dateRange={dateRange}
                  listingId={listingId}
                  minNights={data[0].minNights}
                  onDateRangeChange={setDateRange}
                  onClose={() => setIsDatePickerOpen(false)}
                  availableDates={availableDates}
                />
           
 
            </div>

            {/* Right Sidebar - Sticky Booking Card */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky  w-full lg:top-[100px] lg:h-[calc(100vh-104px)]">
                <BookingCard
                  minNight={data[0].minNights}
                  whatsup={data[0].whatsup}
                  listingId={listingId}
                  rate={data[8].rates[0].internalRatePlanId}
                  PricePerNight={data[0].PricePerNight}
                  Cleaningfee={data[0].Cleaningfee}
                  serviceFee={data[0].Servicefee ?? 0}
                  reviews={data[0].reviews}
                  nameBook={name}
                  numReviews={data[0].numReviews}
                  MaxNumofGuests={Number(data[0].MaxNumofGuests)}
                />
              </div>
            </div>
          </div>
          


          <div className="mx-auto w-[83%]">
   <div ref={locationRef} className="scroll-mt-[104px] space-y-12">
                <PropertyLocation location={data[6].dummyLocationData} />
                <PropertyThingsToKnow
                  title={data[7].dummyThingsToKnowData.title}
                  sections={data[7].dummyThingsToKnowData.sections}
                />

             
              </div>

            <PropertyNearby />
          </div>
        </div>
      </main>
    </div>
  );
}