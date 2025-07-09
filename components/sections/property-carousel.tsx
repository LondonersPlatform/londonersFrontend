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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import Gallery from "../ui/Gallery";
import ShareModalListing from "../listings/ShareModalListing";
import { addFavorite, deleteFavorite } from "@/app/all-listings/Listing";
import { useLoginModal } from "@/context/login-modal-context";

export function PropertyCarousel({ imagesDummy, listingId }: any) {
  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    const router = useRouter();
  

  return (
    <div className="space-y-4 relative">
      {/* Title and Buttons (Desktop) */}
      <div className="hidden md:flex items-center justify-between ">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>{title}</span>
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setShareModalOpen(true)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={(e) => handleFavoriteClick(e, listingId as string)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-600 text-red-700" : ""
              }`}
            />
          </Button>
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
      <div className=" py-2 bg-white rounded-t-2xl w-full h-4 bottom-[0px] absolute">

      </div>
    </div>
  );
}
