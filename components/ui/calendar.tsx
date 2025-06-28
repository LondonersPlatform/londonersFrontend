"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  availableDates?: Date[];
  showheader?: boolean;
};

function Calendar({
  className,
  classNames,
  availableDates = [],
  showheader = true,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const disableUnavailableDates = (date: Date) => {
    if (availableDates.length === 0) return false;
    
    // Compare dates without time components
    const dateTime = new Date(date).setHours(0, 0, 0, 0);
    return !availableDates.some(availDate => 
      new Date(availDate).setHours(0, 0, 0, 0) === dateTime
    );
  };

  return (
    <>
      {showheader && (
        <div className="flex flex-col gap-1 px-4 py-3">
          <h1 className="font-semibold">Select check in date</h1>
          <p className="text-[#8C8C8C] text-xs">Add your dates for exact pricing</p>
        </div>
      )}

      <DayPicker
        disabled={disableUnavailableDates}
        showOutsideDays={showOutsideDays}
        className={cn("p-3 z-[100]", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants.outline,
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous:
            "absolute border-[0px] rounded-2xl left-1 hover:border-[0px] hover:bg-transparent",
          nav_button_next:
            "absolute rounded-2xl border-[0px] right-1 hover:border-[0px] hover:bg-transparent",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-full w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell:
            "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants.ghost,
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary rounded-full text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent rounded-full border text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };