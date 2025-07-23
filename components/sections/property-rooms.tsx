"use client"

import Image from "next/image"
import { Bed } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function PropertyRooms({ roomData }: any) {
  if (!roomData?.rooms || !Array.isArray(roomData.rooms)) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>

      <Carousel className="w-full max-w-full">
        <CarouselContent>
          {roomData.rooms.map((room: any, index: number) => (
       <CarouselItem
  key={index}
  className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
>
  <div className="space-y-2">
    <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg">
      <Image
        src={room.thumbnail}
        alt={room.name}
        fill
        className="object-cover"
      />
    </div>
    <h3 className="font-semibold  lg:text-[15px] text-xs capitalize">{room.name}</h3>
  </div>
</CarouselItem>

          ))}
        </CarouselContent>
   
      </Carousel>
    </div>
  )
}
