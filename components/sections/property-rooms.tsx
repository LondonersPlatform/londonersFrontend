import Image from "next/image"
import { Bed } from "lucide-react"



export function PropertyRooms({roomData}:any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roomData.map((room:any, index:number) => (
          <div key={index} className="space-y-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={room.image}
                alt={room.alt}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium">{room.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              {room.hasBed && <Bed className="h-4 w-4 mr-1" />}
              <span>{room.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}