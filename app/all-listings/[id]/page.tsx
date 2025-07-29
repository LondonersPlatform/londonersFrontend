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
import {
  addFavorite,
  fetchListingById,
  getCalendarByListingId,
  getNearbyListingsById,
  getReviewsByListingId,
} from "../Listing";
import { usePhotoTourImages } from "@/app/PhotoTour/query/query";

import { BookingProvider, useBooking } from "@/context/DatePickerContext";
import { DateRangePickerList } from "@/components/sections/DateRangePickerList";

export default function PropertyPage() {
  const { id } = useParams();
  const listingId = Array.isArray(id) ? id[0] : id;
  const [showStickyTabs, setShowStickyTabs] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const listing_id = searchParams.get("listingId");
  const { data: dataImage, isLoading: isLoadingImage } = usePhotoTourImages(
    listingId ?? ""
  );

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
        const containerTop =
          tabsContainerRef.current.getBoundingClientRect().top;
        setShowStickyTabs(containerTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [properties_List, setproperties_List] = useState(undefined);

  const [favorited, setFavorited] = useState<Set<string>>(new Set());
const hasFetchedNearby = useRef(false);
  useEffect(() => {
    const fetchNearby = async () => {
      if (!listingId || hasFetchedNearby.current) return;
  hasFetchedNearby.current = true;
      setLoadingNearby(true);

      try {
        const res = await getNearbyListingsById(listingId);
        const json = await res;
        setproperties_List(json);
        const mapped = json?.nearby_listings
          .filter((listing: any) => listing.title && listing.pictures?.length)
          .map((listing: any) => ({
            id: listing.listing_id,
            imageUrl: listing.pictures?.[0]?.thumbnail ?? null,
            title: listing.title ?? "Untitled Listing",
            rating: listing.overall_average_rating ?? "no rating",
            details: {
              beds: listing.beds ?? 0,
              baths: listing.bathrooms ?? 0,
              kitchens: 1,
            },
            area: listing.location?.city ?? "Unknown",
            price: listing.price_per_night?.base_price ?? 0,
            guests: listing.guests ?? 1,
            isFavorite: listing.isFavorite,
          }));

        setProperties(mapped);
      } catch (error) {
        console.error("Error fetching nearby listings:", error);
      } finally {
        setLoadingNearby(false);
      }
    };

    fetchNearby();
  }, [listingId]);

  const handleFavoriteClick = async (
    e: React.MouseEvent,
    listingId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const guestyUserId = localStorage.getItem("GuestyId");
      await addFavorite({ guestyUserId, listingId });
      setFavorited((prev) => new Set(prev).add(listingId));
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };
  const handleTabClick = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref?.current) {
      const offset = 104;
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-8">
        <Loading />
      </div>
    );
  if (isError)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <PropertyPageContent
      properties={properties}
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
      loadingNearby={loadingNearby}
      properties_List={properties_List}
    />
  );
}

function PropertyPageContent({
  id,
  listingId,
  data,
  properties,

  handleFavoriteClick,
  loadingNearby,
  properties_List,
  dataImage,
  showStickyTabs,
  tabsContainerRef,
  overviewRef,
  reviewsRef,
  locationRef,
  handleTabClick,
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
    setLoadingDates,
  } = useBooking();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!listingId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await getReviewsByListingId(listingId, 10);
        setReviews(fetchedReviews);
 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      fetchReviews();
   
    }
  }, []);

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
const paymentObj = data.find(item => item.paymentProviderId);
if (paymentObj) {
  console.log("paymentProviderId:", paymentObj.paymentProviderId);
} else {
  console.log("paymentProviderId not found");
}
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
              isFavorite={data[0].isFavorite}
              imagesDummy={data[0].imagesDummy}
              listingId={listingId}
            />
          </div>

          <div
            ref={tabsContainerRef}
            className="flex div-content flex-col mx-auto w-[83%] lg:flex-row gap-8 relative"
          >
            {/* Left Content Column */}
            <div className="w-full lg:w-2/3 space-y-6 ">
              {/* Content Sections */}
              <div ref={overviewRef} className="scroll-mt-[104px]   space-y-12">
                <PropertyOverview
                  reviews={reviews}
                  dummyPropertyData={data[1].dummyPropertyData}
                  stars={data[5]?.propertyReviews.ratingSummary?.stars}
                />
                <PropertyTransportation transportData={data[3].transportData} />
                <PropertyAmenities amenityData={data[2].amenityData} />
                <PropertyRooms roomData={dataImage} />
              </div>

              <div ref={reviewsRef} className="scroll-mt-[104px]">
                <PropertyReviews
                  propertyReviews={data[5].propertyReviews}
                  reviews={reviews}
                />
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
              paymentProviderId={  paymentObj.paymentProviderId}
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
              {!loadingNearby && (
                <PropertyLocation
                  location={data[6].dummyLocationData}
                  imagesDummy={data[0].imagesDummy}
                  listingId={listingId}
                  properties_List={properties_List}
                  loading={loadingNearby}
                />
              )}
              <PropertyThingsToKnow
                title={data[7].dummyThingsToKnowData.title}
                sections={data[7].dummyThingsToKnowData.sections}
              />
            </div>

            <PropertyNearby
              title="Nearby Apartments"
              properties={properties}
              loading={loadingNearby}
              onFavoriteClick={handleFavoriteClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
