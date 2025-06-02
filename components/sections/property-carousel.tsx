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

export function PropertyCarousel({ imagesDummy }: any) {
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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This property has been removed from your favorites"
        : "This property has been added to your favorites",
    });
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
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
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
