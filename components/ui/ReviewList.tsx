
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { Review } from "./ReviewModal";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-gray-500">No reviews match your search.</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => {
        const isExpanded = expandedReviews[review.id] || false;
        const shouldTruncate = review.comment.length > 150;
        
        return (
          <div key={review.id}>
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="font-medium text-gray-600">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <span className="font-medium">{review.author}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
                </div>
                <div className="text-gray-700">
                  {shouldTruncate && !isExpanded
                    ? `${review.comment.slice(0, 150)}...`
                    : review.comment}
                </div>
                {shouldTruncate && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => toggleExpand(review.id)}
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </Button>
                )}
              </div>
            </div>
            {index < reviews.length - 1 && <Separator className="my-4" />}
          </div>
        );
      })}
    </div>
  );
}