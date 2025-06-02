"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Home,
  CheckCircle,
  MessageSquare,
  Map,
  DollarSign,
} from "lucide-react";
import { CategoryRatingType, Review, ReviewModal } from "../ui/ReviewModal";
import { StarRating } from "../ui/StarRating";

// Sample data
const demoReviews: Review[] = [
  {
    id: "1",
    author: "Mary William",
    rating: 4.6,
    date: "3 month ago",
    comment:
      "Perfect base for exploring London. Family of five fitted comfortably. Immaculately clean. Easy walk to multiple tube stations. Nice neighborhood and quiet street with very little traffic. Easy to find.",
  },
  {
    id: "2",
    author: "John Davis",
    rating: 5.0,
    date: "1 month ago",
    comment:
      "Absolutely wonderful experience! The place was spotless, comfortable, and had all the amenities we needed. Great location with easy access to public transportation. The host was responsive and helpful. Would definitely stay here again!",
  },
  {
    id: "3",
    author: "Emma Thompson",
    rating: 4.2,
    date: "2 months ago",
    comment:
      "Very nice apartment in a great area. Close to shops and restaurants. The kitchen was well-equipped and the beds were comfortable. Only minor issue was that the heating was a bit inconsistent.",
  },
  {
    id: "4",
    author: "Michael Johnson",
    rating: 3.8,
    date: "1 month ago",
    comment:
      "Good value for the price. Location is convenient and the neighborhood feels safe. The apartment itself is functional though some furniture is showing signs of wear. Would recommend for budget travelers.",
  },
  {
    id: "5",
    author: "Sarah Parker",
    rating: 4.9,
    date: "2 weeks ago",
    comment:
      "One of the best places we've stayed! Everything was perfect from the cleanliness to the location. The host provided excellent recommendations for local attractions and was very accommodating with our check-in time. The beds were extremely comfortable and the kitchen had everything we needed to prepare meals.",
  },
];

// Calculate average rating
const averageRating =
  demoReviews.reduce((sum, review) => sum + review.rating, 0) /
  demoReviews.length;

// Category ratings
const categoryRatings: CategoryRatingType[] = [
  {
    name: "Cleanliness",
    rating: 4.65,
    icon: <CheckCircle className="h-4 w-4" />,
  },
  { name: "Accuracy", rating: 4.25, icon: <Home className="h-4 w-4" /> },
  { name: "Check-In", rating: 4.65, icon: <CheckCircle className="h-4 w-4" /> },
  {
    name: "Communication",
    rating: 4.65,
    icon: <MessageSquare className="h-4 w-4" />,
  },
  { name: "Location", rating: 4.65, icon: <Map className="h-4 w-4" /> },
  { name: "Value", rating: 4.65, icon: <DollarSign className="h-4 w-4" /> },
];

export function ReviewModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        variant="outline"
        className="rounded-full  w-auto"
        onClick={() => setOpen(true)}
      >
        Show more
      </Button>

      <ReviewModal
        open={open}
        onOpenChange={setOpen}
        reviews={demoReviews}
        averageRating={averageRating}
        categoryRatings={categoryRatings}
      />
    </div>
  );
}
