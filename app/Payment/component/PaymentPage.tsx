"use client";

import { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CalendarIcon, Plus, Minus } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  createReservation,
  createSetupIntent,
} from "@/app/all-listings/Listing";
import { BookingSidebar } from "./PaymentSidebar";
import { useAuth } from "@/context/auth-context";
import PaymentStatus from "./PaymentFailure";
import { useSearchParams } from "next/navigation";

// Add these components
const PaymentSuccess = () => (
  <>
    <PaymentStatus status="success" />
  </>
);

const PaymentFailed = ({ error }: { error: string }) => (
  <>
    <PaymentStatus status={error} amount={"180$"} transactionType="visa" />
    <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>
  </>
);

export default function Payment() {
  const searchParams = useSearchParams();
  const ratePlanIdParms = searchParams.get("ratePlanIdParms");
  const quoteIdParms = searchParams.get("quoteId");
  const GuestyId = localStorage.getItem("GuestyId") || "";
  // useEffect(() => {
  //   const callReservation = async () => {
  //     try {
  //       const res = await createReservation({
  //         quoteId: quoteIdParms, // replace with your actual quoteId
  //         guestId: GuestyId, // assuming session exists from useAuth()
  //         ratePlanId: ratePlanIdParms ?? undefined,
  //       });
  //       console.log("Reservation Response:", res);
  //     } catch (error) {
  //       console.error("Reservation Error:", error);
  //     }
  //   };

  //   if (GuestyId) {
  //     callReservation();
  //   }
  // }, [GuestyId]);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    new Date(2025, 1, 12)
  );
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(2025, 1, 20)
  );
  const [dailyCleaningCount, setDailyCleaningCount] = useState(0);
  const [babysittingCount, setBabysittingCount] = useState(0);
  const [guests, setGuests] = useState("1");
  const [Intent, setIntent] = useState(null);

  useEffect(() => {
    const fetchSetupIntent = async () => {
      const result = await createSetupIntent({});
      console.log(result.client_secret);
      setIntent(result.client_secret);
    };

    fetchSetupIntent();
  }, []);

  const [formValues, setFormValues] = useState({
    fullName: "",
    billingAddress: "",
    billingZipCode: "",
    billingCity: "",
    billingCountry: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return alert("Stripe has not loaded yet.");

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return;

    const clientSecret = `${Intent}`;

    // Reset states before new submission
    setStripeError(null);
    setPaymentSuccess(false);

    const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formValues.fullName,
          address: {
            line1: formValues.billingAddress,
            city: formValues.billingCity,
            postal_code: formValues.billingZipCode,
            country: formValues.billingCountry,
          },
        },
      },
    });

    if (error) {
      console.error("Stripe Error:", error);
      setStripeError(
        error.message || "An error occurred while processing your card."
      );
      return;
    }

    console.log("SetupIntent:", setupIntent);
    setPaymentSuccess(true);
  };

  const guestOptions = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" },
  ];

  const extraServices = [
    {
      count: dailyCleaningCount,
      setCount: setDailyCleaningCount,
      label: "Daily cleaning",
      price: "$100",
    },
    {
      count: babysittingCount,
      setCount: setBabysittingCount,
      label: "Babysitting",
      price: "$100",
    },
  ];

  const priceItems = [
    { label: "Price/night", value: "$120" },
    { label: "Cleaning fees", value: "$20" },
  
  ];

  const { session, isLoading } = useAuth();
  console.log(session?.user.id, "sessionsessionsession");
  {
    /* Show payment status messages */
  }

  return (
    <>
      {paymentSuccess && <PaymentSuccess />}
      {stripeError && <PaymentFailed error={stripeError} />}
      {!stripeError &&
        (!paymentSuccess && (
          <form
            onSubmit={handleSubmit}
            className="max-w-[1300px] mx-auto space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="col-span-2">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="fullName">
                        Full Name<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        onChange={handleInputChange}
                        value={formValues.fullName}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>
                        Card Number<span className="text-red-500">*</span>
                      </Label>
                      <div className="p-3 border rounded-md bg-white shadow-sm">
                        <CardNumberElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": { color: "#aab7c4" },
                              },
                              invalid: { color: "#fa755a" },
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Expiry Date<span className="text-red-500">*</span>
                      </Label>
                      <div className="p-3 border rounded-md bg-white shadow-sm">
                        <CardExpiryElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": { color: "#aab7c4" },
                              },
                              invalid: { color: "#fa755a" },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        CVV<span className="text-red-500">*</span>
                      </Label>
                      <div className="p-3 border rounded-md bg-white shadow-sm">
                        <CardCvcElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": {
                                  color: "#aab7c4",
                                  // Won’t affect actual placeholder text
                                },
                              },
                              invalid: {
                                color: "#fa755a",
                              },
                            },
                          }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">e.g. 123</p>{" "}
                      {/* Custom hint below */}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="billingAddress">
                        Billing Address<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingAddress"
                        onChange={handleInputChange}
                        value={formValues.billingAddress}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingZipCode">
                        Zip Code<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingZipCode"
                        onChange={handleInputChange}
                        value={formValues.billingZipCode}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingCity">
                        City<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingCity"
                        onChange={handleInputChange}
                        value={formValues.billingCity}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="billingCountry">
                        Country<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormValues((prev) => ({
                            ...prev,
                            billingCountry: value,
                          }))
                        }
                        value={formValues.billingCountry}
                      >
                        <SelectTrigger id="billingCountry">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {["us", "gb", "ca", "au"].map((c) => (
                            <SelectItem key={c} value={c}>
                              {c.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="md:col-span-2 my-6 flex items-end">
                    <Button
                      type="submit"
                      className="w-full bg-black text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div>
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
            </div>
          </form>
        ))}
    </>
  );
}
