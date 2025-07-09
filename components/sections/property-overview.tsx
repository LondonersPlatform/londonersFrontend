import { Star, Wifi, Tv, AirVent, MapPin, BathIcon, Dot } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
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

export function PropertyOverview({ dummyPropertyData ,stars }: any) {
  const [open, setOpen] = useState(false)
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
    .filter((item:any) => item.trim() !== "");
  return (
    <div className=" relative">
      {/* Rating and Location */}
        
       <div className="mb-4  lg:items-start       items-center flex flex-col gap-2 ">
        <h1 className="text-2xl md:hidden font-bold flex items-center gap-2">
          <span className=" text-center">{title}</span>
        </h1>
            <h2 className="text-[#000] font-bold">{area}</h2>

           <div className="flex-grow font-normal  flex flex-wrap ">
 <div className="flex items-center ">
           
              <span className="text-sm flex items-center">{bedroom} Bedroom   </span>
           
            </div>
            <div className="flex items-center">
            
              <span className="text-sm flex"> <Dot/>{beds} Beds  </span>
            </div>
            <div className="flex items-center gap-2">
            
              <span className="text-sm flex"> <Dot/>{bath} Bath   </span>
            </div>
            <div className="flex items-center gap-2">
              
              <span className="text-sm flex"><Dot/> {guests} Guests   </span>
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
