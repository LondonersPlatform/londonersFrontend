"use client";

import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useBooking } from "@/context/DatePickerContext";
import { DateRangePicker } from "@/components/sections/BookingEngine/DateRangePicker";
import GuestSelector from "@/components/GuestSelector";
import { createQuote, fetchListingById } from "@/app/all-listings/Listing";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";

// Props interface for extra services
interface BookingSidebarProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: string;
  setGuests: (guests: string) => void;
  dailyCleaningCount: number;
  setDailyCleaningCount: (count: number) => void;
  babysittingCount: number;
  setBabysittingCount: (count: number) => void;
}

export function BookingSidebar({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  dailyCleaningCount,
  setDailyCleaningCount,
  babysittingCount,
  setBabysittingCount,
}: BookingSidebarProps) {
  const {
    dateRange,
    setDateRange,
    isDatePickerOpen,
    setIsDatePickerOpen,
    availableDates,
    setAvailableDates,
    minNight,
    quoteData,
    setQuoteData,
    guestCount,
    guests,
    guestBreakdown,
    MaxNumofGuests,
    handleGuestChange,
    total,
  } = useBooking();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const listingId = searchParams.get("listingId");
  const nameBook = searchParams.get("nameBook");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");

  // Set initial date from URL query params
  useEffect(() => {
    if (checkInParam && checkOutParam) {
      const from = new Date(checkInParam);
      const to = new Date(checkOutParam);
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        setDateRange({ from, to });
      }
    }
  }, [checkInParam, checkOutParam, setDateRange]);

  // Fetch listing info
  const {
    data: dataListing,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["listing", listingId],
    enabled: !!listingId,
    queryFn: () => fetchListingById(listingId as string),
  });

  useEffect(() => {
    const fetchQuote = async () => {
      if (!dateRange?.from || !dateRange?.to || !listingId) return;

      try {
        setLoading(true);
        setError(null);

        const payload = {
          listing_id: listingId,
          check_in_date_localized: format(dateRange.from, "yyyy-MM-dd"),
          check_out_date_localized: format(dateRange.to, "yyyy-MM-dd"),
          guests_count: guestCount,
          number_of_adults: guestBreakdown.adults,
          number_of_children: guestBreakdown.children,
          number_of_infants: guestBreakdown.infants,
          number_of_pets: guestBreakdown.pets,
          ignore_calendar: false,
          ignore_terms: false,
          ignore_blocks: false,
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
  }, [dateRange, guestCount, listingId]);

  const nights =
    dateRange.from && dateRange.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const priceItems =
    Array.isArray(dataListing) && dataListing.length > 0
      ? [
          {
            label: "Price per night",
            value: dataListing[0]?.PricePerNight,
          },
          {
            label: "Cleaning fees",
            value: dataListing[0]?.Cleaningfee,
          },
        ]
      : [];

  const extraServices = [
    {
      count: dailyCleaningCount,
      setCount: setDailyCleaningCount,
      label: "Daily cleaning services",
      price: "$100",
    },
    {
      count: babysittingCount,
      setCount: setBabysittingCount,
      label: "Babysitting services",
      price: "$100",
    },
  ];

  if (isLoading) return <div className="p-8"><Loading /></div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 items-start space-x-4 border-b-2 pb-4">
            <div className="rounded-lg col-span-1">
              <img
                src={dataListing[0]?.imagesDummy[0]}
                alt="Apartment"
                className="w-[120px] h-[80px] rounded-lg object-cover"
              />
            </div>
            <div className="col-span-2">
              <h3 className="font-medium">{nameBook}</h3>
              <p className="text-sm text-gray-600">
                {dataListing[1]?.dummyPropertyData?.description[0]
                  .split(" ")
                  .slice(0, 20)
                  .join(" ") + "..."}
              </p>
            </div>
          </div>

          <div className="border mt-3 border-gray-300 rounded-lg overflow-hidden mb-4">
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <div className="grid grid-cols-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="p-3 border-r border-gray-300">
                    <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
                      CHECK-IN
                    </div>
                    <div className="text-sm text-gray-900">
                      {dateRange.from
                        ? format(dateRange.from, "M/d/yyyy")
                        : "M/d/yyyy"}
                    </div>
                  </div>
                  <div className="p-3 relative">
                    <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
                      CHECKOUT
                    </div>
                    <div className="text-sm text-gray-900">
                      {dateRange.to
                        ? format(dateRange.to, "M/d/yyyy")
                        : "M/d/yyyy"}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-none bg-transparent scale-[.85] -translate-y-36 -translate-x-[4rem] shadow-none p-0" align="start">
                <DateRangePicker
                  dateRange={dateRange}
                  minNights={minNight}
                  onDateRangeChange={setDateRange}
                  onClose={() => setIsDatePickerOpen(false)}
                  availableDates={availableDates}
                />
              </PopoverContent>
            </Popover>

            <div className="border-t border-gray-300">
              <GuestSelector
                maxGuests={MaxNumofGuests}
                onGuestChange={handleGuestChange}
                initialGuests={guests}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardContent className="pt-6">
          <div className="space-y-2">
            {priceItems.map((item, index) => (
              <PriceItem key={index} {...item} />
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Total price</p>
                  <p className="text-gray-700 text-sm">{nights} nights</p>
                </div>
                <p className="text-xl font-bold">{total} €</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable PriceItem component
function PriceItem({
  label,
  value,
  discount = false,
}: {
  label: string;
  value: string;
  discount?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <p className="text-sm">{label}</p>
      <p className={`font-medium ${discount ? "text-green-600" : ""}`}>
        {value} €
      </p>
    </div>
  );
}
