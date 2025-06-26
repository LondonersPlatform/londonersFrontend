"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface ImageGalleryProps {
  imagesDummy: string[];
}

export default function ImageGallery({ imagesDummy }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [api, setApi] = useState<any>(null);
  const { toast } = useToast();

  const goToNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const goToPrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const goToSlide = useCallback(
    (index: number) => {
      if (api) api.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const router = useRouter();
  const { id } = useParams();
  const listingId = id;

  return (
    <div
      id="gallery-container"
      className={`w-full relative ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
      }`}
    >
      {/* Main Carousel */}
      <div className="relative w-full rounded-2xl">
        <Carousel
          setApi={setApi}
          className="w-full overflow-hidden"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {imagesDummy.map((image, index) => (
              <CarouselItem key={index} className="overflow-hidden relative">
                <div className="w-full h-[300px] md:h-[500px] relative rounded-xl">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(min-width: 768px) 100vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                     <div className="absolute bottom-2 right-2 md:hidden bg-black bg-opacity-50 flex items-end justify-end rounded-md">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/PhotoTour?listingId=${listingId}`);
                  }}
                  className="text-black flex items-center gap-2 py-2 bg-slate-50 text-sm px-4 rounded"
                >
                  <Image src="/show1.svg" width={18} height={18} alt="icon" />
                  Show all photos
                </button>
              </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <Button
            onClick={goToPrevious}
            className="absolute left-4 bg-gray-900 hover:bg-gray-900 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-10"
            size="icon"
            variant="ghost"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white h-8 w-8" />
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-4 bg-gray-900 hover:bg-black/50 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-10"
            size="icon"
            variant="ghost"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white h-8 w-8" />
          </Button>
        </Carousel>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {imagesDummy.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="md:grid hidden flex-1 lg:grid-cols-6  overflow-x-auto w-full gap-4 p-4">
        {imagesDummy.slice(0, 100).map((image, index) => (
          <div
            key={index}
            className={`w-full h-[120px]  aspect-square relative cursor-pointer transition-all duration-300 transform ${
              index === currentIndex
                ? "border-[2px] border-primary rounded-lg"
                : "border border-transparent opacity-70 hover:opacity-100"
            }`}
            onClick={() => goToSlide(index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />

            {/* Show More */}
            {index === (imagesDummy.length)-1    && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 flex items-end justify-end rounded-md">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/PhotoTour?listingId=${listingId}`);
                  }}
                  className="text-black flex items-center border-1 border-black max-w-[260px] gap-2 py-2 bg-slate-50 text-sm px-4 rounded"
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
