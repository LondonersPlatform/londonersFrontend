export type ListingParams = Record<string, string>;

export async function fetchListings(
  searchParams?: any,
  page = 1,
  limit = 10,
  available?:any
): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/listing-search`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const requestBody = {
    ...searchParams,
    skip: (page - 1) * limit,
    limit: limit,
    
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
    total: data.totalCount || 0,
  };
}
