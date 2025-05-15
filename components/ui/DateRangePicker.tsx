"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (checkIn: string, checkOut: string) => void;
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      const checkIn = format(newDate.from, "yyyy-MM-dd");
      const checkOut = format(newDate.to, "yyyy-MM-dd");
      onDateChange?.(checkIn, checkOut);
    }
  };

  return (
    <div className={cn("grid border-none gap-2", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            id="date"
            className={cn(
              "w-auto border-none bg-transparent hover:bg-transparent text-black justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  <div className="flex  border-e-2 pe-5   gap-2 mr-2  ">
                    <Image
                      src="/c.svg"
                      alt="LONDONERS"
                      width={20}
                      height={20}
                      className="h-8"
                    />
                    <h5>
                      <span className=" font-medium">Check in</span>
                      <br />
                      <span className="text-gray-500">
                        {format(date.from, "LLL dd, y")}
                      </span>
                    </h5>
                  </div>

                  <div className="flex gap-2 ">
                    <Image
                      src="/c.svg"
                      alt="LONDONERS"
                      width={20}
                      height={20}
                      className="h-8"
                    />
                    <h5>
                      <span className=" font-medium">Check Out</span>
                      <br />
                      <span className="text-gray-500">
                        {format(date.to, "LLL dd, y")}
                      </span>
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex   gap-2 mr-2  ">
                    <Image
                      src="/c.svg"
                      alt="LONDONERS"
                      width={20}
                      height={20}
                      className="h-8"
                    />
                    <h5>
                      <span className=" font-medium">Check in</span>
                      <br />
                      <span className="text-gray-500">
                        {format(date.from, "LLL dd, y")}
                      </span>
                    </h5>
                  </div>

                  <div className="flex gap-2 ">
                    <Image
                      src="/c.svg"
                      alt="LONDONERS"
                      width={20}
                      height={20}
                      className="h-8"
                    />
                    <h5>
                      <span className=" font-medium">Check Out</span>
                      <br />
                      <span className="text-gray-500">Pick a date</span>
                    </h5>
                  </div>
                </>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
