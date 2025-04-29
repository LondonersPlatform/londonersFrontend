import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function PropertyReviews() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Rating summary */}
        <div className="bg-white rounded-lg border p-6 flex flex-col items-center justify-center w-full md:w-auto">
          <div className="text-5xl font-bold">4.9</div>
          <div className="flex text-yellow-400 my-1">
            <Star className="h-5 w-5 fill-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400" />
          </div>
          <div className="text-gray-500 text-sm">(200 Review)</div>
        </div>

        {/* Right side - Rating bars */}
        <div className="flex-1 space-y-2">
          {[
            { label: "5 star", percentage: 85 },
            { label: "4 star", percentage: 60 },
            { label: "3 star", percentage: 35 },
            { label: "2 star", percentage: 10 },
            { label: "1 star", percentage: 5 },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-sm">{item.label}</div>
              <div className="h-2 bg-gray-200 rounded-full flex-1">
                <div className="h-2 bg-black rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category ratings */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Cleanliness", rating: 4.65 },
          { label: "Accuracy", rating: 4.65 },
          { label: "Check-In", rating: 4.65 },
          { label: "Communication", rating: 4.65 },
          { label: "Location", rating: 4.65 },
          { label: "Value", rating: 4.65 },
        ].map((item, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="text-sm">{item.label}</div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{item.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-8 border-t pt-8">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=MW`} alt="Mary William" />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Mary William</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 opacity-50" />
                  </div>
                  <span className="font-medium">4.6</span>
                  <span className="text-gray-500 text-sm">· 3 month ago</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              "Perfect base for exploring London. Family of five fitted comfortably. Immaculately clean. Easy walk to
              multiple tube stations. Nice neighborhood and quiet street with very little traffic. Easy to fin"
            </p>
            <button className="text-sm font-medium">Show more</button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="rounded-full flex items-center gap-2">
        Show all reviews <span className="ml-1">→</span>
      </Button>
    </div>
  )
}
