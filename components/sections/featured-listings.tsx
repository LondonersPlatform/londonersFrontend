"use client";

import { useEffect, useState } from "react";
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
import { fetchListings } from "@/app/all-listings/Listing";
import SkeletonCard from "../ui/SkeletonCard";


interface Listing {
  id: string;
  title: string;
  location: string;
  rating: number;
  bedroom: number;
  beds: number;
  bath: number;
  guests: number;
  images: string[];
  isFavorite: boolean;
}

export default function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);      
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);


  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const { listings, total } = await fetchListings({}, page, 8); 
        setListings(listings);
        setTotal(total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getListings();
  }, [page]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold">Featured listings</h2>
      </div>

      {loading &&   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
    {Array.from({ length: 4 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>}

      {!loading && (
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <div className="flex justify-end  py-6 space-x-2">
            <CarouselPrevious className="static translate-y-0 mr-2" />
            <CarouselNext className="static translate-y-0" />
          </div>

          <CarouselContent className="-ml-4">
            {listings.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <Card className="shadow-lg border-none my-12">
                  <CardImage>
                    <Image
                      src={item.images?.[0] ?? "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      loading="eager"
                      className="transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover"
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
                        <span className="ml-1 text-sm">{item.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <CardDescription className="flex gap-3">
                      <LocationIcon />
                      {item.location}
                    </CardDescription>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <span className="inline-flex items-center gap-3 text-xs">
                        <Bedrooms />
                        {item.bedroom} Bedroom
                      </span>
                      <span className="inline-flex items-center gap-3 text-xs">
                        <BathIcon />
                        {item.bath} Bath
                      </span>
                      <span className="inline-flex items-center gap-3 text-xs">
                        <Beds />
                        {item.beds} Beds
                      </span>
                      <span className="inline-flex items-center gap-3 text-xs">
                        <GeuestIcon />
                        {item.guests} Guests
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
      )}


      <div className=" flex justify-end">
        <Link href="/all-listings" className="flex items-center text-sm font-medium">
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
