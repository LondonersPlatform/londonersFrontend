"use client";
import React, { createContext, useContext, useState } from "react";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface GuestBreakdown {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface BookingContextType {
  dateRange: DateRange;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  guestBreakdown: GuestBreakdown;
  setGuestBreakdown: React.Dispatch<React.SetStateAction<GuestBreakdown>>;
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  isDatePickerOpen: boolean;
  setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quoteData: any;
  setQuoteData: React.Dispatch<React.SetStateAction<any>>;
  guestCount: number;
  setGuestCount: React.Dispatch<React.SetStateAction<number>>;
  availableDates: any[];
  setAvailableDates: React.Dispatch<React.SetStateAction<any[]>>;
  loadingDates: boolean;
  setLoadingDates: React.Dispatch<React.SetStateAction<boolean>>;
  //
  MaxNumofGuests: number;
  setMaxNumofGuests: React.Dispatch<React.SetStateAction<number>>;
  minNight: number;
  setMinNight: React.Dispatch<React.SetStateAction<number>>;
  handleGuestChange: (totalGuests: number, breakdown: GuestBreakdown) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [guestBreakdown, setGuestBreakdown] = useState<GuestBreakdown>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [guests, setGuests] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [MaxNumofGuests, setMaxNumofGuests] = useState<number>(0);
  const [minNight, setMinNight] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleGuestChange = (
    totalGuests: number,
    breakdown: GuestBreakdown
  ) => {
    setGuests(totalGuests);
    setGuestCount(totalGuests);
    setGuestBreakdown(breakdown);
  };
  return (
    <BookingContext.Provider
      value={{
        dateRange,
        setDateRange,
        guestBreakdown,
        setGuestBreakdown,
        guests,
        setGuests,
        isDatePickerOpen,
        setIsDatePickerOpen,
        total,
        setTotal,
        quoteData,
        setQuoteData,
        guestCount,
        setGuestCount,
        availableDates,
        setAvailableDates,
        loadingDates,
        setLoadingDates,
        MaxNumofGuests,
        setMaxNumofGuests,
        minNight,
        setMinNight,
        handleGuestChange,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
