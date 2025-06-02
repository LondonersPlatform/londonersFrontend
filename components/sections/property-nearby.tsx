import Image from "next/image";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const dummyNearby: NearbyProperty[] = 

[
  {
    id: 1,
    imageUrl: "/dt2.png",
    title: "Marylebone Book",
    rating: 4.9,
    reviewCount: 42,
    details: {
      beds: 2,
      baths: 1,
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
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
      kitchens: 1
    }
  }
];

export function PropertyNearby({ 
  title = "Nearby Apartments", 
  properties = dummyNearby 
}: PropertyNearbyProps) {
  return (
    <div className="my-12">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      <Carousel className="w-full">
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <div className="space-y-2">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={property.imageUrl}
                      alt={`Nearby property ${property.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{property.title}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{property.rating}</span>
                    <span className="text-gray-500 ml-2">({property.reviewCount})</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <span>{property.details.beds} {property.details.beds === 1 ? 'bed' : 'beds'}</span>
                    <span> • </span>
                    <span>{property.details.baths} {property.details.baths === 1 ? 'bath' : 'baths'}</span>
                    <span> • </span>
                    <span>{property.details.kitchens} {property.details.kitchens === 1 ? 'kitchen' : 'kitchens'}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}