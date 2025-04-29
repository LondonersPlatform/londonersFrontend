import Image from "next/image"
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function PropertyNearby() {
  return (
    <div className="my-12">
      <h2 className="text-xl font-semibold mb-6">Nearby Apartments</h2>

      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4,5,6,7,8,9,10,11,12].map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <div className="space-y-2">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={`/dt2.png`}
                      alt={`Nearby property ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Marlybone book</h3>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">4.9</span>
                    <span className="text-gray-500 ml-2">(42)</span>
                  </div>
                  <p className="text-gray-700">2 beds • 1 bath • 1 kitchen</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  )
}

