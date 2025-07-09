"use client";

import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRangePicker } from "@/components/sections/BookingEngine/DateRangePicker";
import { useBooking } from "@/context/DatePickerContext";
import GuestSelector from "@/components/GuestSelector";
import { useEffect, useState } from "react";
import { createQuote, fetchListingById, getCalendarByListingId } from "@/app/all-listings/Listing";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";

// Define the props interface for the component
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
    guests,
    minNight,
    quoteData,
    setQuoteData,
    guestCount,
   setAvailableDates,
   guestBreakdown,
    MaxNumofGuests,
    handleGuestChange
  } = useBooking();

 const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  // Extra services
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

  // Price items
  

    const searchParams = useSearchParams();
    const listingId = searchParams.get("listingId");


      const { data:dataListing, isLoading, isError } = useQuery({
    queryKey: ["listing", listingId],
    enabled: !!listingId,
    queryFn: () => fetchListingById(listingId as string),
  });
  console.log("dataListing=>",dataListing)
const priceItems = Array.isArray(dataListing) && dataListing.length > 0
  ? [
      { label: "price per night", value: dataListing[0]?.PricePerNight  },
      { label: "Cleaning fees", value: dataListing[0]?.Cleaningfee },
    ]
  : [];

 const invoiceItems =
    quoteData?.guesty_quote.rates.ratePlans[0].money.money.invoiceItems;

  const total = invoiceItems?.reduce(
    (sum: any, item: any) => sum + item.amount,
    0
  );
  const nights = dateRange.from && dateRange.to 
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  useEffect(() => {
    const fetchQuote = async () => {
      if (!dateRange?.from || !dateRange?.to) return;

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


  
  const nameBook = searchParams.get("nameBook");
  console.log("dateRange" ,dateRange)
  if (isLoading) return <div className="p-8"><Loading/></div>;
  return (
    <div className="space-y-6 ">
      <div className="">
        <Card>
          <CardContent className="pt-6">
            <div className=" grid grid-cols-3 items-start space-x-4 border-b-2 pb-4">
              <div className="rounded-lg col-span-1 flex-col ">
                <img
                  src={dataListing[0]?.imagesDummy[0]}
                  alt="Apartment"
                  className="w-[120px] rounded-lg h-[80px]  "
                />
              </div>
              <div className=" col-span-2 ">
                <h3 className="font-medium">{nameBook}</h3>
                <p className="text-sm text-gray-600"> 
      
        {dataListing[1].dummyPropertyData.description[0]
  .split(' ')
  .slice(0, 20)
  .join(' ') + '...'}
                </p>
              </div>
            </div>
            <div className="border mt-3 border-gray-300 rounded-lg overflow-hidden mb-4">
              {/* Date selection using popover */}
              <Popover
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
              >
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
                <PopoverContent
                  className="w-auto border-none bg-transparent scale-[.85] -translate-y-36 -translate-x-[4rem] shadow-none p-0"
                  align="start"
                >
                  <DateRangePicker
                    dateRange={dateRange}
                    minNights={minNight}
                    onDateRangeChange={setDateRange}
                    onClose={() => setIsDatePickerOpen(false)}
                    availableDates={availableDates}
                  />
                </PopoverContent>
              </Popover>

              {/* Guests selector */}
              <div className="border-t border-gray-300">
                <GuestSelector
                  maxGuests={MaxNumofGuests}
                  onGuestChange={handleGuestChange}
                  initialGuests={guests}
                />
              </div>
            </div>

            {/* <div className="mt-6 rounded-xl p-4 shadow border-[#8C8C8CFC] border-[1px]">
              <h4 className="font-medium mb-2">Extra</h4>
              {extraServices.map((service, index) => (
                <Counter key={index} {...service} />
              ))}
            </div> */}
          </CardContent>
        </Card>

        <Card className=" mt-2">
          <CardContent className="pt-6 ">
            <div className="space-y-2">
              {priceItems.map((item, index) => (
                <PriceItem key={index} {...item} />
              ))}

              <div className="pt-4 border-t ">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total price</p>
                   <p className="  text-gray-700 text-sm ">{nights} nights</p>
                  </div>
                  <p className="text-xl font-bold">{total} €</p>
                
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable components that were previously in the main file
function Counter({
  count,
  setCount,
  label,
  price,
}: {
  count: number;
  setCount: (count: number) => void;
  label: string;
  price: string;
}) {
  return (
    <div className="flex bg  justify-between items-center py-2 border-b last:border-b-0">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-gray-500">{price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
              type="button"
          className="h-6 w-6 rounded-full"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center">{count}</span>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="h-6 w-6 rounded-full bg-black hover:text-white text-white hover:bg-gray-800"
          onClick={() => setCount(count + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

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
    <div className="flex  justify-between">
      <p className="text-sm">{label}</p>
      <p className={`font-medium ${discount ? "text-green-600" : ""}`}>
        {value} €
      </p>
    </div>
  );
}
