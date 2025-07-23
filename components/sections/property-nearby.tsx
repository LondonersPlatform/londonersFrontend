"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bath, Heart, MapPin, Star, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription } from "../ui/card";
import BathIcon from "@/public/svg-assets/BathIcon";
import Bedrooms from "@/public/svg-assets/Bedrooms";
import { addFavorite, getNearbyListingsById } from "@/app/all-listings/Listing";
import { FavoriteButton } from "../listings/listing-client-components";

interface PropertyDetails {
  beds: number;
  baths: number;
  kitchens?: number;
}

interface NearbyProperty {
  id: string;
  imageUrl: string;
  title: string;
  rating: string | number;
  reviewCount?: number;
  details: PropertyDetails;
  area?: string;
  price: number;
  guests: number;
}

interface PropertyNearbyProps {
  title?: string;
  properties?:any
  onFavoriteClick?:any,
  loading?:boolean,
  listingId?: string;
}

export function NearbyPropertySkeleton() {
  return (
    <CarouselItem className="md:basis-1/2 py-12 lg:basis-1/4">
      <div className="rounded-xl transition-shadow shadow-lg border-none bg-white h-full flex flex-col animate-pulse">
        {/* Image Placeholder */}
        <div className="relative aspect-3/4 h-[200px] w-full bg-gray-200 rounded-t-2xl" />

        {/* Content Placeholder */}
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-6" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>

          <div className="pt-3 border-t mt-3 flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </CardContent>
      </div>
    </CarouselItem>
  );
}


export function PropertyNearby({
  title = "Nearby Apartments",

  loading,
  onFavoriteClick,
  properties,
}: PropertyNearbyProps) {
  


  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <h3 className="text font-medium">Sub next similar listing</h3>

      {loading ? (
      <Carousel className="w-full">
    <CarouselContent>
      {Array.from({ length: 4 }).map((_, i) => (
        <NearbyPropertySkeleton key={i} />
      ))}
    </CarouselContent>
  </Carousel>

  
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {properties.map((property:any) => (
              <CarouselItem
                key={property.id}
                className="md:basis-1/2 py-12 lg:basis-1/4"
              >
                <Link
                  href={`/all-listings/${property.id}?area=${encodeURIComponent(
                    property.area || ""
                  )}`}
                  className="rounded-xl transition-shadow hover:shadow-sm"
                >
                  <Card className="h-full flex flex-col shadow-lg border-none  rounded-2xl overflow-hidden bg-white">
                    {/* Image Section */}
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-2xl">
                      <Image
                        src={property.imageUrl}
                        alt={property.title}
                        width={300}
                        height={100}
                        className="w-full h-full object-cover transition-transform duration-300 scale-105"
                      />
                      <button
                        type="button"
                        onClick={(e) => onFavoriteClick(e, property.id)}
                        className="absolute top-3 right-3  bg-white scale-90 rounded-full flex items-center justify-center p-1   shadow-md z-10"
                      >

                      
                    <FavoriteButton
                                           isFavorite={property.isFavorite}
                                           listingId={property.id}
                                         />
                      </button>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg hover:underline font-bold text-gray-900">
                          {property.title}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-700">
                            {property.rating == "no rating available" && 0}
                          </span>
                        </div>
                      </div>

                      <CardDescription className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {property.area}
                      </CardDescription>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mt-2">
                        <span className="flex items-center gap-2">
                          <Bedrooms className="w-4 h-4" />
                          {property.details.beds}{" "}
                          {property.details.beds === 1 ? "Bed" : "Beds"}
                        </span>
                        <span className="flex items-center gap-2">
                          <BathIcon className="w-4 h-4" />
                          {property.details.baths}{" "}
                          {property.details.baths === 1 ? "Bath" : "Baths"}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {property.guests}{" "}
                          {property.guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>

                      <div className="pt-3 border-t text-sm text-gray-800 flex justify-between items-center">
                        <span className="font-semibold">
                          £{property.price}/night
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
