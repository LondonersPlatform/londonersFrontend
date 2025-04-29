import { Star, Wifi, Tv, AirVent } from "lucide-react"

export function PropertyOverview() {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium ml-1">4.9</span>
        </div>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">42 reviews</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">London, UK</span>
      </div>

      <div className="text-gray-700">
        <p className="mb-4">
          A stunning apartment located in the luxurious Marylebone apartment with sleek, high ceilings and a beautiful,
          modern design. Located in the heart of London, this apartment is perfect for those looking to explore the city
          while enjoying a comfortable and stylish place to stay.
        </p>
        <p>
          Regent's Park, London's most beautiful Royal Park, is only a 5-minute walk away. Oxford Street and Marylebone
          High Street are minutes away by foot. Ideally located for shopping, restaurants, and entertainment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b py-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-100 rounded-full">
            <Wifi className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Fast wifi</h3>
            <p className="text-sm text-gray-500">Download speeds of 100+ Mbps</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-100 rounded-full">
            <Tv className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Self check-in</h3>
            <p className="text-sm text-gray-500">Check yourself in with the smartlock</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-100 rounded-full">
            <AirVent className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Air Conditioning</h3>
            <p className="text-sm text-gray-500">Air conditioning throughout the entire place</p>
          </div>
        </div>
      </div>
    </div>
  )
}

