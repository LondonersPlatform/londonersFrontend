
"use client"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { RatingDistribution } from "./RatingDistribution";
import { CategoryRating } from "./CategoryRating";
import { ReviewList } from "./ReviewList";

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type CategoryRatingType = {
  name: string;
  rating: number;
  icon: React.ReactNode;
};

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviews: Review[];
  averageRating: number;
  categoryRatings: CategoryRatingType[];
}

export function ReviewModal({
  open,
  onOpenChange,
  reviews,
  averageRating,
  categoryRatings,
}: ReviewModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);

  // Count reviews by rating
  const ratingCounts = {
    5: reviews.filter((review) => Math.round(review.rating) === 5).length,
    4: reviews.filter((review) => Math.round(review.rating) === 4).length,
    3: reviews.filter((review) => Math.round(review.rating) === 3).length,
    2: reviews.filter((review) => Math.round(review.rating) === 2).length,
    1: reviews.filter((review) => Math.round(review.rating) === 1).length,
  };

  // Filter reviews based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredReviews(reviews);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = reviews.filter(
        (review) =>
          review.comment.toLowerCase().includes(query) ||
          review.author.toLowerCase().includes(query)
      );
      setFilteredReviews(filtered);
    }
  }, [searchQuery, reviews]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {reviews.length} Reviews
          </DialogTitle>
        </DialogHeader>
        
 
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
          {/* Left column: ratings overview */}
          <div className="flex flex-col gap-4">
            
            <div className="border rounded-lg p-4 text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-500">out of 5</div>
              <StarRating rating={averageRating} size="lg" className="justify-center my-2" />
              <div className="text-sm text-gray-500">({reviews.length} Reviews)</div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Overall rating</h3>
              <RatingDistribution ratingCounts={ratingCounts} totalReviews={reviews.length} />
            </div>
            
            <div className="border rounded-lg p-4 space-y-4">
                
              {categoryRatings.map((category) => (
                <CategoryRating
                  key={category.name}
                  name={category.name} 
                  rating={category.rating} 
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
          
          {/* Right column: reviews list */}
          <div className="md:col-span-2">
                   <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search review"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full w-full"
          />
        </div>
            <ReviewList reviews={filteredReviews} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}