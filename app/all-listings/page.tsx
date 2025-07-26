"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FilterButton,
  SortSelect,
  FavoriteButton,
  SearchInput,
} from "@/components/listings/listing-client-components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Bedrooms from "../../public/svg-assets/Bedrooms";
import BathIcon from "../../public/svg-assets/BathIcon";

import Beds from "../../public/svg-assets/Beds";
import GeuestIcon from "../../public/svg-assets/GeuestIcon";
import LocationIcon from "../../public/svg-assets/LocationIcon";
import DistarrowIcon from "../../public/svg-assets/DistarrowIcon";
import { fetchListings } from "./Listing";
import { ListingSkeletonCard } from "@/components/ui/ListingSkeletonCard";
import { useState, useMemo, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  FileQuestion,
  HomeIcon,
  Search,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Home from "../page";

const LIMIT = 5;

export default function AllListingsPage() {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const paramsObject = useMemo(() => {
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const paramsObjectSearch = {
    ...(paramsObject &&
      Object.keys(paramsObject).length > 0 && {
        available: {
          checkIn: paramsObject.checkIn,
          checkOut: paramsObject.checkOut,
          minOccupancy: paramsObject.minOccupancy,
          ignoreFlexibleBlocks: paramsObject.ignoreFlexibleBlocks,
        },
      }),
  };

  // Separate filters state
  const [filters, setFilters] = useState<any>({
    bedrooms: null,
    beds: 1,
    bathrooms: 1,
    priceRange: [0, 10000],
    amenities: [],
  });

  // Fetch all listings once - no API calls on filter changes
  const {
    data: listingsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["listings", paramsObjectSearch],
    queryFn: () => fetchListings(paramsObjectSearch),
  });

  // Track if we have active filters (move this after useQuery)
  const hasActiveFilters =
    filters.bedrooms !== null ||
    filters.beds !== 1 ||
    filters.bathrooms !== 1 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 10000 ||
    filters.amenities.length > 0;

  const sortListings = (listings: any[], sort: string) => {
    if (sort === "low-to-high") {
      return [...listings].sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sort === "high-to-low") {
      return [...listings].sort((a, b) => b.pricePerNight - a.pricePerNight);
    }
    return listings; // default
  };

  // Client-side search function
  const searchListings = (listings: any[], query: string) => {
    if (!listings || !query.trim()) return listings;

    const searchTerm = query.toLowerCase();
    return listings.filter((listing) => {
      return (
        // Search by name/title
        listing.title?.toLowerCase().includes(searchTerm) ||
        // Search by location
        listing.location?.toLowerCase().includes(searchTerm) ||
        listing.area?.toLowerCase().includes(searchTerm) ||
        // Search by price (convert to string to search)
        listing.pricePerNight?.toString().includes(searchTerm) ||
        listing.totalPrice?.toString().includes(searchTerm) ||
        // Search by rating
        listing.rating?.toString().includes(searchTerm)
      );
    });
  };

  const filterListings = (listings: any[], filters: any) => {
    if (!listings) return [];

    return listings.filter((listing) => {
      // Filter by bedrooms
      if (filters.bedrooms !== null && listing.bedroom !== filters.bedrooms) {
        return false;
      }

      // Filter by beds
      if (listing.beds < filters.beds) {
        return false;
      }

      // Filter by bathrooms
      if (listing.bath < filters.bathrooms) {
        return false;
      }

      // Filter by price range
      if (
        listing.pricePerNight < filters.priceRange[0] ||
        listing.pricePerNight > filters.priceRange[1]
      ) {
        return false;
      }

      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(
          (amenityLabel: string) => listing.amenities.includes(amenityLabel)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  };

const router = useRouter();

const handleResetFilters = () => {
  const newParams = new URLSearchParams(searchParams.toString());

  newParams.delete("checkIn");
  newParams.delete("checkOut");
  newParams.delete("minOccupancy");

  // You can reset additional filters if needed:
  // newParams.delete("someOtherParam");

  // Update URL to trigger refetch via searchParams change
  router.push(`?${newParams.toString()}`);
};

  // Reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  // Process listings: Search first, then filter, then sort
  const processedListings = useMemo(() => {
    if (!listingsData?.listings) return [];

    let result = listingsData.listings;

    // Apply search first (client-side)
    if (searchQuery.trim()) {
      result = searchListings(result, searchQuery);
    }

    // Apply filters if we have active filters
    if (hasActiveFilters) {
      result = filterListings(result, filters);
    }

    // Apply sorting
    result = sortListings(result, sortOrder);

    return result;
  }, [
    listingsData?.listings,
    searchQuery,
    filters,
    sortOrder,
    hasActiveFilters,
  ]);

  const visibleListings = processedListings.slice(0, page * LIMIT);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const showLess = () => {
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleFiltersApply = (newFilters: any) => {
    // Clear search when applying filters
    setSearchQuery("");
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterButtonClick = () => {
    // Clear search when filter button is clicked
    setSearchQuery("");
  };

  if (isLoading && !listingsData) {
    return (
      <div className="md:w-[85%]  w-[96%] mx-auto px-4 py-8 space-y-6">
        {[...Array(3)].map((_, index) => (
          <ListingSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-background p-4">
        <Card className="w-full border-none max-w-md">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src={"./Document_empty.svg"} />
            </div>
            <CardTitle className="text-xl font-bold">
              {error?.message || "The page you're looking for Not work."}
            </CardTitle>
            <span className=" text-gray-600">Something went wrong</span>
          </div>
          <CardContent className="space-y-4 text-center">
            <div className="pt-4">
              <Button asChild className="w-full flex items-center">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center"
                >
                  Back to home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const hasResettableParams =
  paramsObject.checkIn || paramsObject.checkOut || paramsObject.minOccupancy;

  return (
    <div className="md:w-[85%]  w-[96%] mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchInput
          onSearchChange={handleSearchChange}
          searchValue={searchQuery}
        />
        <div className="flex flex-col w-full gap-4 md:items-center md:flex-row">
          <h1 className="text-2xl font-bold flex-grow">
            {processedListings.length} Rentals
            {searchQuery.trim() && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (search results{hasActiveFilters ? ", filtered" : ""})
              </span>
            )}
            {!searchQuery.trim() && hasActiveFilters && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (filtered from {listingsData?.listings?.length || 0} total)
              </span>
            )}
          </h1>
          <div className="flex items-center gap-3 justify-end w-full md:w-auto">
        {hasResettableParams &&
           <Button className=" bg-transparent  text-red-500 hover:bg-transparent"  onClick={handleResetFilters} >
              <X />
              <span className=" underline ">Reset</span>
            </Button>
        }    
         
            <FilterButton
              onApply={handleFiltersApply}
              filterListings={processedListings}
              onFilterClick={handleFilterButtonClick}
            />
            <SortSelect value={sortOrder} onChange={handleSortChange} />

          </div>
        </div>
      </div>

      {processedListings.length > 0 ? (
        <div className="space-y-6">
          {visibleListings.map((listing: any) => (
            <div
            onClick={() => router.push(`all-listings/${listing.id}?area=${encodeURIComponent(
                listing.area
              )}&rating=${listing.rating}&bedroom=${listing.bedroom}&bath=${
                listing.bath
              }&beds=${listing.beds}&guests=${listing.guests}&title=${
                listing.title
              }`)} 
              key={listing.id}
              className="rounded-xl transition-shadow hover:shadow-sm cursor-pointer"
            >
              <div className="flex rounded-2xl p-0 my-6 border-gray-300 border-[1px] flex-col md:flex-row">
                {/* Desktop Images */}
                <div className="relative gap-3 p-0 m-0 rounded-xl items-center hidden md:flex w-full md:w-2/5">
                  <div className="relative h-full w-1/2">
                    <img
                      src={listing.images[1] || "/placeholder.svg"}
                      alt={listing.title}
                      width={300}
                      height={200}
                      loading="eager"
                      className="w-full h-full rounded-s-xl object-cover"
                    />
                  </div>
                  <div className="relative h-full w-1/2">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      width={300}
                      height={200}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Mobile Carousel */}
                <div className="relative md:hidden p-0 m-0 rounded-xl w-full">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {listing.images.map((src: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="keen-slider__slide relative h-64 w-full">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={listing.title}
                              width={400}
                              height={256}
                              sizes="100vw"
                              className="w-full rounded-t-2xl h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                {/* Listing Info */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="text-xl hover:underline  font-bold">{listing.title}</h2>
                      <FavoriteButton
                        isFavorite={listing.isFavorite}
                        listingId={listing.id}
                      />
                    </div>

                    <div className="mb-4 flex items-center space-x-2">
                      <div className="flex items-center gap-1 text-red-500">
                        <LocationIcon />
                        <span className="ml-1 text-sm">{listing.location}</span>
                      </div>
                      <span className="text-gray-400">
                        <DistarrowIcon />
                      </span>
                      <span className="text-sm text-gray-600">
                        {listing.area}
                      </span>
                    </div>

                    <div className="mb-4 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(listing.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm font-medium">
                          {listing.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({listing.reviews} Reviews)
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Bedrooms />
                        <span className="text-sm">
                          {listing.bedroom} Bedroom
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Beds />
                        <span className="text-sm">{listing.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BathIcon />
                        <span className="text-sm">{listing.bath} Bath</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GeuestIcon />
                        <span className="text-sm">{listing.guests} Guests</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="my-4 text-sm">{listing.dateRange}</div>
                    <div className="flex lg:flex-row flex-col  lg:items-end gap-5">
                      <div>
                        <span className="text-xl font-bold">
                          £{listing.pricePerNight}
                        </span>
                        <span className="text-sm text-gray-500">/night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className=" flex items-center justify-center px-4">
            <div className="text-center mt-24  mx-auto">
              {/* Icon */}
              <img src={"./Search_empty.svg"} alt=" Not found" />

              {/* Text */}
              <h1 className="text-3xl mt-4 font-bold text-gray-900 mb-4">
                Not found room
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {searchQuery.trim()
                  ? `No listings match your search "${searchQuery}"${
                      hasActiveFilters ? " and current filters" : ""
                    }.`
                  : hasActiveFilters
                  ? "No listings match your current filters."
                  : "No listings available."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 text-center space-x-4">
        {visibleListings.length < processedListings.length && (
          <Button
            onClick={showMore}
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? "Loading..." : "Show More"}
          </Button>
        )}
        {page > 1 && (
          <Button
            variant="secondary"
            onClick={showLess}
            className="rounded-full"
          >
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
}
