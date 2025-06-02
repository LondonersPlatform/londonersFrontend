import { Star, Wifi, Tv, AirVent, MapPin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Tv,
  AirVent,
};

export function PropertyOverview({ dummyPropertyData ,stars }: any) {
   const paragraph = dummyPropertyData.description[0];
  const bulletPoints = dummyPropertyData.description[1]
    .split("\n")
    .filter((item:any) => item.trim() !== "");
  return (
    <div className="space-y-6 mb-8">
      {/* Rating and Location */}
<h1 className=" font-bold text-2xl">Overview</h1>

      {/* Description */}
          <div className="text-gray-700">
      <p className="mb-4 flex flex-col gap-3">
        {paragraph}
        <span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full w-auto">
                Show more
              </Button>
            </DialogTrigger>
            <DialogContent className=" overflow-y-scroll max-h-[95vh]    max-w-4xl">
              <DialogHeader>
                <DialogTitle className="mb-12">Overview</DialogTitle>
                <DialogDescription>
                  {paragraph}
                </DialogDescription>
              </DialogHeader>

              <div className=" space-y-2">
                <h1 className=" font-bold">Key Features:</h1>
                <ul className=" list-inside space-y-1">
                  {bulletPoints.map((item:any, index:number) => (
                    
                    <li key={index}>
                            <span className="text-lg me-4 leading-6">-</span>
                      {item.replace(/^✔️\s?/, "")}</li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </span>
      </p>
    </div>

      {/* Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b py-6">
        {dummyPropertyData.amenities.map((amenity: any, index: number) => {
          const IconComponent = iconMap[amenity.icon] || Wifi; // Default to Wifi if unknown
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{amenity.name}</h3>
                <p className="text-sm text-gray-500">{amenity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
