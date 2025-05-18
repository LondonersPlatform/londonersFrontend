import { Star, Wifi, Tv, AirVent, MapPin } from "lucide-react";


export function PropertyOverview({dummyPropertyData}:any) {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium ml-1">{dummyPropertyData.rating}</span>
        </div>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">{dummyPropertyData.reviewCount} reviews</span>
        <span className="text-gray-500">•</span>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500">{dummyPropertyData.location}</span>
        </div>
      </div>

      <div className="text-gray-700">
        {dummyPropertyData.description.map((paragraph:any, index:number) => (
          <p key={index} className={index === 0 ? "mb-4" : ""}>
            {paragraph}
          </p>
        ))}
      </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b py-6">
  {dummyPropertyData.amenities.map((amenity:any, index:number) => {
    const IconComponent = amenity.icon;
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