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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Gallery from "../ui/Gallery";

export function PropertyCarousel({imagesDummy}:any) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const propertyUrl = "https://example.com/property/marlybone-book";
// Using the same Unsplash imagesDummy from the original component


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
   
     <Gallery imagesDummy={imagesDummy}/>
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
