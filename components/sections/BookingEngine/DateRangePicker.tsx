import React, { useEffect, useState } from "react";
import {
  addMonths,
  isSameDay,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";
import { DateRangeHeader } from "./DateRangeHeader";
import { CalendarNavigation } from "./CalendarNavigation";
import { CalendarMonth } from "./CalendarMonth";
import { DateRangeFooter } from "./DateRangeFooter";
import { useBooking } from "@/context/DatePickerContext";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClose: () => void;
  availableDates: any;
  minNights?: any;
  loadingMin?: boolean; 
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  minNights,
  loadingMin,
  onDateRangeChange,
  onClose,
  availableDates,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7)); // August 2025
  const nextMonth = addMonths(currentMonth, 1);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [maxCheckoutDate, setMaxCheckoutDate] = useState<Date | undefined>(
    undefined
  );

  const [minCheckoutDate, setMinCheckoutDate] = useState<Date | undefined>();
  const {
    
    setMinNight
  } = useBooking();
  // Calculate nights based on dateRange
  const nights =
    dateRange.from && dateRange.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
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
      minCheckout.setDate(minCheckout.getDate() + Number(minNights));
      setMinCheckoutDate(minCheckout);

      const unavailableAfter = findFirstUnavailableDateAfter(
        minCheckout,
        availableDates
      );
      setMaxCheckoutDate(unavailableAfter || undefined);
    }
  }, [dateRange.from, dateRange.to, availableDates, minNights]);

  useEffect(() => {
    if (dateRange.from && selectingStart === false) {
      const minCheckout = new Date(dateRange.from);
      minCheckout.setDate(minCheckout.getDate() + minNights);
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
  }, [dateRange.from, minNights, availableDates, selectingStart]);

  const handleDateClick = (date: Date) => {
    if (selectingStart || !dateRange.from) {
      const minNightsValue = Number(minNights ?? 1); // ensure it's a number

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
  // Reset calendar logic first
  setSelectingStart(true);
  setHoverDate(undefined);
  setMinCheckoutDate(undefined);
  setMaxCheckoutDate(undefined);
  setMinNight(1);
  // Then update the selected date range
  onDateRangeChange({ from: undefined, to: undefined });
};


useEffect(() => {
  if (!dateRange.from && !dateRange.to) {
    setSelectingStart(true);
    setHoverDate(undefined);
    setMinCheckoutDate(undefined);
    setMaxCheckoutDate(undefined);
  
    setMinNight(1); // reset minimum night to default
  }
}, [dateRange.from, dateRange.to]);
  return (
    <div className=" relative">
      <div className="bg-white scale-100 rounded-3xl shadow-2xl border border-gray-200 w-[850px] max-w-[90vw] ">
     <DateRangeHeader
  key={dateRange.from ? "editing" : "cleared"}
  dateRange={dateRange}
  nights={nights}
  onDateRangeChange={onDateRangeChange}
/>

        <CalendarNavigation
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />

        <div className="lg:grid lg:grid-cols-2 px-4 pb-6 gap-6"
          key={loadingMin ? "loading" : "ready"} // ✅ This forces unmount/remount
        >
          <CalendarMonth
          loadingMin={loadingMin}
            availableDates={availableDates}
            minCheckoutDate={minCheckoutDate}
            maxCheckoutDate={maxCheckoutDate}
            month={currentMonth}
            dateRange={dateRange}
            selectingStart={selectingStart}
            hoverDate={hoverDate}
            minNights={Number(minNights)}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
          <div className=" lg:block  hidden">
            <CalendarMonth
              availableDates={availableDates}
              month={nextMonth}
              loadingMin={loadingMin}
              dateRange={dateRange}
              minCheckoutDate={minCheckoutDate}
              maxCheckoutDate={maxCheckoutDate}
              selectingStart={selectingStart}
              hoverDate={hoverDate}
              minNights={Number(minNights)}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
            />
          </div>
        </div>

        <DateRangeFooter onClearDates={clearDates} onClose={onClose} />
      </div>
    </div>
  );
};
