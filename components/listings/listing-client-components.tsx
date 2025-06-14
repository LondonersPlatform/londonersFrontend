"use client";

import { useState, useTransition } from "react";
import { Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import FiltersModal from "@/components/sections/filter-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

// Filter button component
export function FilterButton({onApply,filterListings}:any) {
  const [showFilters, setShowFilters] = useState(false);
  
  const handleApplyFilters = (filters: any) => {
    setShowFilters(false);
    console.log("Applied filters:", filters);
    // Here you would typically filter the listings based on the applied filters
    // For server components, we'd need to use URL parameters and refresh the page
    // or use a more complex state management solution
  };

  return (
    <>
      {/* Mobile view: Icon only */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg border border-gray-300 md:hidden"
        onClick={() => setShowFilters(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="sr-only">Filters</span>
      </Button>

      {/* Desktop view: Icon with text */}
      <Button
        variant="outline"
        className="hidden md:flex items-center space-x-2 rounded-lg border border-gray-300"
        onClick={() => setShowFilters(true)}
       
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filters</span>
      </Button>

      {/* Filters Modal */}
      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onApply={onApply}
          setShowFilters={setShowFilters}
          filterListings={filterListings}
        />
      )}
    </>
  );
}

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="hidden md:inline text-sm font-medium">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Default order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default order</SelectItem>
          <SelectItem value="low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="high-to-low">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
// Favorite button component
export function FavoriteButton({ isFavorite }: { isFavorite: boolean }) {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <button 
      className="rounded-full p-1 hover:bg-gray-100"
      onClick={(e) => {
        e.preventDefault(); // Prevent link navigation
        setFavorite(!favorite);
      }}
    >
      <Heart
        className={`h-6 w-6 ${favorite ? "fill-black text-black" : ""}`}
      />
    </button>
  );
}

// Search input component
export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchValue.trim()) {
        params.set('q', searchValue.trim());
      } else {
        params.delete('q');
      }
      
      router.push(`/all-listings?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative lg:w-1/2 mb-6">
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full rounded-full bg-gray-100 py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
        disabled={isPending}
      />
      <button type="submit" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}