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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid border-none gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent className=" w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
