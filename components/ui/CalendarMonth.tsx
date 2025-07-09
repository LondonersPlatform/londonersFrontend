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
  dateRange: DateRange;
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
  selectingStart,
  hoverDate,
  availableDates,
  minNights,
  onDateClick,
  onDateHover,
}) => {
  const isDateInRange = (date: Date) => {
    if (!dateRange.from || !dateRange.to) return false;
 return (isAfter(date, dateRange.from) && isBefore(date, dateRange.to)) ||
           isSameDay(date, dateRange.from) || 
           isSameDay(date, dateRange.to);
  };

  console.log("availableDates===>", availableDates);

  const availableDatesSet = new Set(
    (availableDates || []).map((d: Date | string) => new Date(d).toDateString())
  );
  const isDateInHoverRange = (date: Date) => {
    if (selectingStart || !dateRange.from || !hoverDate) return false;

    const startDate = dateRange.from;
    const endDate = hoverDate;

    if (isBefore(endDate, startDate)) return false;

      return (isAfter(date, startDate) && isBefore(date, endDate)) ||
           isSameDay(date, startDate) ||
           isSameDay(date, endDate);
  };

  const isDateSelected = (date: Date) => {
    return (
      (dateRange.from && isSameDay(date, dateRange.from)) ||
      (dateRange.to && isSameDay(date, dateRange.to))
    );
  };

  const isRangeStart = (date: Date) => {
    if (dateRange.from && dateRange.to && isSameDay(date, dateRange.from))
      return true;
    if (
      !selectingStart &&
      dateRange.from &&
      hoverDate &&
      isSameDay(date, dateRange.from)
    )
      return true;
    return false;
  };

  const isRangeEnd = (date: Date) => {
    if (dateRange.from && dateRange.to && isSameDay(date, dateRange.to))
      return true;
    if (
      !selectingStart &&
      dateRange.from &&
      hoverDate &&
      isSameDay(date, hoverDate)
    )
      return true;
    return false;
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

  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());

  const days = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    const date = new Date(currentDate);
    const isCurrentMonth = isSameMonth(date, month);
    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date);
    const isInHoverRange = isDateInHoverRange(date);
    const isToday = isSameDay(date, new Date());
    const tooltip = getDateTooltip(date);

    const isDisabled =
      !isCurrentMonth ||

      (dateRange.from &&
        !selectingStart &&
        differenceInDays(date, dateRange.from) > 0 &&
        differenceInDays(date, dateRange.from) < minNights) ||
      (dateRange.from && !selectingStart && isBefore(date, dateRange.from));

    // Determine background styling for continuous range
    let rangeBackgroundClass = "";
    let roundedClass = '';
  if (isInRange || isInHoverRange) {
      rangeBackgroundClass = 'bg-gray-100 transition-all duration-200 hover:bg-gray-150';
      
      // Add rounded corners for start and end of range
      if (isRangeStart(date) && isRangeEnd(date)) {
        // Single day selection
        roundedClass = 'rounded-full';
      } else if (isRangeStart(date)) {
        roundedClass = 'rounded-l-full';
      } else if (isRangeEnd(date)) {
        roundedClass = 'rounded-r-full';
      }
    }
    const dateButton = (
      <div
        key={date.toISOString()}
        className={`relative h-10 flex items-center justify-center ${rangeBackgroundClass} ${roundedClass}`}
     
      >
        <button
          onClick={() => isCurrentMonth && !isDisabled && onDateClick(date)}
          onMouseEnter={() =>
            !selectingStart && dateRange.from && onDateHover(date)
          }
          onMouseLeave={() => onDateHover(undefined)}
          disabled={!isCurrentMonth || isDisabled}
          className={`
            w-10 h-10 text-sm rounded-full transition-all duration-200 relative font-medium flex items-center justify-center z-10
            ${
              isCurrentMonth && !isDisabled
                ? "hover:bg-gray-100 hover:border-[2px] hover:border-[#000] text-gray-900 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }
            ${
              isSelected
                ? "bg-black text-white hover:bg-gray-800   border-2 border-black"
                : ""
            }
            ${
              (isInRange || isInHoverRange) && !isSelected
                ? "hover:border-2 hover:border-black"
                : ""
            }
            ${isToday && !isSelected ? "font-bold border border-gray-400" : ""}
            ${
              isDisabled ? "text-gray-300  line-through cursor-not-allowed" : ""
            }
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
              <p>{"Check in"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        dateButton
      )
    );

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div className="flex-1 ">
        
      <h3 className="font-semibold text-sm text-center mb-6 text-gray-900">
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
        <div className="grid grid-cols-7 gap-0 rounded-2xl">{days}</div>
    </div>
  );
};
