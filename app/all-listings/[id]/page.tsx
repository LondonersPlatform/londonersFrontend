"use client"
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
import { useRef } from "react";

export default function Home() {
  const data = [
    {
      Cleaningfee: "60",
      Servicefee: "70",
      reviews: "4.9",
      numReviews: "42",

      imagesDummy: [
        "/1dt.png?auto=format&fit=crop&w=800&h=600",
        "/2dt.png?auto=format&fit=crop&w=800&h=600",
        "/3dt.png?auto=format&fit=crop&w=800&h=600",
        "/4dt.png?auto=format&fit=crop&w=800&h=600",
        "/5dt.png?auto=format&fit=crop&w=800&h=600",
        "/6dt.png?auto=format&fit=crop&w=800&h=600",
      ],
    },
    {
      dummyPropertyData: {
        rating: 4.9,
        reviewCount: 42,
        location: "London, UK",
        description: [
          "A stunning apartment located in the luxurious Marylebone apartment with sleek, high ceilings and a beautiful, modern design. Located in the heart of London, this apartment is perfect for those looking to explore the city while enjoying a comfortable and stylish place to stay.",
          "Regent's Park, London's most beautiful Royal Park, is only a 5-minute walk away. Oxford Street and Marylebone High Street are minutes away by foot. Ideally located for shopping, restaurants, and entertainment.",
        ],
        amenities: [
          {
            icon: "Wifi",
            name: "Fast wifi",
            description: "Download speeds of 100+ Mbps",
          },
          {
            icon: "Tv",
            name: "Self check-in",
            description: "Check yourself in with the smartlock",
          },
          {
            icon: "AirVent",
            name: "Air Conditioning",
            description: "Air conditioning throughout the entire place",
          },
        ],
      },
    },
    {
      amenityData: [
        {
          icon: "Wifi",
          name: "Wifi",
        },
        {
          icon: "AirVent",
          name: "Air conditioning",
        },
        {
          icon: "Tv",
          name: "TV",
        },
        {
          icon: "Utensils",
          name: "Kitchen",
        },
        {
          icon: "Parking",
          name: "Free parking",
        },
        {
          icon: "Snowflake",
          name: "Washer/Dryer",
        },
        {
          icon: "Coffee",
          name: "Coffee maker",
        },
        {
          icon: "Dumbbell",
          name: "Gym",
        },
        {
          icon: "Waves",
          name: "Pool",
        },
        {
          icon: "ShowerHead",
          name: "Hot water",
        },
        {
          icon: "FireExtinguisher",
          name: "Fire extinguisher",
        },
        {
          icon: "Sprout",
          name: "Garden view",
        },
      ],
    },
    {
      transportData: [
        {
          name: "Regent's Park Station (5-7 minute)",
          icon: "/placeholder.svg?height=32&width=32&text=TFL",
          alt: "London Underground",
        },
        {
          name: "Baker Street Station (5-7 minute)",
          icon: "/placeholder.svg?height=32&width=32&text=TFL",
          alt: "London Underground",
        },
      ],
    },
    {
      roomData: [
        {
          image: "/bd1.png",
          alt: "Bedroom 1",
          name: "Bedroom 1",
          description: "1 queen bed",
          hasBed: true,
        },
        {
          image: "/bd1.png",
          alt: "Bedroom 2",
          name: "Bedroom 2",
          description: "1 queen bed",
          hasBed: true,
        },
        {
          image: "/bd1.png",
          alt: "Living Room",
          name: "Living Room",
          description: "Spacious common area",
          hasBed: false,
        },
      ],
    },
    {
      propertyReviews: {
        ratingSummary: {
          average: 4.9,
          count: 200,
          stars: 5,
          ratingBars: [
            {
              label: "5 star",
              percentage: 85,
            },
            {
              label: "4 star",
              percentage: 60,
            },
            {
              label: "3 star",
              percentage: 35,
            },
            {
              label: "2 star",
              percentage: 10,
            },
            {
              label: "1 star",
              percentage: 5,
            },
          ],
          categories: [
            {
              label: "Cleanliness",
              rating: 4.65,
            },
            {
              label: "Accuracy",
              rating: 4.65,
            },
            {
              label: "Check-In",
              rating: 4.65,
            },
            {
              label: "Communication",
              rating: 4.65,
            },
            {
              label: "Location",
              rating: 4.65,
            },
            {
              label: "Value",
              rating: 4.65,
            },
          ],
        },
        reviews: [
          {
            id: 1,
            user: {
              name: "Mary William",
              initials: "MW",
              avatar: "/placeholder.svg?height=40&width=40&text=MW",
            },
            rating: 4.6,
            date: "3 month ago",
            content:
              '"Perfect base for exploring London. Family of five fitted comfortably. Immaculately clean. Easy walk to multiple tube stations. Nice neighborhood and quiet street with very little traffic. Easy to fin"',
            fullContent:
              '"Perfect base for exploring London. Family of five fitted comfortably. Immaculately clean. Easy walk to multiple tube stations. Nice neighborhood and quiet street with very little traffic. Easy to find and check-in was seamless. Would definitely stay here again when visiting London."',
          },
          {
            id: 2,
            user: {
              name: "John Smith",
              initials: "JS",
              avatar: "/placeholder.svg?height=40&width=40&text=JS",
            },
            rating: 5,
            date: "1 month ago",
            content:
              '"Excellent location and very comfortable stay. The host was responsive and helpful throughout our visit."',
            fullContent:
              '"Excellent location and very comfortable stay. The host was responsive and helpful throughout our visit. The apartment had everything we needed and more. The neighborhood was quiet yet close to all the attractions we wanted to visit. Highly recommend this place to anyone visiting the city."',
          },
          {
            id: 3,
            user: {
              name: "Sarah Johnson",
              initials: "SJ",
              avatar: "/placeholder.svg?height=40&width=40&text=SJ",
            },
            rating: 4.8,
            date: "2 weeks ago",
            content:
              '"Beautiful property with amazing views. Everything was as described and we had a wonderful time."',
            fullContent:
              '"Beautiful property with amazing views. Everything was as described and we had a wonderful time. The check-in process was smooth, and the property was spotless when we arrived. The location was perfect for our needs, with great restaurants and shops within walking distance. We would definitely consider staying here again on our next trip."',
          },
        ],
      },
    },
    {
      dummyLocationData: {
        title: "Where you'll be",
        description:
          "Located in Marylebone, one of London's coolest and elegant neighborhoods. Known for its sophisticated vibe and charm, it's well connected to all major attractions in London.",
        coordinates: "51.520329984930065,-0.157007987873027",
        neighborhood: "Marylebone, London",
        walkingDistances: [
          "5 min walk to Regent's Park",
          "10 min walk to Oxford Street",
          "15 min walk to Selfridges",
          "20 min walk to Soho",
          "25 min walk to British Museum",
        ],
      },
    },
    {
      dummyThingsToKnowData: {
        title: "Things to know",
        sections: [
          {
            title: "House Rules",
            items: [
              "Check-in after 15:00",
              "Checkout before 11:00",
              "4 guests maximum",
            ],
            hasButton: true,
          },
          {
            title: "Safety & Property",
            items: [
              "Carbon monoxide alarm",
              "Smoke alarm",
              "Security camera/recording device",
            ],
            hasButton: true,
          },
          {
            title: "Cancellation Policy",
            items: [
              "Free cancellation within 48 hours of booking. After that, cancel before 5 days of your trip and get a 50% refund.",
            ],
            hasButton: true,
            isParagraph: true,
          },
        ],
      },
    },
  ];
  const overviewRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);

  const handleTabClick = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
      <div className="min-h-screen mx-24 overflow-x-hidden flex flex-col">
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
                    <PropertyOverview dummyPropertyData={data[1].dummyPropertyData} />
                    <PropertyAmenities amenityData={data[2].amenityData} />
                    <PropertyTransportation transportData={data[3].transportData} />
                    <PropertyRooms roomData={data[4].roomData} />
                  </div>

                  <div ref={reviewsRef}>
                    <PropertyReviews propertyReviews={data[5].propertyReviews} />
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
                  cleaningFee={data[0].Cleaningfee}
                  serviceFee={data[0].Servicefee}
                  reviews={data[0].reviews}
                  numReviews={data[0].numReviews}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

