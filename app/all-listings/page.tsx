'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FilterButton,
  SortSelect,
  FavoriteButton,
  SearchInput,
} from "@/components/listings/listing-client-components";
import Link from "next/link";
import Bedrooms from "../../public/svg-assets/Bedrooms";
import BathIcon from "../../public/svg-assets/BathIcon";
import Loading from "../loading";
import Beds from "../../public/svg-assets/Beds";
import GeuestIcon from "../../public/svg-assets/GeuestIcon";
import LocationIcon from "../../public/svg-assets/LocationIcon";
import DistarrowIcon from "../../public/svg-assets/DistarrowIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchListings, ListingParams } from "../all-listings/Listing";

// Props from server
export default function AllListingsPage({
  searchParams,
}: {
  searchParams: ListingParams;
}) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetchListings(searchParams),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading/>;
  if (isError) return <div className="p-10 text-center text-red-600">Error: {(error as Error).message}</div>;

  const { listings, total } = data || { listings: [], total: 0 };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and filter section */}
      <div className="mb-8">
        <SearchInput />
        <div className="flex flex-col w-full gap-4 md:items-center md:flex-row">
          <h1 className="text-2xl font-bold flex-grow">{total} Rentals</h1>
          <div className="flex items-center gap-3 justify-end w-full md:w-auto">
            <FilterButton />
            <SortSelect />
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-6">
        {listings.map((listing: any, index: number) => (
          <Link
            href={`all-listings/${listing.id}`}
            key={listing.id}
            className="rounded-xl transition-shadow hover:shadow-sm"
          >
            <div className="flex rounded-2xl p-0 my-6 border-gray-300 border-[1px] flex-col md:flex-row">
              {/* Desktop Images */}
              <div className="relative p-0 m-0 rounded-xl items-center hidden md:flex w-full md:w-2/5">
                <div className="relative h-full w-1/2">
                  <img
                    src={listing.images[1] || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    height={200}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-full w-1/2">
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    loading="eager"
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Mobile Carousel */}
              <div className={`relative md:hidden p-0 m-0 rounded-xl w-full`}>
                <Carousel className="w-full">
                  <CarouselContent>
                    {listing.images.map((src: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className="keen-slider__slide relative h-64 w-full">
                          <img
                            src={src || "/placeholder.svg"}
                            alt={listing.title}
                            width={400}
                            height={256}
                            sizes="100vw"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>

              {/* Listing Info */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{listing.title}</h2>
                    <FavoriteButton isFavorite={listing.isFavorite} />
                  </div>

                  <div className="mb-4 flex items-center space-x-2">
                    <div className="flex items-center gap-1 text-red-500">
                      <LocationIcon />
                      <span className="ml-1 text-sm">{listing.location}</span>
                    </div>
                    <span className="text-gray-400">
                      <DistarrowIcon />
                    </span>
                    <span className="text-sm text-gray-600">{listing.area}</span>
                  </div>

                  <div className="mb-4 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(listing.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium">{listing.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({listing.reviews} Reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Bedrooms />
                      <span className="text-sm">{listing.bedroom} Bedroom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Beds />
                      <span className="text-sm">{listing.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BathIcon />
                      <span className="text-sm">{listing.bath} Bath</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GeuestIcon />
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
                      <div className="text-sm text-gray-500">
                        Total (including fees and taxes)
                      </div>
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
        <Button
          variant="primary"
          className="flex items-center space-x-2 rounded-full bg-black px-6 py-3 text-white"
        >
          <span>Show more</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
