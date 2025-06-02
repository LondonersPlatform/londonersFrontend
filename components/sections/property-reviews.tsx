import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReviewModalDemo } from "./ReviewModalDemo";

export default function PropertyReviews({ propertyReviews }: any) {
  // Helper function to render stars
  const renderStars = (rating: number, totalStars = 5) => {
    return Array.from({ length: totalStars }).map((_, i) => (
      <Star
        key={i}
        className="h-4 w-4 fill-yellow-400"
        style={{ opacity: i < Math.floor(rating) ? 1 : 0.5 }}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Rating summary */}
        <div className="bg-white rounded-lg border p-6 flex flex-col items-center justify-center w-full md:w-auto">
          <div className="text-5xl font-bold">
            {propertyReviews.ratingSummary.average}
          </div>
          <div className="flex text-yellow-400 my-1">
            {renderStars(propertyReviews.ratingSummary.stars)}
          </div>
          <div className="text-gray-500 text-sm">
            ({propertyReviews.ratingSummary.count} Review)
          </div>
        </div>

        {/* Right side - Rating bars */}
        <div className="flex-1 space-y-2">
          {propertyReviews.ratingSummary.ratingBars.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-sm">{item.label}</div>
              <div className="h-2 bg-gray-200 rounded-full flex-1">
                <div
                  className="h-2 bg-black rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category ratings */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {propertyReviews.ratingSummary.categories.map((item, index) => (
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
      <div className="space-y-8 border-t  pt-8">
        {propertyReviews.reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{review.user.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {renderStars(review.rating)}
                  </div>
                  <span className="font-medium">{review.rating}</span>
                  <span className="text-gray-500 text-sm">· {review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
     

         <ReviewModalDemo />
      </div>
    </div>
  );
}
