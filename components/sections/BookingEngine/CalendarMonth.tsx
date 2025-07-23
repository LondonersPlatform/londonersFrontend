import React from "react";
import {
  format,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface CalendarMonthProps {
  month: Date;
  minCheckoutDate?: Date;
  maxCheckoutDate?: Date;
  dateRange: DateRange;
  loadingMin?: boolean;
  selectingStart: boolean;
  hoverDate: Date | undefined;
  minNights: number;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | undefined) => void;
  availableDates?: any;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  dateRange,
  loadingMin,
  selectingStart,
  minCheckoutDate,
  maxCheckoutDate,
  hoverDate,
  availableDates,
  minNights,
  onDateClick,
  onDateHover,
}) => {
  const isDateInRange = (date: Date) => {
    if (!dateRange.from || !dateRange.to) return false;
    return (
      (isAfter(date, dateRange.from) && isBefore(date, dateRange.to)) ||
      isSameDay(date, dateRange.from) ||
      isSameDay(date, dateRange.to)
    );
  };

  const availableDatesSet: Set<string> = new Set(
    (availableDates || []).map((d: Date | string) =>
      new Date(d).toDateString()
    )
  );

  const isDateInHoverRange = (date: Date) => {
    if (selectingStart || !dateRange.from || !hoverDate) return false;
    const startDate = dateRange.from;
    const endDate = hoverDate;
    if (isBefore(endDate, startDate)) return false;
    return (
      (isAfter(date, startDate) && isBefore(date, endDate)) ||
      isSameDay(date, startDate) ||
      isSameDay(date, endDate)
    );
  };

  const isDateSelected = (date: Date) => {
    return (
      (dateRange.from && isSameDay(date, dateRange.from)) ||
      (dateRange.to && isSameDay(date, dateRange.to))
    );
  };

  const isRangeStart = (date: Date) => {
    return (
      (dateRange.from && isSameDay(date, dateRange.from)) ||
      (!selectingStart &&
        dateRange.from &&
        hoverDate &&
        isSameDay(date, dateRange.from))
    );
  };

  const isRangeEnd = (date: Date) => {
    return (
      (dateRange.to && isSameDay(date, dateRange.to)) ||
      (!selectingStart &&
        dateRange.from &&
        hoverDate &&
        isSameDay(date, hoverDate))
    );
  };

  const getDateTooltip = (date: Date) => {
    if (dateRange.from && isSameDay(date, dateRange.from)) {
      return `Minimum ${minNights} nights`;
    }
    if (dateRange.from && !selectingStart && !dateRange.to) {
      const nightsDiff = differenceInDays(date, dateRange.from);
      if (nightsDiff > 0 && nightsDiff < minNights) {
        return `Minimum stay is ${minNights} nights`;
      }
    }
    return null;
  };

  const hasMinConsecutiveAvailableNights = (
    start: Date,
    nights: number,
    availableDatesSet: Set<string>
  ) => {
    for (let i = 0; i < nights; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      if (!availableDatesSet.has(current.toDateString())) {
        return false;
      }
    }
    return true;
  };

  const days: React.ReactNode[] = [];
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const leadingEmptyCells = monthStart.getDay();

  for (let i = 0; i < leadingEmptyCells; i++) {
    days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }

  let currentDate = new Date(monthStart);
  while (currentDate <= monthEnd) {
    const date = new Date(currentDate);
    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date);
    const isInHoverRange = isDateInHoverRange(date);
    const isToday = isSameDay(date, new Date());
    const tooltip = getDateTooltip(date);

    const blockCheckoutDueToUnavailability =
      !selectingStart &&
      dateRange.from &&
      !dateRange.to &&
      minNights > 1 &&
      !hasMinConsecutiveAvailableNights(
        dateRange.from,
        minNights,
        availableDatesSet
      );

    const effectiveSelectingStart = !dateRange.from || selectingStart;

    const isDisabled =
      blockCheckoutDueToUnavailability ||
      (effectiveSelectingStart &&
        (!availableDatesSet.has(date.toDateString()) ||
          !hasMinConsecutiveAvailableNights(
            date,
            minNights,
            availableDatesSet
          ))) ||
      (!effectiveSelectingStart &&
        ((!availableDatesSet.has(date.toDateString()) &&
          !(maxCheckoutDate && isSameDay(date, maxCheckoutDate))) ||
          (dateRange.from &&
            minCheckoutDate &&
            isBefore(date, minCheckoutDate)) ||
          (maxCheckoutDate && isAfter(date, maxCheckoutDate))));

    let rangeBackgroundClass = "";
    let roundedClass = "";
    if (isInRange || isInHoverRange) {
      rangeBackgroundClass =
        "bg-gray-100 transition-all duration-200 hover:bg-gray-150";

      if (isRangeStart(date) && isRangeEnd(date)) {
        roundedClass = "rounded-full";
      } else if (isRangeStart(date)) {
        roundedClass = "rounded-l-full";
      } else if (isRangeEnd(date)) {
        roundedClass = "rounded-r-full";
      }
    }

    // 🔄 Render skeleton if after check-in and loadingMin is true
    if (loadingMin && dateRange.from && isAfter(date, dateRange.from)) {
      days.push(
        <div
          key={`skeleton-${date.toISOString()}`}
          className="w-10 h-10 animate-pulse bg-gray-200 rounded-full"
        />
      );
    } else {
      const dateButton = (
        <div
          key={date.toISOString()}
          className={`relative h-10 flex items-center justify-center ${rangeBackgroundClass} ${roundedClass}`}
        >
          <button
            onClick={() => !isDisabled && onDateClick(date)}
            onMouseEnter={() =>
              !selectingStart && dateRange.from && onDateHover(date)
            }
            onMouseLeave={() => onDateHover(undefined)}
            disabled={isDisabled}
            className={`
              w-10 h-10 text-sm rounded-full transition-all duration-200 relative font-medium flex items-center justify-center z-10
              ${!isDisabled ? "text-gray-900 cursor-pointer" : "text-gray-300 cursor-not-allowed"}
              ${isSelected ? "bg-black text-white border-2 border-black" : ""}
              ${(isInRange || isInHoverRange) && !isSelected ? "hover:border-2 hover:border-black" : ""}
              ${isToday && !isSelected ? "font-bold border border-gray-400" : ""}
              ${isDisabled && !isSelected ? "text-gray-300 line-through cursor-not-allowed" : ""}
            `}
          >
            {date.getDate()}
          </button>
        </div>
      );

      days.push(
        tooltip ? (
          <TooltipProvider key={date.toISOString()}>
            <Tooltip>
              <TooltipTrigger asChild>{dateButton}</TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          dateButton
        )
      );
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div className="flex-1">
      <h3 className="font-semibold text-lg text-center mb-6 text-gray-900">
        {format(month, "MMMM yyyy")}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0 rounded-2xl transition-opacity duration-300">
        {days}
      </div>
    </div>
  );
};
