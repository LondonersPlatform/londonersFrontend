import { Wifi, Tv, AirVent, Utensils, ParkingMeterIcon as Parking, Snowflake, Coffee, Dumbbell, Waves, ShowerHead, Home, FireExtinguisher, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
// Create a mapping object
const iconComponents:any = {
  Wifi: Wifi,
  Tv: Tv,
  AirVent: AirVent,
  Utensils: Utensils,
  Parking: Parking,
  Snowflake: Snowflake,
  Coffee: Coffee,
  Dumbbell: Dumbbell,
  Waves: Waves,
  ShowerHead: ShowerHead,
  Home: Home,
  FireExtinguisher: FireExtinguisher,
  Sprout: Sprout
};

// Utility function to get random amenities
const getRandomAmenities = (amenityData:any) => {
  const shuffled = [...amenityData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 3); // 3-7 amenities
};

export function PropertyAmenities({amenityData}:any) {
  const randomAmenities = getRandomAmenities(amenityData);
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {randomAmenities.map((amenity, index) => {
        const IconComponent = iconComponents[amenity.icon];
          return (
            <div key={index} className="flex items-center gap-3">
              <IconComponent className="h-5 w-5" />
              <span>{amenity.name}</span>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="rounded-full">
        Show more
      </Button>
    </div>
  );
}