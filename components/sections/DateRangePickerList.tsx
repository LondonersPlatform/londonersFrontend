import React, { useEffect, useState } from 'react';
import { addMonths, isBefore } from 'date-fns';
import { DateRangeHeader } from './BookingEngine/DateRangeHeader';
import { CalendarNavigation } from './BookingEngine/CalendarNavigation';
import { CalendarMonth } from './BookingEngine/CalendarMonth';
import { DateRangeFooter } from './BookingEngine/DateRangeFooter';
import { getMinDaysByListingId } from '@/app/all-listings/Listing';
import { format } from "date-fns";
import { useBooking } from '@/context/DatePickerContext';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerListProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClose: () => void;

  availableDates: any;
  minNights?: any;
  listingId?: any;
}

export const DateRangePickerList: React.FC<DateRangePickerListProps> = ({
  listingId,

  onDateRangeChange,
  onClose,
  availableDates
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7)); // August 2025
  const nextMonth = addMonths(currentMonth, 1);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);

  const {
    dateRange,
    setDateRange,
    setQuoteData,
    
    setGuestCount,
    minNight,
    setMinNight,
  } = useBooking();

  const [maxCheckoutDate, setMaxCheckoutDate] = useState<Date | undefined>(
    undefined
  );

  const [minCheckoutDate, setMinCheckoutDate] = useState<Date | undefined>();
  const [loadingMin, setLoadingMin] = useState(false);

  const findFirstUnavailableDateAfter = (
    start: Date,
    dates: string[] | Date[]
  ) => {
    const sorted = dates.map((d) => new Date(d)).sort((a, b) => +a - +b);
    let current = new Date(start);

    for (let i = 0; i < 30; i++) {
      const nextDateStr = current.toDateString();
      if (!sorted.some((d) => new Date(d).toDateString() === nextDateStr)) {
        return current;
      }
      current.setDate(current.getDate() + 1);
    }
    return null;
  };

  useEffect(() => {
  if (dateRange.from && !dateRange.to) {
    setSelectingStart(false);

    const minCheckout = new Date(dateRange.from);
    minCheckout.setDate(minCheckout.getDate() + Number(minNight));
    setMinCheckoutDate(minCheckout);

    const unavailableAfter = findFirstUnavailableDateAfter(
      minCheckout,
      availableDates
    );
    setMaxCheckoutDate(unavailableAfter || undefined);
  }
}, [dateRange.from, dateRange.to, availableDates, minNight]);


useEffect(() => {
  if (dateRange.from && selectingStart === false) {
    const minCheckout = new Date(dateRange.from);
    minCheckout.setDate(minCheckout.getDate() + minNight);
    setMinCheckoutDate(minCheckout);

    const unavailableAfter = findFirstUnavailableDateAfter(
      minCheckout,
      availableDates
    );

    if (unavailableAfter) {
      setMaxCheckoutDate(new Date(unavailableAfter));
    } else {
      setMaxCheckoutDate(undefined);
    }
  }
}, [dateRange.from, minNight, availableDates, selectingStart]);


  const nights = dateRange.from && dateRange.to
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
const handleDateClick = (date: Date) => {
  if (selectingStart || !dateRange.from) {
    const minNightsValue = Number(minNight ?? 1); // ensure it's a number

    // Optimistically calculate min/max checkout dates
    const minCheckout = new Date(date);
    minCheckout.setDate(minCheckout.getDate() + minNightsValue);
    setMinCheckoutDate(minCheckout);

    const unavailableAfter = findFirstUnavailableDateAfter(
      minCheckout,
      availableDates
    );
    setMaxCheckoutDate(unavailableAfter || undefined);

    // Set the range
    onDateRangeChange({ from: date, to: undefined });
    setSelectingStart(false);
  } else {
    // Selecting checkout
    if (isBefore(date, dateRange.from)) {
      onDateRangeChange({ from: date, to: dateRange.from });
    } else {
      onDateRangeChange({ from: dateRange.from, to: date });
    }

    setSelectingStart(true);
    setMinCheckoutDate(undefined);
    setMaxCheckoutDate(undefined);
  }

  setHoverDate(undefined);
};

 const clearDates = () => {
  onDateRangeChange({ from: undefined, to: undefined });
  setSelectingStart(true);
  setHoverDate(undefined);
  setMinCheckoutDate(undefined);  // ✅ Clear min checkout
  setMaxCheckoutDate(undefined);  // ✅ Clear max checkout
};
   useEffect(() => {
    const fetchMinNights = async () => {
      if (!dateRange?.from) return;

      setLoadingMin(true); 

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
      } finally {
        setLoadingMin(false); 
      }
    };

    fetchMinNights();
  }, [dateRange?.from, listingId]);

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
    <div className="relative">
      <div className="bg-white scale-100 rounded-3xl border-gray-200 max max-w-[90vw]">
        <DateRangeHeader
          dateRange={dateRange}
          className=""
          hideDatesPreview={true}
          nights={nights}
          onDateRangeChange={onDateRangeChange}
        />

 <div className=' absolute top-24   w-full'>
       <CalendarNavigation
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />

 </div>

        <div className="grid lg:grid-cols-2 py-12 lg:px-4 pb-6 gap-8"
                key={loadingMin ? "loading" : "ready"} // ✅ This forces unmount/remount
        >
          <CalendarMonth
          loadingMin={loadingMin}
            availableDates={availableDates}
            month={currentMonth}
            dateRange={dateRange}
            selectingStart={selectingStart}
            hoverDate={hoverDate}
            minNights={Number(minNight)}
                minCheckoutDate={minCheckoutDate}
              maxCheckoutDate={maxCheckoutDate}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
          <div className="lg:block hidden">
            <CalendarMonth
              availableDates={availableDates}
              month={nextMonth}
              loadingMin={loadingMin}
              dateRange={dateRange}
                  minCheckoutDate={minCheckoutDate}
              maxCheckoutDate={maxCheckoutDate}
              selectingStart={selectingStart}
              hoverDate={hoverDate}
              minNights={Number(minNight)}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
            />
          </div>
        </div>

        <DateRangeFooter
          className="flex items-center justify-between border-t border-gray-200 bg-transparent rounded-b-3xl"
          onClearDates={clearDates}
          onClose={onClose}
          hideClose={true}
        />
      </div>
    </div>
  );
};
