import Image from "next/image";
import { Bath, Bed, Heart, MapPin, Star, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription } from "../ui/card";
import BathIcon from "@/public/svg-assets/BathIcon";
import Bedrooms from "@/public/svg-assets/Bedrooms";
import Link from "next/link";

interface PropertyDetails {
  beds: number;
  baths: number;
  kitchens: number;
}

interface NearbyProperty {
  id: number;
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  details: PropertyDetails;
}

interface PropertyNearbyProps {
  title?: string;
  properties?: NearbyProperty[];
}

const dummyNearby: NearbyProperty[] = [
  {
    id: 1,
    imageUrl: "/dt2.png",
    title: "Marylebone Book",
    rating: 4.9,
    reviewCount: 42,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 2,
    imageUrl: "/dt2.png",
    title: "Marylebone Loft",
    rating: 4.8,
    reviewCount: 36,
    details: {
      beds: 1,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 3,
    imageUrl: "/dt2.png",
    title: "Marylebone View",
    rating: 4.7,
    reviewCount: 28,
    details: {
      beds: 3,
      baths: 2,
      kitchens: 1,
    },
  },
  {
    id: 4,
    imageUrl: "/dt2.png",
    title: "Marylebone Haven",
    rating: 4.9,
    reviewCount: 51,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 5,
    imageUrl: "/dt2.png",
    title: "Marylebone Retreat",
    rating: 4.6,
    reviewCount: 33,
    details: {
      beds: 1,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 6,
    imageUrl: "/dt2.png",
    title: "Marylebone Nook",
    rating: 4.8,
    reviewCount: 47,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 7,
    imageUrl: "/dt2.png",
    title: "Marylebone Spot",
    rating: 4.7,
    reviewCount: 39,
    details: {
      beds: 1,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 8,
    imageUrl: "/dt2.png",
    title: "Marylebone Place",
    rating: 4.9,
    reviewCount: 58,
    details: {
      beds: 3,
      baths: 2,
      kitchens: 1,
    },
  },
  {
    id: 9,
    imageUrl: "/dt2.png",
    title: "Marylebone Space",
    rating: 4.8,
    reviewCount: 42,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 10,
    imageUrl: "/dt2.png",
    title: "Marylebone Pad",
    rating: 4.7,
    reviewCount: 31,
    details: {
      beds: 1,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 11,
    imageUrl: "/dt2.png",
    title: "Marylebone Flat",
    rating: 4.9,
    reviewCount: 49,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1,
    },
  },
  {
    id: 12,
    imageUrl: "/dt2.png",
    title: "Marylebone Suite",
    rating: 4.8,
    reviewCount: 44,
    details: {
      beds: 3,
      baths: 2,
      kitchens: 1,
    },
  },
];

export function PropertyNearby({
  title = "Nearby Apartments",
  properties = dummyNearby,
}: PropertyNearbyProps) {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
<h3 className="text font-medium ">Sub next similar listing</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {properties.map((property) => (
      <CarouselItem key={property.id} className="md:basis-1/2   lg:basis-1/4">
  <Link
    href={`all-listings/${property.id}?area=${encodeURIComponent(
      property.area
    )}`}
    className="rounded-xl transition-shadow hover:shadow-sm"
  >
    <Card className="shadow-lg border-none my-12 rounded-2xl  overflow-hidden bg-white">
      {/* Image Section */}
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={property.imageUrl}
          alt={property.title}
          width={300}
          height={100}
          className="w-full h-full object-cover transition-transform duration-300 scale-105"
        />
        <button
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
          
        >
          <Heart
            className={`w-5 h-5 `}
          />
        </button>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-700">{property.rating}</span>
          </div>
        </div>

        <CardDescription className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-red-500" />
          { "Phuket, Thailand"}
        </CardDescription>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mt-2">
          <span className="flex items-center gap-2">
            <Bedrooms className="w-4 h-4" />
            {property.details.beds} {property.details.beds === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="flex items-center gap-2">
            <BathIcon className="w-4 h-4" />
            {property.details.baths} {property.details.baths === 1 ? 'Bath' : 'Baths'}
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {5} {5 > 1 ? 'Guests' : 'Guest'}
          </span>
        </div>

        <div className="pt-3 border-t text-sm text-gray-800 flex justify-between items-center">
          <span className="font-semibold">${600}/night</span>
          <span className="text-gray-500 text-xs">${property.total ?? "1200"} Total</span>
        </div>
      </CardContent>
    </Card>
  </Link>
</CarouselItem>

          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" /> */}
      </Carousel>
    </div>
  );
}
