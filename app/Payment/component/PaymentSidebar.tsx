"use client"

import { CalendarIcon, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the props interface for the component
interface BookingSidebarProps {
  checkInDate: Date | undefined
  setCheckInDate: (date: Date | undefined) => void
  checkOutDate: Date | undefined
  setCheckOutDate: (date: Date | undefined) => void
  guests: string
  setGuests: (guests: string) => void
  dailyCleaningCount: number
  setDailyCleaningCount: (count: number) => void
  babysittingCount: number
  setBabysittingCount: (count: number) => void
}

export function BookingSidebar({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  dailyCleaningCount,
  setDailyCleaningCount,
  babysittingCount,
  setBabysittingCount
}: BookingSidebarProps) {
  // Guest options
  const guestOptions = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" }
  ]

  // Extra services
  const extraServices = [
    { 
      count: dailyCleaningCount, 
      setCount: setDailyCleaningCount, 
      label: "Daily cleaning services", 
      price: "$100" 
    },
    { 
      count: babysittingCount, 
      setCount: setBabysittingCount, 
      label: "Babysitting services", 
      price: "$100" 
    }
  ]

  // Price items
  const priceItems = [
    { label: "price per night", value: "$120" },
    { label: "Cleaning fees", value: "$20" },
    { label: "Monthly discount", value: "-$20", discount: true }
  ]
const DatePicker = ({ date, setDate, label }: any) => (
  <div>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start block h-16 text-left font-normal mt-1",
            !date && "text-muted-foreground"
          )}
        >
          <p className="text-sm font-medium">{label}</p>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  </div>
)
  return (
    <div className="space-y-6">
      <div className="bg-[#F9F9F9]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4 border-b-2 pb-4">
              <div className="w-full h-full bg-gray-200 rounded-md overflow-hidden">
                <img
                  src="/r.png"
                  alt="Apartment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" ">
                <h3 className="font-medium">Marlybone book</h3>
                <p className="text-sm text-gray-600">
                  Experience ultimate comfort in this luxurious Marlybone apartment with super high ceilings and a
                  massive 90-inch Smart 4K TV. It offers...
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-0">
              <DatePicker date={checkInDate} setDate={setCheckInDate} label="Check in" />
              <DatePicker date={checkOutDate} setDate={setCheckOutDate} label="Check out" />
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">Guests</p>
              <Select 
                defaultValue="1" 
                onValueChange={setGuests}
                value={guests}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 rounded-xl p-4 shadow border-[#8C8C8CFC] border-[1px]">
              <h4 className="font-medium mb-2">Extra</h4>
              {extraServices.map((service, index) => (
                <Counter key={index} {...service} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {priceItems.map((item, index) => (
                <PriceItem key={index} {...item} />
              ))}

              <div className="pt-4 border-t ">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total price</p>
                    <p className="text-xs text-gray-500">8 nights</p>
                  </div>
                  <p className="text-xl font-bold">$1200</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Reusable components that were previously in the main file
function Counter({ count, setCount, label, price }: {
  count: number
  setCount: (count: number) => void
  label: string
  price: string
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-gray-500">{price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-black text-white hover:bg-gray-800"
          onClick={() => setCount(count + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

function PriceItem({ label, value, discount = false }: {
  label: string
  value: string
  discount?: boolean
}) {
  return (
    <div className="flex justify-between">
      <p className="text-sm">{label}</p>
      <p className={`font-medium ${discount ? 'text-green-600' : ''}`}>{value}</p>
    </div>
  )
}