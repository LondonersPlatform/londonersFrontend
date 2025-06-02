"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  BathIcon,
  Check,
  Code,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessagesSquareIcon,
  Phone,
  Star,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import GeuestIcon from "@/public/svg-assets/GeuestIcon";
import Beds from "@/public/svg-assets/Beds";
import Bedrooms from "@/public/svg-assets/Bedrooms";

function ShareModalListing({
  shareModalOpen,
  setShareModalOpen,
  imagesDummy,
  title,
  rating,
  area,
  bedroom,
  beds,
  bath,
  guests,
}: any) {
  const [placeUrl, setplaceUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [iframeCode, setIframeCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      setplaceUrl(url);
      setIframeCode(
        `<iframe src="${url}" width="600" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>`
      );
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(placeUrl);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "place link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    toast({
      title: "Embed code copied",
      description: "The embed code has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () =>
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(placeUrl)}`,
      "_blank"
    );
  const shareOnFacebook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        placeUrl
      )}`,
      "_blank"
    );
  const shareOnLinkedIn = () =>
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        placeUrl
      )}`,
      "_blank"
    );
  const shareViaEmail = () =>
    window.open(`mailto:?body=${encodeURIComponent(placeUrl)}`, "_blank");
  const shareViaWhatsApp = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(placeUrl)}`,
      "_blank"
    );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this place",
          text: "I found this amazing place you might like!",
          url: placeUrl,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`sms:?body=${encodeURIComponent(placeUrl)}`, "_blank");
    }
  };

  return (
    <div>
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="sm:max-w-3xl  lg:px-12 overflow-y-auto lg:rounded-2xl py-12">
          <DialogHeader>
            <DialogTitle className=" text-2xl">Share this place</DialogTitle>
         
          </DialogHeader>

          {!showEmbedCode ? (
            <>
              <div className=" flex gap-3 items-center">
                <img
                  src={imagesDummy[0]}
                  className=" w-[60px] h-[60px] rounded-xl"
                />
                <div>
                  <h1 className="my-2 flex gap-2 items-center font-semibold">
                    {title}{" "}
                    <span className=" flex items-center  text-meduim gap-2">
                      <Star fill="#F3DC0D" color="#F3DC0D" />

                      {rating}
                    </span>
                  </h1>
                  <div className="mb-4 flex flex-wrap gap-2">
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
                  
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h4 className="text-sm font-medium mb-3">
                  Share on social media
                </h4>
                <div className="grid grid-cols-2 justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="shrink-0 items-center gap-2 text-sm w-full"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" fill="#0000" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Copy link
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={shareOnTwitter}
                  >
                    <Twitter className="h-5 w-5" />
                    Twitter
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={shareOnFacebook}
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                    <span className="sr-only">Share on Facebook</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={shareViaEmail}
                  >
                    <Mail className="h-5 w-5" />
                    Email
                    <span className="sr-only">Share via Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={() => setShowEmbedCode(true)}
                  >
                    <Code className="h-5 w-5" />
                    Embed
                    <span className="sr-only">Share as embed code</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={shareViaWhatsApp}
                  >
                    <Phone className="h-5 w-5" />
                    WhatsApp
                    <span className="sr-only">Share via WhatsApp</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg  items-center gap-2 text-sm w-full w-full"
                    onClick={handleShare}
                  >
                    <MessagesSquareIcon className="h-5 w-5" />
                    Messages
                    <span className="sr-only">Share via messages</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4  max-w-2xl overflow-x-hidden">
                <h4 className="text-sm font-medium mb-2">Embed Code</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Copy and paste this code to embed this place on your website
                </p>
                <div className="relative flex">
                  <pre className="p-3 bg-gray-100  rounded-md text-sm overflow-x-auto ">
                    {iframeCode}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-6 border-s-0 rouned-s-xl "
                    onClick={handleCopyEmbedCode}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
         <div>
                 <Button
                variant="outline"
                onClick={() => setShowEmbedCode(false)}
                className="mt-4  "
              >
                Back 
              </Button>
         </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareModalListing;
