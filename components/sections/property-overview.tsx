import { Wifi, Tv, AirVent, MapPin, BathIcon, Dot } from "lucide-react";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react"; // Adjust if you're using different icons

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Bedrooms from "@/public/svg-assets/Bedrooms";
import Beds from "@/public/svg-assets/Beds";
import GeuestIcon from "@/public/svg-assets/GeuestIcon";
import { useSearchParams } from "next/navigation";
import { ResponsiveModal } from "../ui/ResponsiveModal";

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Tv,
  AirVent,
};

export function PropertyOverview({ dummyPropertyData, stars, reviews }: any) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams(); // for query params
  const area = searchParams.get("area");
  const title = searchParams.get("title");
  const rating = searchParams.get("rating");
  const bedroom = searchParams.get("bedroom");
  const bath = searchParams.get("bath");
  const beds = searchParams.get("beds");
  const guests = searchParams.get("guests");

  const paragraph = dummyPropertyData.description[0];
  const bulletPoints = dummyPropertyData.description[1]
    .split("\n")
    .filter((item: any) => item.trim() !== "");
  return (
    <div className=" relative">
      {/* Rating and Location */}

      <div className="mb-4  lg:items-start      lg:hidden   items-center flex flex-col gap-2 ">
        <h1 className="text-2xl md:hidden font-bold flex items-center gap-2">
          <span className=" text-center">{title}</span>
        </h1>
        <h2 className="text-[#000] font-bold">{area}</h2>

        <div className="flex-grow font-normal  flex flex-wrap ">
          <div className="flex items-center ">
            <span className="text-sm flex items-center">
              {bedroom} Bedroom{" "}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm flex">
              {" "}
              <Dot />
              {beds} Beds{" "}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm flex">
              {" "}
              <Dot />
              {bath} Bath{" "}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm flex">
              <Dot /> {guests} Guests{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full  ">
        <div className="bg-white border border-[#D9D9D9] shadow-lg rounded-2xl p-4 py-0">
          <div className=" grid md:grid-cols-3 grid-cols-1 justify-center items-center">
            {/* Left side with award icons and text */}
            <div className="flex flex-col justify-center items-center ">
              <Image
                src="/star1.svg"
                alt="Award trophy"
                width={45}
                height={60}
                className="object-contain"
              />
              <div className="text-center">
                <div className="font-semibold text-lg text-gray-900">Guest  favourite</div>
        
              </div>
              <Image
                 src="/start2.svg"
                alt="Award trophy"
                width={45}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Center text */}
            <div className="flex-1  px-4">
              <p className="text-gray-700 text-center text-sm">
                One of the most loved home on Londoners according to guests
              </p>
            </div>

            {/* Right side with rating and reviews */}
            <div className="text-right flex justify-center items-center gap-">
              <div className=" border-e p-4 justify-center  border-e-1 ">
                <div className="text-2xl font-bold text-center text-gray-900 mb-1">
                  {reviews?.data?.statistics?.overall_average_rating?.toFixed(
                    1
                  )}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating =
                      reviews?.data?.statistics?.overall_average_rating || 0;

                    let fillClass = "fill-gray-300 text-gray-300"; // empty star

                    if (star <= Math.floor(rating)) {
                      fillClass = "fill-black text-black"; // full star
                    } else if (star - rating < 1) {
                      fillClass = "fill-[url(#half)] text-black"; // half star
                    }

                    return (
                      <Star key={star} className={`w-4 h-4 ${fillClass}`} />
                    );
                  })}
                  {/* Add a linearGradient for half-star fill */}
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="half"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="50%" stopColor="black" />
                        <stop offset="50%" stopColor="lightgray" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900 mx-4">
                {reviews?.data?.statistics?.total_reviews}
              </div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="grid grid-rows-1 md:grid-rows-3 gap-6 border-t  py-6">
        {dummyPropertyData.amenities.map((amenity: any, index: number) => {
          const IconComponent = iconMap[amenity.icon] || Wifi; // Default to Wifi if unknown
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">{amenity.name}</h3>
                <p className="text-sm text-gray-900">{amenity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className=" font-bold text-2xl py-3">Overview</h1>

      {/* Description */}
      <div className="text-gray-700">
        <p className="mb-4 flex flex-col gap-3">
          {paragraph}
          <span>
            <ResponsiveModal
              open={open}
              onOpenChange={setOpen}
              title="Overview"
              trigger={
                <Button variant="outline" className="rounded-full w-auto">
                  Show more
                </Button>
              }
              className="overflow-y-scroll max-h-[95vh] max-w-4xl"
            >
              <DialogDescription className="mb-12">
                {paragraph}
              </DialogDescription>

              <div className="space-y-2">
                <h1 className="font-bold">Key Features:</h1>
                <ul className="list-inside space-y-1">
                  {bulletPoints.map((item: any, index: number) => (
                    <li key={index}>
                      <span className="text-lg me-4 leading-6">-</span>
                      {item.replace(/^✔️\s?/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            </ResponsiveModal>
          </span>
        </p>
      </div>
    </div>
  );
}
