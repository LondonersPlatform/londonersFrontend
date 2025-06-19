import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface GuestyGuestData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  contactType: string;
  preferredLanguage: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const guestData: GuestyGuestData = req.body;

    // Validate required fields
    if (!guestData.firstName || !guestData.lastName || !guestData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, and email are required' 
      });
    }

    // Get Guesty token from database
    const { data: tokenData, error: tokenError } = await supabase
      .from('guesty_tokens')
      .select('access_token')
      .single();

    if (tokenError || !tokenData?.access_token) {
      console.error('Error fetching Guesty token:', tokenError);
      return res.status(500).json({ 
        error: 'Failed to retrieve Guesty token',
        details: tokenError?.message 
      });
    }

    console.log('Making Guesty API call with guest data:', guestData);

    // Make request to Guesty API
    const guestyResponse = await fetch('https://open-api.guesty.com/v1/guests-crud', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS-App/1.0'
      },
      body: JSON.stringify(guestData),
    });

    const responseText = await guestyResponse.text();
    console.log('Guesty API Response:', {
      status: guestyResponse.status,
      statusText: guestyResponse.statusText,
      body: responseText
    });

    if (!guestyResponse.ok) {
      return res.status(guestyResponse.status).json({
        error: 'Guesty API request failed',
        status: guestyResponse.status,
        statusText: guestyResponse.statusText,
        details: responseText
      });
    }

    let guestyData;
    try {
      guestyData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Guesty response:', parseError);
      return res.status(500).json({
        error: 'Failed to parse Guesty API response',
        details: responseText
      });
    }

    return res.status(200).json({
      success: true,
      data: guestyData,
      guest_id: guestyData._id
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
