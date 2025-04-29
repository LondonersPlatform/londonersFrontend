"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function PropertyBooking() {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2025, 2, 30)) // March 30, 2025
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2025, 3, 6)) // April 6, 2025
  const [guestCount, setGuestCount] = useState(2)

  // Calculate the number of nights between check-in and check-out
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

  // Calculate costs
  const nightlyRate = 129
  const subtotal = nightlyRate * nights
  const cleaningFee = 60
  const serviceFee = 137
  const total = subtotal + cleaningFee + serviceFee

  return (
    <section className="sticky top-6">
      <div className="border rounded-xl p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">${nightlyRate}</span>
              <span className="text-gray-500"> / night</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">4.9</span>
              <span className="text-gray-500 ml-1">(42 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border rounded-xl overflow-hidden">
            {/* Check-in Date Picker */}
            <div className="p-3 border-r border-b">
              <div className="text-xs font-medium">CHECK-IN</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                    <span>{format(checkInDate, "M/d/yyyy")}</span>
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={(date) => date && setCheckInDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date Picker */}
            <div className="p-3 border-b">
              <div className="text-xs font-medium">CHECK-OUT</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                    <span>{format(checkOutDate, "M/d/yyyy")}</span>
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={(date) => date && setCheckOutDate(date)}
                    initialFocus
                    disabled={(date) => date < checkInDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests Dropdown */}
            <div className="p-3 col-span-2">
        
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full py-8 justify-between p-0 h-auto font-normal">
                    <span>
                    <div className="text-xs font-medium">GUESTS</div>
                      {guestCount} {guestCount === 1 ? "guest" : "guests"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <DropdownMenuItem
                      key={num}
                      onClick={() => setGuestCount(num)}
                      className={cn("cursor-pointer", guestCount === num && "font-medium bg-accent")}
                    >
                      {num} {num === 1 ? "guest" : "guests"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Button className="w-full">Reserve</Button>
          <p className="text-center text-sm text-gray-500">You won't be charged yet</p>

          <div className="space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <div className="underline">
                ${nightlyRate} x {nights} nights
              </div>
              <div>${subtotal}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="underline">Cleaning fee</div>
              <div>${cleaningFee}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="underline">Service fee</div>
              <div>${serviceFee}</div>
            </div>
            <div className="flex items-center justify-between border-t pt-3 font-semibold">
              <div>Total</div>
              <div>${total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-6">
        <Button className="bg-[#8C8C8C] p-5 text-center">Contact the host</Button>
        <Button className="bg-[#59D750] p-5 text-center">Chat on WhatsApp</Button>
      </div>
    </section>
  )
}
