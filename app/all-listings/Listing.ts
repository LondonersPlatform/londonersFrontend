
export async function fetchListings(searchParams?: any): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/listing-search`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const requestBody = {
    ...searchParams,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    next: { revalidate: 60 },
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

export async function fetchListingById(id: string): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/Retrieve-listing-byID`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    next: { revalidate: 60 }, // optional if using Next.js caching
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to retrieve listing by ID");
  }

  const data = await response.json();
  return data; // Adjust this if the response structure has a `data` field, e.g. `return data.data;`
}



export async function createQuote(payload: any): Promise<any> {
  const apiUrl = `https://oaumvyuwtzuyhkwzzxtb.supabase.co/functions/v1/Create-Quote/`;
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdW12eXV3dHp1eWhrd3p6eHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NzQ4NDgsImV4cCI6MjA2MTQ1MDg0OH0.EY_GJhEjJjaxpaPl2veYqGsGkYgfOAykiw5FvfgavC0";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData?.error || `Request failed with status ${response.status}`);
    } catch {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

  return response.json();
}




export async function fetchPhotoTourImages(
  listingId: string,
): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-property-images`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listing_id: listingId }),
  
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Failed to retrieve images (status ${response.status})`,
    );
  }

  // If your Edge Function wraps the response in a `data` field, adjust this line
  return response.json();
}
