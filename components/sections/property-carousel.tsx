"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Gallery from "../ui/Gallery";
import { useSearchParams } from "next/navigation";
import Bedrooms from "@/public/svg-assets/Bedrooms";
import Beds from "@/public/svg-assets/Beds";
import BathIcon from "@/public/svg-assets/BathIcon";
import GeuestIcon from "@/public/svg-assets/GeuestIcon";
import ShareModalListing from "../listings/ShareModalListing";
import { addFavorite, deleteFavorite } from "@/app/all-listings/Listing";
import { useLoginModal } from "@/context/login-modal-context";

export function PropertyCarousel({ imagesDummy ,listingId }: any) {
  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const searchParams = useSearchParams(); // for query params
  const area = searchParams.get("area");
  const title = searchParams.get("title");
  const rating = searchParams.get("rating");
  const bedroom = searchParams.get("bedroom");
  const bath = searchParams.get("bath");
  const beds = searchParams.get("beds");
  const guests = searchParams.get("guests");



  const propertyUrl = "https://example.com/property/marlybone-book";
  // Using the same Unsplash imagesDummy from the original component

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
  setIsFavorite(newFavoriteState);

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
    setIsFavorite(!newFavoriteState); // rollback
  }
};




  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <div className=" flex flex-col gap-6">
          <h1 className="text-2xl flex items-center gap-3 font-bold">
            {title}
            <span className=" flex items-center  text-meduim gap-2">
              <Star fill="#F3DC0D" color="#F3DC0D" />

              {rating}
            </span>
          </h1>
          <div className="mb-4 flex flex-wrap gap-4">
            <h2 className="text-[#0000008C]">{area}</h2>

            <div className="flex items-center gap-2">
              <Bedrooms />
              <span className="text-sm">{bedroom} Bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Beds />
              <span className="text-sm">{beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <BathIcon />
              <span className="text-sm">{bath} Bath</span>
            </div>
            <div className="flex items-center gap-2">
              <GeuestIcon />
              <span className="text-sm">{guests} Guests</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className=" rounded-full"
            onClick={() => setShareModalOpen(true)}
          >
            <Share2 className="h-5 w-5 " />
          </Button>
          <Button
            variant="outline"
            className=" rounded-full"
            size="icon"
        onClick={(e) => handleFavoriteClick(e, listingId as string)}

          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-600 text-red-700" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Gallery imagesDummy={imagesDummy} />
      </div>

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
    </div>
  );
}
