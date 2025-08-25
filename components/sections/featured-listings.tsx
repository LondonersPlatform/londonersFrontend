"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowBigLeft, ArrowLeft, ArrowRight, ArrowRightIcon, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import { addFavorite, checkFavorite, deleteFavorite, fetchListings } from "@/app/all-listings/Listing";
import SkeletonCard from "../ui/SkeletonCard";
import { useEffect, useState } from "react";
import { useLoginModal } from "@/context/login-modal-context";
import { FavoriteButton } from "../listings/listing-client-components";
import { useRouter } from "next/navigation";
import Arrowright from "@/public/svg-assets/arrowright";
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
  const [page] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-listings", page],
    queryFn: () => fetchListings({}, page, 8),
  });

  const listings = data?.listings || [];
  const total = data?.total || 0;
 const { setRedirectPath, setLoginOpen } = useLoginModal();
 

  const handleFavoriteClick = async (
  e: React.MouseEvent,
  listingId: string
) => {
  e.preventDefault();
  e.stopPropagation();

  const accessToken = localStorage.getItem("access_token");
  const guestyId = localStorage.getItem("GuestyId");

  if (!accessToken || !guestyId) {
    setRedirectPath("/all-listings");
    setLoginOpen(true);
    return;
  }

  const isFavorited = favorites.includes(listingId);
  const newFavoriteState = !isFavorited;
  setFavorites((prev) =>
    newFavoriteState ? [...prev, listingId] : prev.filter((id) => id !== listingId)
  );

  try {
    if (newFavoriteState) {
      await addFavorite({
        guestyUserId: guestyId,
        listingId,
      });
    } else {
      await deleteFavorite({
        guesty_user_id: guestyId,
        listingId,
      });
    }
  } catch (error: any) {
    console.error("Failed to update favorite:", error.message);
    // rollback UI change
    setFavorites((prev) =>
      isFavorited ? [...prev, listingId] : prev.filter((id) => id !== listingId)
    );
  }
};

useEffect(() => {
  const fetchFavoritesStatus = async () => {
    const token = localStorage.getItem("access_token");
    const guestyId = localStorage.getItem("GuestyId");
    if (!token || !guestyId) return;

    const favoriteIds: string[] = [];

    await Promise.all(
      listings.map(async (listing: Listing) => {
        try {
          const res = await checkFavorite(guestyId, listing.id);
          if (res.isFavorite) {
            favoriteIds.push(listing.id);
          }
        } catch (err) {
          console.error(`Failed to check favorite for ${listing.id}`, err);
        }
      })
    );

    setFavorites(favoriteIds);
  };

  if (listings.length > 0) {
    fetchFavoritesStatus();
  }
}, [listings]);


  if (isError) {
    return (
      <section className="md:w-[85%]  w-[96%] mx-auto py-12 px-4 md:px-6">
        <div className="text-center text-red-500">
          Failed to load featured listings
        </div>
      </section>
    );
  }

  return (
    <section className="md:w-[85%]  w-[96%] mx-auto py-12 px-4 md:px-6">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold">Featured listings</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <div className="flex justify-end py-3 space-x-2">
            <CarouselPrevious className="static translate-y-0 mr-2" />
            <CarouselNext className="static translate-y-0" />
          </div>

          <CarouselContent className="-ml-4">
            {listings.map((item: any) => (
           <CarouselItem
  key={item.id}
  className="pl-4 md:basis-1/2 my-3  lg:basis-1/4 flex"
>
  <div
 onClick={()=> {
    router.push(
      `/all-listings/${item.id}?area=${encodeURIComponent(item.area)}&rating=${item.rating}&bedroom=${item.bedroom}&bath=${item.bath}&beds=${item.beds}&guests=${item.guests}&title=${encodeURIComponent(item.title)}`
    );
  }}
    className="w-full flex flex-col cursor-pointer h-full rounded-3xl transition-shadow   pb-3 border shadow-sm"
  >
   <div
  className=" flex rounded-3xl  flex-col h-full"
  style={{
  
    borderStyle: "solid",
    borderColor: "#D9D9D9",
    boxShadow: "0px 0px 22px 0px #F5F5F5",
  }}
>
      <CardImage className="relative w-full h-[200px]">
        <Image
          src={item.images?.[0] ?? "/placeholder.svg"}
          alt={item.title}
          fill
          className="transition-transform rounded-3xl duration-300 group-hover:scale-105 object-cover rounded-t-xl"
        />
   <div
  className="absolute right-3 top-3 rounded-full bg-white p-0.5 scale-90 flex items-center justify-center transition-colors"
  onClick={(e) => e.stopPropagation()}
>
  <FavoriteButton
    listingId={item.id}
    isFavorite={item.isFavorite}
  />
</div>

      </CardImage>

      <CardContent className="flex flex-col justify-between flex-grow p-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <CardTitle className="text-lg hover:underline font-bold">{item.title}</CardTitle>
            <div className="flex items-center">
              <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
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
              <Bedrooms /> {item.bedroom} Bedroom
            </span>
            <span className="inline-flex items-center gap-3 text-xs">
              <BathIcon /> {item.bath} Bath
            </span>
            <span className="inline-flex items-center gap-3 text-xs">
              <Beds /> {item.beds} Beds
            </span>
            <span className="inline-flex items-center gap-3 text-xs">
              <GeuestIcon /> {item.guests} Guests
            </span>
          </div>
        </div>

        {/* <p className="mt-4 flex flex-col gap-2 text-xs text-gray-400">
          Price per night
          <span className="text-[14px] font-bold text-black">£ {item?.pricePerNight} /night</span>
        </p> */}
      </CardContent>
    </div>
  </div>
</CarouselItem>

            ))}
          </CarouselContent>
        </Carousel>
      )}

      <div className="flex justify-end">
        <Link
          href="/all-listings"
          className="flex border rounded-3xl  hover:bg-[#F5F5F5] px-6 h-10 border-[#D9D9D9] items-center text-sm font-medium"
        >
          See all
         <Arrowright />
        </Link>
      </div>
    </section>
  );
}
