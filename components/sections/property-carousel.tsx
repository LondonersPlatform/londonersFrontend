"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Share2,
  Play,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Star,
  ChevronLeft,
  Dot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import Gallery from "../ui/Gallery";
import ShareModalListing from "../listings/ShareModalListing";
import { addFavorite, deleteFavorite } from "@/app/all-listings/Listing";
import { useLoginModal } from "@/context/login-modal-context";
import { FavoriteButton } from "../listings/listing-client-components";

export function PropertyCarousel({ imagesDummy, listingId, isFavorite }: any) {
  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const area = searchParams.get("area");
  const title = searchParams.get("title");
  const rating = searchParams.get("rating");
  const bedroom = searchParams.get("bedroom");
  const bath = searchParams.get("bath");
  const beds = searchParams.get("beds");
  const guests = searchParams.get("guests");

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

    const newFavoriteState = !isFavorite;

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
    }
  };
  const router = useRouter();

  return (
    <div className="space-y-4 relative">
      {/* Title and Buttons (Desktop) */}
      <div className="hidden md:flex items-start justify-between ">
        <div className="  lg:items-start      md:flex hidden     flex-col gap-2 ">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className=" Title_list text-4xl">{title}</span>
          </h1>

          <h1 className="text-2xl md:hidden font-bold flex items-center gap-2">
            <span className=" text-center Title_list">{title}</span>
          </h1>

          <div className=" flex flex-col items-start gap-2">
            <h2 className="text-[#0000008C] font-bold">{area} </h2>

            <div className="flex-grow font-normal gap-3  flex flex-wrap ">
              <div className="flex items-center gap-2">
                <img src="/bedroom.svg" alt="Bedroom" className="mr-1" />
                <span className="text-sm flex items-center">
                  {bedroom} Bedroom{" "}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/bed.svg" alt="Beds" className="mr-1" />
                <span className="text-sm flex"> {beds} Beds </span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bath.svg" alt="Bath" className="mr-1" />
                <span className="text-sm flex"> {bath} Bath </span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/Geust.svg" alt="guest" className="mr-1" />
                <span className="text-sm flex">{guests} Guests </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setShareModalOpen(true)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <div
            onClick={(e) => handleFavoriteClick(e, listingId as string)}
            className="inline-flex items-center justify-center rounded-full border border-input bg-background p-1 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <FavoriteButton isFavorite={isFavorite} listingId={listingId} />
          </div>
        </div>
      </div>

      {/* Gallery + Buttons (Mobile) */}
      <div className="relative">
        {/* Absolute buttons on mobile */}
        <div className="absolute top-1 right-1 z-10 flex items-center space-x-2   p-2  md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/75 backdrop-blur-sm "
            onClick={() => setShareModalOpen(true)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/75 backdrop-blur"
            onClick={(e) => handleFavoriteClick(e, listingId as string)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-600 text-red-700" : ""
              }`}
            />
          </Button>
        </div>
        <div className="absolute top-1 left-1 z-10 flex items-center space-x-2   p-2  md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/75 backdrop-blur-sm "
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <Gallery imagesDummy={imagesDummy} />
      </div>

      {/* Share Modal */}
      <ShareModalListing
        shareModalOpen={shareModalOpen}
        setShareModalOpen={setShareModalOpen}
        imagesDummy={imagesDummy}
        title={title}
        area={area}
        beds={area}
        bedroom={bedroom}
        bath={bath}
        rating={rating}
      />
      <div className=" py-2 bg-white rounded-t-2xl w-full h-4 bottom-[0px] absolute"></div>
    </div>
  );
}
