// types/quote.ts

export type CreateQuotePayload = {
  check_in_date_localized: string;
  check_out_date_localized: string;
  listing_id: string;
  source: string;
  guests_count: number;
  ignore_calendar?: boolean;
  ignore_terms?: boolean;
  ignore_blocks?: boolean;
  coupon_code?: string;
};

export type CreateQuoteResponse = {
  success: boolean;
  quote_id: string;
  guesty_quote: {
    id: string;
    _id: string;
    pricing: {
      total: number;
      currency: string;
    };
  };
  database_record: {
    check_in_date_localized: string;
    check_out_date_localized: string;
    listing_id: string;
    source: string;
    guests_count: number;
    ignore_calendar: boolean;
    ignore_terms: boolean;
    ignore_blocks: boolean;
    coupon_code?: string;
    guesty_quote_id: string;
  };
};
