"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createQuote } from "@/app/all-listings/Listing";
import WIcon from "@/public/svg-assets/WIcon";

interface QuoteResponse {
  total: number;
  subtotal: number;
  guesty_quote: any;
  cleaningFee: number;
  serviceFee: number;
}

export function PropertyBooking({
  PricePerNight,
  serviceFee,
  Cleaningfee,
  whatsup,
  MaxNumofGuests,
  listingId,
}: any) {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2025, 2, 30));
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2025, 3, 6));
  const [guestCount, setGuestCount] = useState(2);
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate the number of nights between check-in and check-out
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Fetch quote data whenever dates or guest count changes
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        const payload = {
          listing_id: listingId,
          check_in_date_localized: checkInDate.toISOString().split("T")[0],
          check_out_date_localized: checkOutDate.toISOString().split("T")[0],
          guests_count: guestCount,
          source: "website",
        };

        const response = await createQuote(payload);
        setQuoteData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch quote");
        console.error("Error fetching quote:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [checkInDate, checkOutDate, guestCount, listingId]);

  // Calculate costs based on API response or fallback to props
  const nightlyRate = PricePerNight;
  const subtotal = nightlyRate * nights;
  const cleaningFee = Cleaningfee;
  const serviceFeeValue = serviceFee;
  const total =
    quoteData?.guesty_quote?.rates?.ratePlans?.[0]?.money?.money
      ?.hostPayoutUsd ?? 0;
  const handleCheckInChange = (date: Date | undefined) => {
    if (date) {
      setCheckInDate(date);
      // Ensure check-out date is after check-in date
      if (date >= checkOutDate) {
        const newCheckOut = new Date(date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        setCheckOutDate(newCheckOut);
      }
    }
  };

  return (
    <section className="sticky top-6">
      <div className="border shadow-lg rounded-xl p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">${nightlyRate}</span>
              <span className="text-gray-500"> / night</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">4.9</span>
              <span className="text-gray-500 ml-1">(42 reviews)</span>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 border rounded-xl overflow-hidden">
            {/* Check-in Date Picker */}
            <div className="p-3 border-r hover:bg-gray-200 border-b">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-full bg-transparent hover:bg-transparent text-grey-800 flex flex-col gap-1 py-0 items-start p-0 h-full font-normal">
                    <div className="text-xs font-medium">CHECK-IN</div>
                    <span>{format(checkInDate, "M/d/yyyy")}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={handleCheckInChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date Picker */}
            <div className="p-3 border-b hover:bg-gray-200">
              <Popover>
                <PopoverTrigger asChild className=" ">
                  <Button className="w-full bg-transparent hover:bg-transparent text-grey-800 flex flex-col gap-1 py-0 items-start p-0 h-full font-normal">
                    <div className="text-xs font-medium">CHECK-OUT</div>
                    <span>{format(checkOutDate, "M/d/yyyy")}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={(date) => date && setCheckOutDate(date)}
                    initialFocus
                    disabled={(date) => date <= checkInDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests Dropdown */}
            <div className="col-span-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full m-0 py-2 h-full justify-between font-normal"
                  >
                    <span>
                      <div className="text-sm flex flex-col gap-2 px-0 font-medium">
                        GUESTS
                        <span>
                          {guestCount} {guestCount === 1 ? "guest" : "guests"}
                        </span>
                      </div>
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="center"
                  className="min-w-[--radix-popper-anchor-width]"
                >
                  {Array.from({ length: MaxNumofGuests }, (_, i) => i + 1).map(
                    (num) => (
                      <DropdownMenuItem
                        key={num}
                        onClick={() => setGuestCount(num)}
                        className={cn(
                          "cursor-pointer w-full",
                          guestCount === num && "font-medium"
                        )}
                      >
                        {num} {num === 1 ? "guest" : "guests"}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Book Now"}
          </Button>
          <p className="text-center text-sm text-gray-500">
            You won't be charged yet
          </p>

          <div className="space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <div className="underline">Cleaning fee</div>
              <div>${cleaningFee}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="underline">Service fee</div>
              <div>${serviceFeeValue.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between border-t pt-3 font-semibold">
              <div>Total</div>
              <div>${total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-6">
        <Button className="bg-[#8C8C8C] p-5 text-center">
          Contact the host
        </Button>
        <a
          href={`https://wa.me/${whatsup}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#59D750] w-full hover:bg-[#67e15e] p-5 text-center flex items-center justify-center gap-2">
         <WIcon/>
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
