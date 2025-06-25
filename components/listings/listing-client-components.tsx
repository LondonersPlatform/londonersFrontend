"use client"

import type React from "react"

import { useState } from "react"
import { Heart, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import FiltersModal from "@/components/sections/filter-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLoginModal } from "@/context/login-modal-context"
import { addFavorite, deleteFavorite } from "@/app/all-listings/Listing"

// Filter button component
export function FilterButton({ onApply, filterListings, onFilterClick }: any) {
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterClick = () => {
    // Clear search when filter button is clicked
    if (onFilterClick) {
      onFilterClick()
    }
    setShowFilters(true)
  }

  return (
    <>
      {/* Mobile view: Icon only */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg border border-gray-300 md:hidden"
        onClick={handleFilterClick}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="sr-only">Filters</span>
      </Button>

      {/* Desktop view: Icon with text */}
      <Button
        variant="outline"
        className="hidden md:flex items-center space-x-2 rounded-lg border border-gray-300"
        onClick={handleFilterClick}
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
  )
}

type SortSelectProps = {
  value: string
  onChange: (value: string) => void
}

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
  )
}

// Favorite button component
export function FavoriteButton({
  isFavorite,
  listingId,
}: {
  isFavorite: boolean
  listingId?: string
}) {
  const [favorite, setFavorite] = useState(isFavorite)
  const { setRedirectPath, setLoginOpen } = useLoginModal()

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("access_token")
    const guestyId = localStorage.getItem("GuestyId")

    if (!accessToken || !guestyId) {
      setRedirectPath("/all-listings")
      setLoginOpen(true)
      return
    }

    const newFavoriteState = !favorite
    setFavorite(newFavoriteState) // Update UI immediately

    try {
      if (newFavoriteState && listingId) {
        // Add to favorites
        await addFavorite({
          guestyUserId: guestyId,
          listingId,
        })
      } else if (!newFavoriteState && listingId) {
        // Remove from favorites
        await deleteFavorite({
          guesty_user_id: guestyId,
          listingId,
        })
      }
    } catch (error: any) {
      console.error("Failed to update favorite:", error.message)
      setFavorite(favorite) // Rollback on failure
    }
  }

  return (
    <button className="rounded-full p-1 hover:bg-gray-100" onClick={handleFavoriteClick}>
      <Heart className={`h-6 w-6 ${favorite ? "fill-red-600 text-red-700" : ""}`} />
    </button>
  )
}

// Search input component - Client-side search
export function SearchInput({
  onSearchChange,
  searchValue,
}: {
  onSearchChange: (query: string) => void
  searchValue: string
}) {
  const [inputValue, setInputValue] = useState(searchValue)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(inputValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    // Real-time search as user types
    onSearchChange(value)
  }

  const handleClear = () => {
    setInputValue("")
    onSearchChange("")
  }

  return (
    <form onSubmit={handleSearch} className="relative lg:w-1/2 mb-6">
      <input
        type="text"
        placeholder="Search by name, location, price, or rating..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full rounded-full bg-gray-100 py-3 pl-12 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
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
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
