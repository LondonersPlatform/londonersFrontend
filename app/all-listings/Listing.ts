
// app/api/listings/getMinDaysByListingId.ts
export async function getMinDaysByListingId(listingId: string, startDate: string) {
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-min-days`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId, startDate }),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch minimum nights");

  const data = await res.json();
  return data; // should return { minNight: number }
}

export async function checkFavorite(guestyUserId: string, listingId: string) {


  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/check-favorites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guesty_user_id: guestyUserId,
      listing_id: listingId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to check favorite status");
  }

  const data = await res.json();
  return data;  // expect { isFavorite: true } or similar
}


export async function signUpUser(userDetails: any): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/auth-signUp`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign up user");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error signing up user:", error.message);
    throw error;
  }
}
export async function getGuestyId(email: string): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-guesty-id`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message ||
        `Failed to get Guesty ID (status ${response.status})`
    );
  }

  return response.json();
}

export async function getUserByGuestId(guestId: string): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-user`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guestId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.message || `Failed to fetch user (status ${response.status})`
      );
    }

    return response.json();
  } catch (error: any) {
    console.error("Error fetching user by guestId:", error.message);
    throw error;
  }
}

export async function addFavorite({
  guestyUserId,
  listingId,
}: {
  guestyUserId: string;
  listingId: string;
}): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/add-favorite`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guestyUserId, listingId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Failed to add favorite (status ${response.status})`
    );
  }

  return response.json();
}
export async function updateUser(userDetails: {
  guestId: string;
  firstName?: string;
  picture?: string;
  lastName?: string;
  email?: string;
  tags?: string[];
  preferredLanguage?: string;
  dietaryPreferences?: string[];
  birthday?: string; // <-- Added birthday field here
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-user`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.message ||
          `Failed to update user (status ${response.status})`
      );
    }

    return response.json();
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}

export async function deleteFavorite({
  guesty_user_id,
  listingId,
}: {
  guesty_user_id: string;
  listingId: string;
}): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete-favorite`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guesty_user_id, listingId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Failed to add favorite (status ${response.status})`
    );
  }

  return response.json();
}

export async function getFavorite({
  guesty_user_id,
}: {
  guesty_user_id: string;
}): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-favorite`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guesty_user_id }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Failed to get favorite (status ${response.status})`
    );
  }

  return response.json();
}




export async function fetchListings(searchParams?: any): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/listing-search`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const requestBody = {
 ...searchParams
   
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdW12eXV3dHp1eWhrd3p6eHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NzQ4NDgsImV4cCI6MjA2MTQ1MDg0OH0.EY_GJhEjJjaxpaPl2veYqGsGkYgfOAykiw5FvfgavC0";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "An unknown error occurred.";
    try {
      const errorData = await response.json();
      console.error("Error creating quote:", errorData);

      // Try to extract a useful error message
      if (errorData.details) {
        const details = JSON.parse(errorData.details);
        errorMessage = details?.error?.message || errorData.details;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      console.error("Error parsing error response:", e);
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function fetchPhotoTourImages(listingId: string): Promise<any> {
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
      errorData?.message ||
        `Failed to retrieve images (status ${response.status})`
    );
  }

  // If your Edge Function wraps the response in a `data` field, adjust this line
  return response.json();
}

export async function createSetupIntent(payload: {
  customer_id: string;
  usage?: "off_session" | "on_session";
  payment_method_types?: string[];
}): Promise<any> {
  const apiUrl = `https://oaumvyuwtzuyhkwzzxtb.supabase.co/functions/v1/create-setup-intent`;

  // ⚠️ Use a valid Supabase JWT, not a service role on client side
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""; // or securely inject a token if using SSR

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id: payload.customer_id,
      usage: payload.usage || "off_session",
      payment_method_types: payload.payment_method_types || ["card"],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message ||
        `Failed to create setup intent (status ${response.status})`
    );
  }

  return response.json();
}

export async function getCalendarByListingId(
  listingId: string
): Promise<Date[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-calender`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listingId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message ||
        `Failed to fetch calendar (status ${response.status})`
    );
  }

  const data = await response.json();

  // Filter available dates and convert to Date objects
  return data
    .filter((entry: any) => entry.status === "available")
    .map((entry: any) => new Date(entry.date));
}

export async function createReservation(payload: {
  quoteId: any;
  guestId: string;
  ratePlanId?: string;
  reservedUntil?: number;
  ignoreCalendar?: boolean;
  ignoreTerms?: boolean;
  ignoreBlocks?: boolean;
  confirmationCode?: string;
  origin?: string;
  originId?: string;
}): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-reservation`;
  const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quoteId: payload.quoteId,
      guestId: payload.guestId,
      ratePlanId: payload.ratePlanId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message ||
        `Failed to create reservation (status ${response.status})`
    );
  }

  return response.json();
}
