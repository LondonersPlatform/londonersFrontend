import { fetchPhotoTourImages } from "@/app/all-listings/Listing";
import { useQuery } from "@tanstack/react-query";

export function usePhotoTourImages(listingId: string) {
  return useQuery({
    queryKey: ['photoTourImages', listingId], // unique key for caching
    queryFn: () => fetchPhotoTourImages(listingId),
    enabled: !!listingId, // disables query if listingId is falsy
    staleTime: 60 * 1000, // optional: 1 minute cache
  });
}