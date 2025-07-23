"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import './index.css'
import { isAfter, isBefore, isSameDay } from "date-fns";
export function DatePickerWithRangeSmall({
  className,
  availableDates = [],
  isOpen,
  minNights,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  availableDates?: { date: string; status: string }[];
  isOpen?:boolean
  minNights?:any,
  onDateChange?: (date: DateRange | undefined) => void;
}) {
  const [open, setOpen] = React.useState( isOpen ||false);

React.useEffect(() => {
  setOpen(isOpen || false);
}, [isOpen]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [activeSelection, setActiveSelection] = React.useState<'checkin' | 'checkout'>('checkin');

  React.useEffect(() => {
    onDateChange?.(date);
    if (date?.from && date?.to) {
      setOpen(false);
    }
  }, [date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    // If both dates are selected — start new selection
    if (date?.from && date?.to) {
      setDate({ from: selectedDate, to: undefined });
      setActiveSelection('checkout');
      return;
    }

    // If no check-in date selected yet
    if (!date?.from) {
      setDate({ from: selectedDate, to: undefined });
      setActiveSelection('checkout');
      return;
    }

    // If selecting check-out date
    if (date.from && !date.to) {
      if (selectedDate < date.from) {
        // If selected date is before check-in, treat it as new check-in
        setDate({ from: selectedDate, to: undefined });
        setActiveSelection('checkout');
      } else {
        // Set as check-out
        setDate({ from: date.from, to: selectedDate });
        setActiveSelection('checkin');
      }
    }
  };

  const handleCheckInClick = () => {
    setDate({ from: undefined, to: undefined });
    setActiveSelection('checkin');
    setOpen(true);
  };

  const handleCheckOutClick = () => {
    if (!date?.from) {
      handleCheckInClick();
      return;
    }
    setActiveSelection('checkout');
    setOpen(true);
  };

  
  return (
    <div className={cn("grid border-none text-sm gap-2", className)}>


      
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className=" items-center gap-4 grid grid-cols-2 rounded-lg border-gray-200 hover:border-gray-300 transition-colors">
            <div
              className={cn(
                "flex gap-2 p-2 rounded-md cursor-pointer",
                (activeSelection === 'checkin' || (date?.from && date?.to)) &&
                  "bg-gray-100 border border-gray-300"
              )}
              onClick={handleCheckInClick}
            >
              <Image src="/c.svg" alt="Check in icon" width={20} height={20} className="h-6 w-6" />
              <div>
                <span className="font-medium block">Check in</span>
                <span className="text-gray-500 text-sm block">
                  {date?.from ? format(date.from, "LLL dd, y") : "Add date"}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "flex gap-2 p-2 rounded-md cursor-pointer",
                activeSelection === 'checkout' && !date?.to && "bg-gray-100 border border-gray-300",
                !date?.from && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleCheckOutClick}
            >
              <Image src="/c.svg" alt="Check out icon" width={20} height={20} className="h-6 w-6" />
              <div>
                <span className="font-medium block">Check out</span>
                <span className="text-gray-500 text-sm block">
                  {date?.to ? format(date.to, "LLL dd, y") : date?.from ? "Add date" : "Add date"}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="rounded-2x scale-90 w-auto p-0 shadow-lg"
          align="start"
          onInteractOutside={() => setOpen(false)}
        >
<Calendar
  initialFocus
  mode="single"
  defaultMonth={date?.from}
  selected={undefined}
  onSelect={handleDateSelect}
  numberOfMonths={2}
 activeSelection={activeSelection}
  selectedDateRange={date} // 👈 pass this
  minNights={minNights}    // 👈 pass this
  availableDates={availableDates}

  
  modifiers={{

    
    rangeStart: (day) => (date?.from ? isSameDay(day, date.from) : false),
    rangeEnd: (day) => (date?.to ? isSameDay(day, date.to) : false),
    rangeMiddle: (day) => {
      if (!date?.from || !date?.to) return false;
      const isInRange = isAfter(day, date.from) && isBefore(day, date.to);
      const isStart = isSameDay(day, date.from);
      const isEnd = isSameDay(day, date.to);
      return isInRange && !isStart && !isEnd;
    },
    rangeSingle: (day) => {
      if (!date?.from || !date?.to) return false;
      return isSameDay(day, date.from) && isSameDay(day, date.to);
    },
  }}
  modifiersClassNames={{
    rangeStart: "range-start-date",
    rangeEnd: "range-end-date",
    rangeMiddle: "range-middle-date",
  }}

  
  className="simple-pill-calendar"
components={{
  DayContent: ({ date, modifiers = {} }) => {
    const isRangeMiddle = modifiers.rangeMiddle;
    const isRangeStart = modifiers.rangeStart;
    const isRangeEnd = modifiers.rangeEnd;

    return (
      <div
        className={cn(
          "day-wrapper",
          isRangeMiddle && "bg-gray-100",
          isRangeStart && "bg-black text-white rounded-l-full",
          isRangeEnd && "bg-black text-white rounded-r-full"
        )}
      >
        <span>{date.getDate()}</span>
      </div>
    );
  },
}}


/>


        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
