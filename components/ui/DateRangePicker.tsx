"use client"

import * as React from "react"
import { addDays, addMonths, format, isAfter } from "date-fns"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRange } from "react-day-picker"
import { CalendarMonth } from "./CalendarMonth"
import { CalendarNavigation } from "../sections/BookingEngine/CalendarNavigation"

export function DatePickerWithRange({
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange?: (date: DateRange | undefined) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [clickStep, setClickStep] = React.useState<"from" | "to">("from")
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>(undefined)
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 7)); // August 2025
    const nextMonth = addMonths(currentMonth, 1);
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date)
    }
  }, [date])

  const handleDayClick = (day: Date) => {
    if (clickStep === "from") {
      setDate({ from: day, to: undefined })
      setClickStep("to")
    } else if (clickStep === "to") {
      if (date?.from && isAfter(date.from, day)) {
        setDate({ from: day, to: date.from })
      } else {
        setDate((prev) => ({
          from: prev?.from,
          to: day,
        }))
      }
      setClickStep("from")
      setOpen(false)
    }
  }

  return (
    <div className={cn("grid border-none", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <main
            id="date"
            className={cn(
              "w-auto border-none p-0 flex items-center bg-transparent hover:bg-transparent text-black justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  <div
                    className={cn(
                      "flex border-e-2 h-full items-center px-6 gap-2 lg:rounded-s-full rounded-s-lg  mr-2",
                      clickStep === "from" && open && "bg-[#EDEDED]"
                    )}
                  >
                    <Image src="/c.svg" alt="Check-in" width={20} height={20} className="h-8" />
                    <h5>
                      <span className="font-bold text-sm">Check in</span>
                      <br />
                      <span className="text-gray-500">{format(date.from, "LLL dd, y")}</span>
                    </h5>
                  </div>
                  <div
                    className={cn(
                      "flex gap-2 p-2 pe-6",
                      clickStep === "to" && open && "bg-[#EDEDED]"
                    )}
                  >
                    <Image src="/c.svg" alt="Check-out" width={20} height={20} className="h-8" />
                    <h5>
                      <span className="font-bold text-sm">Check Out</span>
                      <br />
                      <span className="text-gray-500">{format(date.to, "LLL dd, y")}</span>
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(
                      "flex gap-2 mr-2 rounded-lg p-2 px-6",
                      clickStep === "from" && open && "bg-[#EDEDED]"
                    )}
                  >
                    <Image src="/c.svg" alt="Check-in" width={20} height={20} className="h-8" />
                    <h5>
                      <span className="font-bold text-sm">Check in</span>
                      <br />
                      <span className="text-gray-500">{format(date.from, "LLL dd, y")}</span>
                    </h5>
                  </div>
                  <div
                    className={cn(
                      "flex gap-2 p-2 pe-6 py-2",
                      clickStep === "to" && open && "bg-[#EDEDED]"
                    )}
                  >
                    <Image src="/c.svg" alt="Check-out" width={20} height={20} className="h-8" />
                    <h5>
                      <span className="font-bold text-sm">Check Out</span>
                      <br />
                      <span className="text-gray-500">Pick a date</span>
                    </h5>
                  </div>
                </>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </main>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="rounded-2xl w-full p-0" align="start">
          <div className="flex flex-col gap-1 px-4 py-3">
            <h1 className="font-semibold">
              {clickStep === "from" ? "Select check in date" : "Select check out date"}
            </h1>
            <p className="text-[#8C8C8C] text-xs">Add your dates for exact pricing</p>
          </div>
   <CalendarNavigation
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
          <div className="flex flex-col sm:flex-row gap-4 p-4">
         <CalendarMonth
  month={currentMonth}
  dateRange={{ from: date?.from, to: date?.to }}
  selectingStart={clickStep === "from"}
  hoverDate={hoverDate}
  onDateClick={handleDayClick}
  onDateHover={setHoverDate}
  minNights={1}
/>
<div className=" hidden lg:block">
  <CalendarMonth
  month={addMonths(currentMonth, 1)}
  dateRange={{ from: date?.from, to: date?.to }}
  selectingStart={clickStep === "from"}
  hoverDate={hoverDate}
  onDateClick={handleDayClick}
  onDateHover={setHoverDate}
  minNights={1}
/>
</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
