"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import Bedrooms from "../../public/svg-assets/Bedrooms";
import BathIcon from "../../public/svg-assets/BathIcon";
import Beds from "../../public/svg-assets/Beds";
import GeuestIcon from "../../public/svg-assets/GeuestIcon";
import LocationIcon from "../../public/svg-assets/LocationIcon";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data for featured listings
const listings = [
  {
    id: 1,
    title: "Mary/phone book",
    rating: 4.8,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 2,
      bathrooms: 1,
      rooms: 2,
    },
    image: "/g1.png",
  },
  {
    id: 2,
    title: "Piccadilly Hideaway",
    rating: 4.9,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 3,
      bathrooms: 2,
      rooms: 4,
    },
    image: "g2.png",
  },
  {
    id: 3,
    title: "Camden Studio",
    rating: 4.7,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 1,
      bathrooms: 1,
      rooms: 1,
    },
    image: "/g2.png",
  },
  {
    id: 4,
    title: "Kensington Luxury",
    rating: 5.0,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 3,
      bathrooms: 2,
      rooms: 5,
    },
    image: "/g1.png",
  },
  {
    id: 5,
    title: "Notting Hill Charm",
    rating: 4.6,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 2,
      bathrooms: 1,
      rooms: 3,
    },
    image: "/g1.png",
  },
  {
    id: 6,
    title: "Shoreditch Loft",
    rating: 4.8,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 2,
      bathrooms: 2,
      rooms: 3,
    },
    image: "/g2.png",
  },
  {
    id: 7,
    title: "Covent Garden Suite",
    rating: 4.9,
    location: "Phuket, Thailand",
    type: {
      bedrooms: 1,
      bathrooms: 1,
      rooms: 2,
    },
    image: "/g2.png",
  },
  {
    id: 8,
    title: "Mayfair Elegance",
    rating: 5.0,
    location: "Elegant apartment in Mayfair",
    type: {
      bedrooms: 3,
      bathrooms: 2,
      rooms: 4,
    },
    image: "/g2.png",
  },
];

export default function FeaturedListings() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="container mx-auto py-16 px-4 md:px-6">
      <div className=" text-center w-full">
        {" "}
        <h2 className="text-2xl font-bold">Featured listings</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <div className="flex justify-end mt-4  py-6 space-x-2">
          <CarouselPrevious className="static translate-y-0 mr-2" />
          <CarouselNext className="static translate-y-0" />
        </div>
        <CarouselContent className="-ml-4">
          {listings.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-4 md:basis-1/2 lg:basis-1/4 "
            >
              <Card className="border-none shadow-lg">
                <CardImage>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    loading="eager"
                    className="transition-transform group-hover:scale-105 w-full h-full object-cover"
                  />
                  <button
                    className="absolute right-3 top-3 rounded-full bg-white p-1.5 transition-colors"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(item.id)
                          ? "fill-black text-black"
                          : ""
                      }`}
                    />
                  </button>
                </CardImage>
                <CardContent>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle>{item.title}</CardTitle>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <CardDescription className=" flex gap-3">
                    {" "}
                    <LocationIcon /> {item.location}
                  </CardDescription>
                  <div className="mt-4 grid grid-cols-2  gap-2">
                    <span className="inline-flex items-center rounded-full   gap-3 px-2.5 py-0.5 text-xs">
                      <Bedrooms />
                      {item.type.bedrooms} Bedroom
                    </span>
                    <span className="inline-flex items-center rounded-full   gap-3 px-2.5 py-0.5 text-xs">
                      <BathIcon />
                      {item.type.bathrooms} Bath
                    </span>
                    <span className="inline-flex items-center rounded-full   gap-3 px-2.5 py-0.5 text-xs">
                      <Beds />
                      {item.type.rooms} Beds
                    </span>

                    <span className="inline-flex items-center rounded-full   gap-3 px-2.5 py-0.5 text-xs">
                      <GeuestIcon />
                      {item.type.rooms} 5 Guests
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-gray-400">
                    Add dates for prices
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex justify-end">
        <Link
          href="/all-listings"
          className="flex items-center text-sm font-medium"
        >
          See all
          <svg
            className="ml-1 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
