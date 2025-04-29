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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function PropertyCarousel() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const propertyUrl = "https://example.com/property/marlybone-book";

  // Travel destinations for the carousel
  const travelDestinations = [
    "Bali Beach Resort",
    "Swiss Alps Chalet",
    "Santorini Villa",
    "Kyoto Garden Retreat",
    "Maldives Overwater Bungalow",
  ];

  // Travel destinations for thumbnails
  const thumbnailDestinations = [
    "Beach View",
    "Mountain View",
    "Pool Area",
    "Restaurant",
    "Bedroom Suite",
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(propertyUrl);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Property link has been copied to clipboard",
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marlybone Travel Lodge</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShareModalOpen(true)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className={isFavorite ? "text-rose-500" : ""}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {travelDestinations.map((destination, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={`/${index + 1}dt.png`}
                    alt={`${destination} image`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />

          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full"
          >
            <Play className="h-4 w-4" />
            <span>Watch tour video</span>
          </Button>
        </Carousel>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2">
          {thumbnailDestinations.map((thumbnail, index) => (
            <div
              key={index}
              className="relative min-w-[120px] h-[80px] rounded-lg overflow-hidden border"
            >
              <Image
                src={`/${index + 1}dt.png`}
                alt={`${thumbnail}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this property</DialogTitle>
            <DialogDescription>
              Share this travel destination with your friends and family
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <Input value={propertyUrl} readOnly className="flex-1" />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Share on social media</h4>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Share via Email</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
