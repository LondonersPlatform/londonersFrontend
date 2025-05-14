// lib/api/listings.ts

export interface ListingParams {
    [key: string]: string | string[] | undefined;
  }
  
  export interface ListingData {
    listings: any[];
    total: number;
  }
  
  export async function fetchListings(searchParams?: ListingParams): Promise<ListingData> {
    const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/Retrieve-all-listings`;
    const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
    const requestBody = {
      q: searchParams?.q || '',
      limit: searchParams?.limit ? Number(searchParams.limit) : 10,
      't.city': searchParams?.city || '',
      available: searchParams?.checkIn && searchParams?.checkOut
        ? {
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
          }
        : undefined,
    };
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to retrieve listings");
    }
  
    const data = await response.json();
    return {
      listings: data.data || [],
      total: data.data?.length || 0,
    };
  }
  