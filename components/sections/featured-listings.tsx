"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
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
    location: "Private room in London",
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
    location: "Entire flat in Chelsea",
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
    location: "Studio apartment in Camden",
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
    location: "Luxury apartment in Kensington",
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
    location: "Charming flat in Notting Hill",
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
    location: "Modern loft in Shoreditch",
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
    location: "Luxury suite in Covent Garden",
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

      <div className=" text-center w-full"> <h2 className="text-2xl font-bold">Featured listings</h2></div>
      <div className="mb-8 flex items-center justify-between">
       
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
              className="pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <Card>
                <CardImage>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
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
                  <CardDescription>{item.location}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                      <svg
                        className="mr-1 h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 10.9999V4.99994C22 3.89994 21.1 2.99994 20 2.99994H4C2.9 2.99994 2 3.89994 2 4.99994V10.9999C3.1 10.9999 4 11.8999 4 12.9999C4 14.0999 3.1 14.9999 2 14.9999V16.9999C2 18.0999 2.9 18.9999 4 18.9999H20C21.1 18.9999 22 18.0999 22 16.9999V14.9999C20.9 14.9999 20 14.0999 20 12.9999C20 11.8999 20.9 10.9999 22 10.9999Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 7H7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 15H7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 7H18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 15H18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15V17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item.type.bedrooms} Bedroom
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                      <svg
                        className="mr-1 h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 22L2 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 22V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 22V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.28 5.81994C16.28 7.88994 14.59 9.56994 12.52 9.56994C10.45 9.56994 8.77002 7.88994 8.77002 5.81994C8.77002 3.74994 10.45 2.06994 12.52 2.06994"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 11H4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.26 5.81982C15.26 3.74982 13.58 2.06982 11.51 2.06982C9.44 2.06982 7.76001 3.74982 7.76001 5.81982C7.76001 7.88982 9.44 9.56982 11.51 9.56982C13.58 9.56982 15.26 7.88982 15.26 5.81982Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item.type.bathrooms} Bath
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                      <svg
                        className="mr-1 h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 22H22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.94995 22L2.99995 9.96999C2.99995 9.35999 3.28995 8.78004 3.76995 8.40004L10.77 2.95003C11.49 2.39003 12.5 2.39003 13.23 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 16.25V16.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item.type.rooms} Rooms
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
