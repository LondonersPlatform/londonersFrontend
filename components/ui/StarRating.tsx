import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({ rating, size = "md", className }: StarRatingProps) {
  // Generate an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    // Determine if this star is full, half, or empty
    const isFilled = i < Math.floor(rating);
    
    const starSize = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }[size];

    return (
      <Star
        key={i}
        className={cn(
          starSize,
          isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
        )}
      />
    );
  });

  return <div className={cn("flex gap-0.5", className)}>{stars}</div>;
}
