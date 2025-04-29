import { Wifi, Tv, AirVent, Utensils, ParkingMeterIcon as Parking, Snowflake } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PropertyAmenities() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Wifi className="h-5 w-5" />
          <span>Wifi</span>
        </div>
        <div className="flex items-center gap-3">
          <AirVent className="h-5 w-5" />
          <span>Air conditioning</span>
        </div>
        <div className="flex items-center gap-3">
          <Tv className="h-5 w-5" />
          <span>TV</span>
        </div>
        <div className="flex items-center gap-3">
          <Utensils className="h-5 w-5" />
          <span>Kitchen</span>
        </div>
        <div className="flex items-center gap-3">
          <Parking className="h-5 w-5" />
          <span>Free parking</span>
        </div>
        <div className="flex items-center gap-3">
          <Snowflake className="h-5 w-5" />
          <span>Washer/Dryer</span>
        </div>
      </div>

      <Button variant="outline" className="rounded-full">
        Show more
      </Button>
    </div>
  )
}

