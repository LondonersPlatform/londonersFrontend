"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  createQuote,
  getCalendarByListingId,
} from "@/app/all-listings/Listing";
import WIcon from "@/public/svg-assets/WIcon";
import { usePathname, useRouter } from "next/navigation";
import { useLoginModal } from "@/context/login-modal-context";
import { DatePickerWithRange } from "../ui/DateRangePicker";
import { DatePickerWithRangeSmall } from "../ui/DateRangePickersmall";

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
  rate,
minNights,

  Cleaningfee,
  whatsup,
  MaxNumofGuests,
  listingId,
}: any) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  console.log("minNights",minNights)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: tomorrow,
  });
  const [guestCount, setGuestCount] = useState(2);
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [loadingDates, setLoadingDates] = useState(true);
  const [availableDates, setAvailableDates] = useState<any>([]);
    const [isOpenDate, setIsOpen] = useState(false);
         
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const dates = await getCalendarByListingId(listingId);
        setAvailableDates(dates);
        console.log("dates==>", dates);
      } catch (error) {
        console.error("Error loading calendar dates:", error);
      } finally {
        setLoadingDates(false);
      }
    };

    fetchDates();
  }, [listingId]);

  // Calculate the number of nights between check-in and check-out
  const nights =
    dateRange?.from && dateRange?.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const session = JSON.parse(localStorage.getItem("session") || "{}");
  console.log(localStorage.getItem("session"), "session in property booking");

  const openLoginModal = () => {
    const query = new URLSearchParams({
      quoteId: quoteData?.guesty_quote._id,
      PricePerNight: PricePerNight,
      serviceFee: serviceFee,
      Cleaningfee: Cleaningfee,
      whatsup: whatsup,
      MaxNumofGuests: MaxNumofGuests,
      listingId: listingId,
    });

    setRedirectPath(`/Payment?${query.toString()}`);
    setLoginOpen(true);
  };

  // Fetch quote data whenever dates or guest count changes
  useEffect(() => {
    const fetchQuote = async () => {
      if (!dateRange?.from || !dateRange?.to) return;

      try {
        setLoading(true);
        setError(null);

        const payload = {
          listing_id: listingId,
          check_in_date_localized: dateRange.from.toISOString().split("T")[0],
          check_out_date_localized: dateRange.to.toISOString().split("T")[0],
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
  }, [dateRange, guestCount, listingId]);

  const router = useRouter();

  const handleClick = () => {
    setLoading(true);

    const query = new URLSearchParams({
      quoteId: quoteData?.guesty_quote._id,
      PricePerNight: PricePerNight,
      serviceFee: serviceFee,
      Cleaningfee: Cleaningfee,
      whatsup: whatsup,
      ratePlanIdParms: rate,
      MaxNumofGuests: MaxNumofGuests,
      listingId: listingId,
    });

    router.push(`/Payment?${query.toString()}`);
  };
  const pathname = usePathname();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const whatsappLink = `https://wa.me/${whatsup}?text=I'm%20interested%20in%20this%20listing:%20${encodeURIComponent(
    currentUrl
  )}`;
  // Calculate costs based on API response or fallback to props
  const nightlyRate = PricePerNight;
  const subtotal = nightlyRate * nights;
  const cleaningFee = Cleaningfee;
  const serviceFeeValue = serviceFee;
  const total =
    quoteData?.guesty_quote?.rates?.ratePlans?.[0]?.money?.money
      ?.hostPayoutUsd ?? 0;
  const invoiceItems =
    quoteData?.guesty_quote.rates.ratePlans[0].money.money.invoiceItems;

  const totalAmount = invoiceItems?.reduce(
    (sum: any, item: any) => sum + item.amount,
    0
  );

  console.log(totalAmount, "totalAmount====>");
  console.log("rate==>", rate);

  return (
    <section className="sticky top-6">
      <div className="border shadow-lg rounded-xl p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">£{nightlyRate}</span>
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

          <div className="border rounded-xl overflow-hidden">
            {/* Date Range Picker */}
            <div className="p-3 border-b hover:bg-gray-50">
              <DatePickerWithRangeSmall
              minNights={minNights}
              isOpen={isOpenDate}
              onOpenChange={setIsOpen}
                onDateChange={setDateRange}
                availableDates={availableDates}
                className="w-full"
              />
            </div>

            {/* Guests Dropdown */}
            <div className="p-3">
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

       <Button
  className="w-full"

  onClick={() => {
    if (!quoteData) {
      setIsOpen(true);
    } else {
      if (localStorage.getItem("access_token")) {
        handleClick();
      } else {
        openLoginModal();
      }
    }
  }}
>
  {loading
    ? "Loading..."
    : !quoteData
    ? "Check Availability"
    : "Book Now"}
</Button>


          {quoteData && (
            <>
              <p className="text-center text-sm text-gray-500">
                You won't be charged yet
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-center justify-between">
                  <div className="underline">Cleaning fee</div>
                  <div>£{cleaningFee}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="underline">Service fee</div>
                  <div>£{Number(serviceFeeValue).toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between border-t pt-3 font-semibold">
                  <div>Total</div>
                  <div>
                    £
                    {quoteData
                      ? totalAmount
                      : (
                          Number(PricePerNight) * nights +
                          Number(cleaningFee) +
                          Number(serviceFeeValue)
                        ).toFixed(2)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 my-6">
        <Button className="bg-[#8C8C8C] p-5 text-center">
          Contact the host
        </Button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#59D750] w-full hover:bg-[#67e15e] p-5 text-center flex items-center justify-center gap-2">
            <WIcon />
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
