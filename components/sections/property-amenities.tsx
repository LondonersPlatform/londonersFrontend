import {
  Wifi,
  Tv,
  AirVent,
  Utensils,
  ParkingMeterIcon as Parking,
  Snowflake,
  Coffee,
  Dumbbell,
  Waves,
  ShowerHead,
  Home,
  FireExtinguisher,
  Sprout,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Assuming you use Radix or shadcn/ui
import { useState } from "react";
import { ResponsiveModal } from "../ui/ResponsiveModal";

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Tv,
  AirVent,
  Utensils,
  Parking,
  Snowflake,
  Coffee,
  Dumbbell,
  Waves,
  ShowerHead,
  Home,
  FireExtinguisher,
  Sprout,
};

const getIconByAmenity = (amenity: any): React.ElementType => {
  if (amenity.name && iconMap[amenity.name]) return iconMap[amenity.name];

  const name = amenity.name.toLowerCase();
  if (name.includes("tv")) return Tv;
  if (name.includes("wifi")) return Wifi;
  if (name.includes("air")) return AirVent;
  if (name.includes("coffee")) return Coffee;
  if (name.includes("gym") || name.includes("fitness")) return Dumbbell;
  if (name.includes("parking")) return Parking;
  if (name.includes("shower")) return ShowerHead;
  if (name.includes("food") || name.includes("restaurant")) return Utensils;

  return HelpCircle;
};

export function PropertyAmenities({ amenityData }: any) {
  const [open, setOpen] = useState(false);
  const visibleAmenities = amenityData.slice(0, 7);
  const hasMore = amenityData.length > 7;

  const renderAmenity = (amenity: any, index: number) => {
    const Icon = getIconByAmenity(amenity);
    return (
      <div key={index} className="flex items-center gap-3">
        <span className="bg-[#F5F5F5] px-4 py-1 flex items-start gap-2 rounded-2xl">
          <Icon className="w-5 h-5 text-primary" />
          {amenity.name}
        </span>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {visibleAmenities.map(renderAmenity)}
      </div>

      {hasMore && (
   <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title="All Amenities"
      trigger={
        <Button variant="outline" className="rounded-full">
          Show more
        </Button>
      }
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 max-h-[400px] overflow-y-auto">
        {amenityData.map(renderAmenity)}
      </div>
    </ResponsiveModal>
      )}
    </div>
  );
}
