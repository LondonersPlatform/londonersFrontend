import Image from "next/image"
import { Bed } from "lucide-react"

export function PropertyRooms() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/bd1.png"
              alt="Bedroom 1"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium">Bedroom 1</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Bed className="h-4 w-4 mr-1" />
            <span>1 queen bed</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
              src="/bd1.png"
              alt="Bedroom 1"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium">Bedroom 2</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Bed className="h-4 w-4 mr-1" />
            <span>1 queen bed</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
              src="/bd1.png"
              alt="Bedroom 1"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium">Living Room</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span>Spacious common area</span>
          </div>
        </div>
      </div>
    </div>
  )
}

