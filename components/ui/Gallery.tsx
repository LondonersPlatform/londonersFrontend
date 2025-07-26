"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getVideoByListingId } from "@/app/all-listings/Listing";

interface ImageGalleryProps {
  imagesDummy: string[];
}

export default function ImageGallery({ imagesDummy }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [api, setApi] = useState<any>(null);
  const [mediaList, setMediaList] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { toast } = useToast();
  const router = useRouter();
  const { id } = useParams();
  const listingId = id;

  const goToNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const goToPrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const goToSlide = useCallback((index: number) => {
    if (api) api.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    async function fetchVideoAndCombine() {
      const videoUrl = await getVideoByListingId(String(listingId));
      if (videoUrl) {
        setMediaList([videoUrl, ...imagesDummy]);
      } else {
        setMediaList(imagesDummy);
      }
    }
    fetchVideoAndCombine();
  }, [listingId, imagesDummy]);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const expandFullscreen = () => {
    if (!videoRef.current) return;
    videoRef.current.requestFullscreen?.();
  };

  return (
    <div
      id="gallery-container"
      className={`w-full relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}
    >
      <div className="relative w-full rounded-2xl">
        <Carousel
          setApi={setApi}
          className="w-full overflow-hidden"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent>
            {mediaList.map((media, index) => (
              <CarouselItem key={index} className="overflow-hidden relative">
                <div
                  className="w-full h-[300px] md:h-[500px] relative rounded-xl"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      router.push(`/PhotoTour?listingId=${listingId}`);
                    }
                  }}
                >
                  {media.endsWith(".mp4") || media.includes("video") ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={index === 0 ? videoRef : undefined}
                        src={media}
                        className="object-cover w-full h-full rounded-xl"
                
                      />
                      {/* Dim overlay */}
                      <div className="absolute inset-0 bg-black/20 rounded-xl" />
                      {/* Play/Pause toggle */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlay();
                        }}
                        className="absolute inset-0 m-auto hover:text-white w-14 h-14 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center rounded-full z-20"
                        variant="ghost"
                      >
                        {isVideoPlaying ? <Pause size={28} /> : <Play size={28} />}
                      </Button>
                      {/* Expand */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          expandFullscreen();
                        }}
                        className="absolute lg:block none hover:text-white top-3 left-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
                        size="icon"
                        variant="ghost"
                      >
                        <Expand size={20} />
                      </Button>
                    </div>
                  ) : (
                    <Image
                      src={media}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover lg:rounded-xl"
                      sizes="(min-width: 768px) 100vw, 100vw"
                      priority={index === 0}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <Button
            onClick={goToPrevious}
            className="absolute md:block hidden left-4 bg-gray-900 hover:bg-gray-900 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10"
            size="icon"
            variant="ghost"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white" />
          </Button>
          <Button
            onClick={goToNext}
            className="absolute md:block hidden right-6 bg-gray-900 hover:bg-black/50 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10"
            size="icon"
            variant="ghost"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white" />
          </Button>
        </Carousel>

        {/* Counter */}
        <div className="absolute bottom-6 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {mediaList.length}
        </div>
      </div>

{/* Thumbnails in one scrollable row */}
<div className="hidden lg:flex w-full overflow-x-auto gap-4 px-0 py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
  {mediaList.slice(0, 6).map((media, index) => (
    <div
      key={index}
      className={`flex-1 h-[120px] relative cursor-pointer transition-all duration-300 transform ${
        index === currentIndex
          ? "border-2 border-primary rounded-lg"
          : "border border-transparent opacity-70 hover:opacity-100"
      }`}
      onClick={() => goToSlide(index)}
    >
      {media.endsWith(".mp4") || media.includes("video") ? (
        <video
          src={media}
          className="object-cover w-full h-full rounded-md"
        />
      ) : (
        <Image
          src={media}
          alt={`Thumbnail ${index + 1}`}
          fill
          className="object-cover rounded-md"
        />
      )}

      {/* Last thumbnail button */}
      {index === 6 - 1 && (
        <div className="absolute bottom-2 left-2 bg-black/60 flex items-end justify-end rounded-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/PhotoTour?listingId=${listingId}`);
            }}
            className="text-black flex items-center border border-black max-w-[260px] gap-2 py-2 bg-slate-50 text-sm px-4 rounded"
          >
            <Image src="/show1.svg" width={18} height={18} alt="icon" />
            Show all photos
          </button>
        </div>
      )}
    </div>
  ))}
</div>


    </div>
  );
}
