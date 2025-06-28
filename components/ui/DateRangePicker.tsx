"use client"

import * as React from "react"
import { addDays, format, isAfter } from "date-fns"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRange } from "react-day-picker"

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
        // If user selects a "to" date before "from" date — swap
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
    <div className={cn("grid  border-none", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
      <main
  id="date"
  className={cn(
    "w-auto border-none p-0 flex items-center   bg-transparent   hover:bg-transparent text-black justify-start text-left font-normal",
    !date && "text-muted-foreground"
  )}
>
  {date?.from ? (
    date.to ? (
      <>
        <div
          className={cn(
            "flex border-e-2 h-full  items-center px-6 gap-2 rounded-s-full    mr-2  ",
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
            "flex gap-2  p-2 pe-6",
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
            "flex gap-2 mr-2  rounded-lg p-2 px-6",
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
            "flex gap-2  p-2 pe-6 py-2",
            clickStep === "to" && open && "bg-[#EDEDED] "
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
     <Calendar
  initialFocus
  mode="single"
  selected={undefined}
  onDayClick={handleDayClick}
  defaultMonth={date?.from}
  numberOfMonths={2}
  modifiers={{
    day_inRange: "bg-gray-200 text-black",
    
    selected: (day) =>
      (date?.from && day.toDateString() === date.from.toDateString()) ||
      (date?.to && day.toDateString() === date.to.toDateString()),
    inRange: (day) =>
      date?.from && date?.to && day > date.from && day < date.to,
  }}
  modifierClassNames={{
    selected: "bg-black text-white",        
    inRange: "bg-gray-700",  
              day_selected:
    "bg-primary rounded-full text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",

  }}
 
 
 

/>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
