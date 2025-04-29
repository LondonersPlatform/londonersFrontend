"use client"

import { useState } from "react"
import { CalendarIcon, CreditCard, User, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Types
type FormFieldProps = {
  id: string
  label: string
  placeholder: string
  required?: boolean
  type?: string
  className?: string
}

type CountrySelectProps = {
  id: string
  label: string
  required?: boolean
  className?: string
}

type DatePickerProps = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label: string
}

type CounterProps = {
  count: number
  setCount: (count: number) => void
  label: string
  price: string
}

type PriceItemProps = {
  label: string
  value: string
  discount?: boolean
}

type GuestOption = {
  value: string
  label: string
}

type CountryOption = {
  value: string
  label: string
  flag?: string
}

// Reusable Components
const FormField = ({ id, label, placeholder, required = true, type = "text", className = "" }: FormFieldProps) => (
  <div className={`space-y-2 ${className}`}>
    <Label htmlFor={id}>
      {label}{required && <span className="text-red-500">*</span>}
    </Label>
    <Input id={id} type={type} placeholder={placeholder} />
  </div>
)

const CountrySelect = ({ id, label, required = true, className = "" }: CountrySelectProps) => {
  const countries: CountryOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" }
  ]

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <Select>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select country..." />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const PhoneCountrySelect = () => {
  const phoneCountries: CountryOption[] = [
    { value: "us", label: "🇺🇸 +1", flag: "🇺🇸" },
    { value: "uk", label: "🇬🇧 +44", flag: "🇬🇧" },
    { value: "eu", label: "🇪🇺 +33", flag: "🇪🇺" }
  ]

  return (
    <Select defaultValue="us">
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="🇺🇸" />
      </SelectTrigger>
      <SelectContent>
        {phoneCountries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const DatePicker = ({ date, setDate, label }: DatePickerProps) => (
  <div>
    
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start block h-16  text-left font-normal mt-1",
            !date && "text-muted-foreground"
          )}
        >
          <p className="text-sm font-medium">{label}</p>
       <div className=" flex items-center">
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

const Counter = ({ count, setCount, label, price }: CounterProps) => (
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

const PriceItem = ({ label, value, discount = false }: PriceItemProps) => (
  <div className="flex justify-between">
    <p className="text-sm">{label}</p>
    <p className={`font-medium ${discount ? 'text-green-600' : ''}`}>{value}</p>
  </div>
)

const CardHeader = ({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>, title: string }) => (
  <div className="flex items-center mb-4 py-4 px-4 bg-[#F5F5F5]">
    <Icon className="h-5 w-5 mr-2" />
    <h2 className="text-lg font-medium">{title}</h2>
  </div>
)

// Main Component
export default function Payment() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date(2025, 1, 12))
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(2025, 1, 20))
  const [dailyCleaningCount, setDailyCleaningCount] = useState(0)
  const [babysittingCount, setBabysittingCount] = useState(0)

  // Personal information fields
  const personalInfoFields: FormFieldProps[] = [
    { id: "firstName", label: "First name", placeholder: "First name" },
    { id: "lastName", label: "Last name", placeholder: "Last name" },
    { id: "email", label: "Email address", placeholder: "Email address", type: "email" },
    { id: "address", label: "Address", placeholder: "Address" },
    { id: "zipCode", label: "Zip code/Postcode", placeholder: "Zip code/Postcode" },
    { id: "city", label: "City", placeholder: "City" }
  ]

  // Billing information fields
  const billingInfoFields: FormFieldProps[] = [
    { id: "cardNumber", label: "Card number", placeholder: "Card number 16-digits", className: "md:col-span-2" },
    { id: "fullName", label: "Full name", placeholder: "Full name", className: "md:col-span-2" },
    { id: "expirationDate", label: "Expiration date", placeholder: "MM / YY" },
    { id: "cvv", label: "CVV", placeholder: "CVV" },
    { id: "billingAddress", label: "Billing address", placeholder: "Billing address", className: "md:col-span-2" },
    { id: "billingZipCode", label: "Zip code/Postcode", placeholder: "Zip code/Postcode" },
    { id: "billingCity", label: "City", placeholder: "City" }
  ]

  // Price items
  const priceItems: PriceItemProps[] = [
    { label: "price per night", value: "$120" },
    { label: "Cleaning fees", value: "$20" },
    { label: "Monthly discount", value: "-$20", discount: true }
  ]

  // Guest options
  const guestOptions: GuestOption[] = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" }
  ]

  // Extra services
  const extraServices: CounterProps[] = [
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

  return (
    <div className= " max-w-[1300px] mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Personal Information Card */}
          <Card>
            <CardContent className="p-0">
              <CardHeader icon={User} title="Personal information" />
              
              <div className="grid grid-cols-1 p-5 md:grid-cols-2 gap-6">
                {personalInfoFields.map((field) => (
                  <FormField key={field.id} {...field} />
                ))}
                
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone<span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <PhoneCountrySelect />
                    <Input id="phone" className="flex-1 ml-2" placeholder="Phone" />
                  </div>
                </div>

                <div className="hidden md:block" /> {/* Empty space for grid alignment */}
                <CountrySelect id="country" label="Country" className="md:col-span-2" />
              </div>
            </CardContent>
          </Card>

          {/* Billing Information Card */}
          <Card>
            <CardContent className="p-0">
              <CardHeader icon={CreditCard} title="Billing information" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {billingInfoFields.map((field) => (
                  <FormField key={field.id} {...field} />
                ))}
                <CountrySelect id="billingCountry" label="Billing country" className="md:col-span-2" />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-black text-white hover:bg-gray-800">Submit</Button>
        </div>

        {/* Right Sidebar */}
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
                  <Select defaultValue="1">
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

                <div className="mt-6 rounded-xl   p-4 shadow border-[#8C8C8CFC] border-[1px]">
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
      </div>
    </div>
  )
}