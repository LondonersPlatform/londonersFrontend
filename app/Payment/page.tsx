"use client";

import { useState } from "react";
import { CalendarIcon, CreditCard, User, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BookingSidebar } from "./component/PaymentSidebar";



// Reusable Components
const FormField = ({
  id,
  label,
  placeholder,
  required = true,
  type = "text",
  className = "",
  onChange,
  value,
}: FormFieldProps) => (
  <div className={`space-y-2 ${className}`}>
    <Label htmlFor={id}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </div>
);

const CountrySelect = ({
  id,
  label,
  required = true,
  className = "",
  onValueChange,
  value,
}: CountrySelectProps) => {
  const countries: CountryOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Select onValueChange={onValueChange} value={value}>
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
  );
};





const CardHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) => (
  <div className="flex items-center mb-4 py-4 px-4 bg-[#F5F5F5]">
    <Icon className="h-5 w-5 mr-2" />
    <h2 className="text-lg font-medium">{title}</h2>
  </div>
);

// Main Component
export default function Payment() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    new Date(2025, 1, 12)
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(2025, 1, 20)
  );
  const [dailyCleaningCount, setDailyCleaningCount] = useState(0);
  const [babysittingCount, setBabysittingCount] = useState(0);
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [guests, setGuests] = useState("1");

  // Form state
  const [formValues, setFormValues] = useState({
    address: "",
    zipCode: "",
    city: "",
    country: "",

    cardNumber: "",
    fullName: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
    billingZipCode: "",
    billingCity: "",
    billingCountry: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allValues = {
      ...formValues,
      phoneCountry,
      guests,
      checkInDate,
      checkOutDate,
      dailyCleaningCount,
      babysittingCount,
    };

    console.log("Form values:", allValues);
    // Here you would typically send the data to your backend
  };

  // Billing information fields
  const billingInfoFields: FormFieldProps[] = [
    {
      id: "cardNumber",
      label: "Card number",
      placeholder: "Card number 16-digits",
      className: "md:col-span-2",
    },
    {
      id: "fullName",
      label: "Full name",
      placeholder: "Full name",
      className: "md:col-span-2",
    },
    { id: "expirationDate", label: "Expiration date", placeholder: "MM / YY" },
    { id: "cvv", label: "CVV", placeholder: "CVV" },
    {
      id: "billingAddress",
      label: "Billing address",
      placeholder: "Billing address",
      className: "md:col-span-2",
    },
    {
      id: "billingZipCode",
      label: "Zip code/Postcode",
      placeholder: "Zip code/Postcode",
    },
    { id: "billingCity", label: "City", placeholder: "City" },
  ];

  // Price items
  const priceItems: PriceItemProps[] = [
    { label: "price per night", value: "$120" },
    { label: "Cleaning fees", value: "$20" },
    { label: "Monthly discount", value: "-$20", discount: true },
  ];

  // Guest options
  const guestOptions: GuestOption[] = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" },
  ];

  // Extra services
  const extraServices: CounterProps[] = [
    {
      count: dailyCleaningCount,
      setCount: setDailyCleaningCount,
      label: "Daily cleaning services",
      price: "$100",
    },
    {
      count: babysittingCount,
      setCount: setBabysittingCount,
      label: "Babysitting services",
      price: "$100",
    },
  ];

  return (
    <div className="max-w-[1300px] mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Personal Information Card */}

            {/* Billing Information Card */}
            <Card>
              <CardContent className="p-0">
                <CardHeader icon={CreditCard} title="Billing information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
                  {billingInfoFields.map((field) => (
                    <FormField
                      key={field.id}
                      {...field}
                      onChange={handleInputChange}
                      value={formValues[field.id as keyof typeof formValues]}
                    />
                  ))}
                  <CountrySelect
                    id="billingCountry"
                    label="Billing country"
                    className="md:col-span-2"
                    onValueChange={(value) =>
                      handleSelectChange("billingCountry", value)
                    }
                    value={formValues.billingCountry}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Submit
            </Button>
          </div>

          {/* Right Sidebar */}

          <BookingSidebar
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guests={guests}
            setGuests={setGuests}
            dailyCleaningCount={dailyCleaningCount}
            setDailyCleaningCount={setDailyCleaningCount}
            babysittingCount={babysittingCount}
            setBabysittingCount={setBabysittingCount}
          />
        </div>
      </form>
    </div>
  );
}
