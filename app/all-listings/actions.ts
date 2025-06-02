'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchListings, fetchPhotoTourImages, ListingParams } from '../all-listings/Listing';
  
export default function Listings({ searchParams }: { searchParams?: ListingParams }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings', searchParams],
    queryFn: () => fetchListings(searchParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });




