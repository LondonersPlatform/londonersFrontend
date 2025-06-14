"use client";

import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { CalendarIcon, CreditCard, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Payment() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date(2025, 1, 12));
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(2025, 1, 20));
  const [dailyCleaningCount, setDailyCleaningCount] = useState(0);
  const [babysittingCount, setBabysittingCount] = useState(0);
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [guests, setGuests] = useState("1");

  const [formValues, setFormValues] = useState({
    fullName: "",
    billingAddress: "",
    billingZipCode: "",
    billingCity: "",
    billingCountry: ""
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return alert("Stripe is not loaded");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: formValues.fullName,
        address: {
          line1: formValues.billingAddress,
          city: formValues.billingCity,
          postal_code: formValues.billingZipCode,
          country: formValues.billingCountry
        }
      }
    });

    if (error) {
      console.error("Stripe error:", error.message);
      alert(error.message);
    } else {
      console.log("PaymentMethod:", paymentMethod.id);
      alert("Card saved successfully!");
      // send paymentMethod.id, formValues, service data to backend
    }
  };

  const guestOptions = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" }
  ];

  const extraServices = [
    { count: dailyCleaningCount, setCount: setDailyCleaningCount, label: "Daily cleaning", price: "$100" },
    { count: babysittingCount, setCount: setBabysittingCount, label: "Babysitting", price: "$100" }
  ];

  const priceItems = [
    { label: "Price/night", value: "$120" },
    { label: "Cleaning fees", value: "$20" },
    { label: "Monthly discount", value: "-$20", discount: true }
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-[1300px] mx-auto space-y-8">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullName">Full Name<span className="text-red-500">*</span></Label>
              <Input id="fullName" onChange={handleInputChange} value={formValues.fullName} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="card-element">Card Details<span className="text-red-500">*</span></Label>
              <div className="p-3 border rounded-md">
                <CardElement options={{ style: { base: { fontSize: "16px", color: "#32325d" } } }} />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="billingAddress">Billing Address<span className="text-red-500">*</span></Label>
              <Input id="billingAddress" onChange={handleInputChange} value={formValues.billingAddress} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingZipCode">Zip Code<span className="text-red-500">*</span></Label>
              <Input id="billingZipCode" onChange={handleInputChange} value={formValues.billingZipCode} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCity">City<span className="text-red-500">*</span></Label>
              <Input id="billingCity" onChange={handleInputChange} value={formValues.billingCity} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="billingCountry">Country<span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => setFormValues((prev) => ({ ...prev, billingCountry: value }))} value={formValues.billingCountry}>
                <SelectTrigger id="billingCountry"><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  {["us", "uk", "ca", "au"].map((c) => (
                    <SelectItem key={c} value={c}>{c.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="flex items-center mb-4 bg-[#F5F5F5] p-4"><CalendarIcon className="mr-2" /><h2>Booking</h2></div>
              <div className="grid grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{checkInDate ? format(checkInDate, "dd MMM yyyy") : "Check-in"}</Button>
                  </PopoverTrigger>
                  <PopoverContent><Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} /></PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "Check-out"}</Button>
                  </PopoverTrigger>
                  <PopoverContent><Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} /></PopoverContent>
                </Popover>
              </div>
              <Select onValueChange={setGuests} value={guests}>
                <SelectTrigger><SelectValue placeholder="Guests" /></SelectTrigger>
                <SelectContent>{guestOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
              <div className="rounded-xl p-4 shadow space-y-2">
                {extraServices.map(({ count, setCount, label, price }) => (
                  <div key={label} className="flex justify-between items-center">
                    <div><p>{label}</p><p className="text-xs">{price}</p></div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => setCount(Math.max(0, count - 1))}><Minus /></Button>
                      <span>{count}</span>
                      <Button onClick={() => setCount(count + 1)}><Plus /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              {priceItems.map(({ label, value, discount }) => (
                <div key={label} className="flex justify-between">
                  <p>{label}</p><p className={discount ? "text-green-600" : ""}>{value}</p>
                </div>
              ))}
              <div className="flex justify-between pt-4 border-t">
                <p>Total</p><p className="font-bold">$1200</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 flex items-end">
          <Button type="submit" className="w-full bg-black text-white">Submit</Button>
        </div>
      </div>
    </form>
    

  );
}
