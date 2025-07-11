import React, { useEffect, useState } from "react";
import { Calendar, Users, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./DateRangePicker";
import { PricingBreakdown } from "./PricingBreakdown";
import { usePathname, useRouter } from "next/navigation";
import WIcon from "@/public/svg-assets/WIcon";
import {
  createQuote,
  getCalendarByListingId,
  getMinDaysByListingId,
} from "@/app/all-listings/Listing";
import { useLoginModal } from "@/context/login-modal-context";
import GuestSelector from "@/components/GuestSelector";
import { useBooking } from "@/context/DatePickerContext";
import BottomBookingBar from "@/components/layout/components/BottomBookingBar";

const BookingCard = ({
  PricePerNight,
  serviceFee,
  rate,
  nameBook,
  Cleaningfee,
  whatsup,
  MaxNumofGuests,
  listingId,
}: any) => {
  const {
    dateRange,
    setDateRange,
    guestBreakdown,
    setGuestBreakdown,
    guests,
    setTotal,
    setGuests,
    isDatePickerOpen,
    setIsDatePickerOpen,
    quoteData,
    minNight,
    setQuoteData,
    guestCount,
    handleGuestChange,
    setAvailableDates,
    availableDates,
    setGuestCount,
    setMinNight
  } = useBooking();

  const [loadingDates, setLoadingDates] = useState(true);
  const [isOpenDate, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [error, setError] = useState<string | null>(null);
  const basePrice = PricePerNight;

  const nights =
    dateRange.from && dateRange.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 6;

  const subtotal = basePrice * nights;
  const earlyBirdDiscount = 22.08;

  const invoiceItems =
    quoteData?.guesty_quote.rates.ratePlans[0].money.money.invoiceItems;

  const total = invoiceItems?.reduce(
    (sum: any, item: any) => sum + item.amount,
    0
  );

  const pathname = usePathname();

  const currentUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const whatsappLink = `https://wa.me/${whatsup}?text=I'm%20interested%20in%20this%20listing:%20${encodeURIComponent(
    currentUrl
  )}`;

  const openLoginModal = () => {
    const query = new URLSearchParams({
      quoteId: quoteData?.guesty_quote._id,
      PricePerNight: PricePerNight,
      serviceFee: serviceFee,
      Cleaningfee: Cleaningfee,
      whatsup: whatsup,
      MaxNumofGuests: MaxNumofGuests,
      listingId: listingId,
      nameBook: nameBook
    });

    setRedirectPath(`/Payment?${query.toString()}`);
    setLoginOpen(true);
  };

  useEffect(() => {
    const fetchMinNights = async () => {
      if (!dateRange?.from) return;

      try {
        const response = await getMinDaysByListingId(
          listingId,
          format(dateRange.from, "yyyy-MM-dd")
        );

        if (response?.minNights) {
          setMinNight(response.minNights);
        }
      } catch (error) {
        console.error("Error fetching min nights:", error);
      }
    };

    fetchMinNights();
  }, [dateRange?.from, listingId]);

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
  }, [dateRange, guestCount, listingId, guestBreakdown]);

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
      nameBook: nameBook
    });

    router.push(`/Payment?${query.toString()}`);
  };

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const dates = await getCalendarByListingId(listingId);
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error loading calendar dates:", error);
      } finally {
        setLoadingDates(false);
      }
    };

    fetchDates();
  }, [listingId]);

  // ✅ Reset on listingId change
  useEffect(() => {
    setDateRange({ from: undefined, to: undefined });
    setQuoteData(null);
    setGuestCount(1);
  }, [listingId]);

  // ✅ Reset on unmount
  useEffect(() => {
    return () => {
      setDateRange({ from: undefined, to: undefined });
      setQuoteData(null);
      setGuestCount(1);
    };
  }, []);

  return (
    <>
      <Card className="w-full mx-auto p-6 md:block hidden shadow-xl border border-gray-200 rounded-xl bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              £{basePrice} /
            </span>
            <span className="text-gray-600">night</span>
          </div>
          <div className="flex font-bold gap-3 items-center mt-1">
            <div className="flex items-center">
              <span className="ml-1 text-sm font-semibold font-medium text-gray-900">
                4.9
              </span>
            </div>
            <span className="text-sm text-gray-600 underline">
              (73 reviews)
            </span>
          </div>
        </div>

        {error && (
          <div className="text-red-500 my-2 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
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
              MaxNumofGuests={MaxNumofGuests}
              onGuestChange={handleGuestChange}
              initialGuests={guests}
            />
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-black to-black hover:from-gray-600 hover:to-black text-white font-semibold py-4 rounded-lg text-base transition-all duration-200 shadow-lg"
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
            <p className="text-center text-sm text-gray-600 mt-4">
              You won't be charged yet
            </p>
            <PricingBreakdown
              basePrice={basePrice}
              nights={nights}
              subtotal={subtotal}
              earlyBirdDiscount={earlyBirdDiscount}
              serviceFee={Cleaningfee}
              total={total}
            />
          </>
        )}
      </Card>

      <BottomBookingBar
        quoteData={quoteData}
        basePrice={basePrice}
        nights={nights}
        subtotal={subtotal}
        earlyBirdDiscount={earlyBirdDiscount}
        Cleaningfee={Cleaningfee}
        total={total}
        loading={loading}
        setIsOpen={setIsOpen}
        handleClick={handleClick}
        openLoginModal={openLoginModal}
      />

      <div className="flex flex-col gap-2 my-6">
        <Button className="bg-[#8C8C8C] p-5 text-center">Contact the host</Button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#59D750] w-full hover:bg-[#67e15e] p-5 text-center flex items-center justify-center gap-2">
            <WIcon />
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </>
  );
};

export default BookingCard;
