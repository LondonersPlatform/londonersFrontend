"use client"


import { Star } from "lucide-react";
interface CategoryRatingProps {
  name: string;
  rating: number;
  icon: React.ReactNode;
}

export function CategoryRating({ name, rating, icon }: CategoryRatingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">{icon}</div>
        <div className="font-medium">{name}</div>
      </div>
      <div className="flex items-center gap-2">
        <Star/>
        <span className="text-sm font-medium">{rating.toFixed(2)}</span>
      </div>
    </div>
  );
}