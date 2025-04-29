import Image from "next/image"

export function PropertyTransportation() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation</h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32&text=TFL"
              alt="London Underground"
              fill
              className="object-cover"
            />
          </div>
          <span>Regent's Park Station (5-7 minute)</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32&text=TFL"
              alt="London Underground"
              fill
              className="object-cover"
            />
          </div>
          <span>Baker Street Station (5-7 minute)</span>
        </div>
      </div>
    </div>
  )
}

