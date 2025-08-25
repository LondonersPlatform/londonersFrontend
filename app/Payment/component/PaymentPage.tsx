"use client";

import React, { useEffect, useState } from "react";
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
  addPayment,
  createPaymentMethod,
  createReservation,
  createSetupIntent,
  updateReservationStatus,
} from "@/app/all-listings/Listing";
import { BookingSidebar } from "./PaymentSidebar";
import { useAuth } from "@/context/auth-context";
import PaymentStatus from "./PaymentFailure";
import { useSearchParams } from "next/navigation";
import { useBooking } from "@/context/DatePickerContext";

// Add these components
const PaymentSuccess = ({total}:any) => (
  <React.Fragment>
    <PaymentStatus status={"success"}  amount={total} />
  </React.Fragment>
);

const PaymentFailed = ({ error ,total }: { error: string ,total:any}) => (
  <React.Fragment>
    <PaymentStatus status={"error"} amount={total} transactionType="visa" />
    <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>
  </React.Fragment>
);

export default function Payment() {
  const searchParams = useSearchParams();
  
    const paymentProviderId = searchParams.get("paymentProviderId");
  const ratePlanIdParms = searchParams.get("ratePlanIdParms");
  const quoteIdParms = searchParams.get("quoteId");
  const listingId = searchParams.get("listingId");

  const GuestyId = localStorage.getItem("GuestyId") || "";

 const {
   
    total,
  } = useBooking();

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
  const [showResult, setShowResult] = useState(false); // new state

  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(2025, 1, 20)
  );

const [loading, setLoading] = useState(false);
const [stripeError, setStripeError] = useState<string | null>(null);

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

console.log("paymentProviderId====xx",paymentProviderId)
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

// Inside your component:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) {
    alert("Stripe has not loaded yet.");
    return;
  }

  const cardElement = elements.getElement(CardNumberElement);
  if (!cardElement || !Intent) {
    alert("Missing card element or setup intent.");
    return;
  }

  setStripeError(null);
  setPaymentSuccess(false);
  setLoading(true);
  setShowResult(false);

  try {
    // ✅ Step 1: Confirm card setup with Stripe
    const { error: stripeErrorObj, setupIntent } = await stripe.confirmCardSetup(Intent, {
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

    if (stripeErrorObj) {
      throw new Error(stripeErrorObj.message || "Stripe card confirmation failed");
    }

    const stripeCardToken = setupIntent?.payment_method;
    if (!stripeCardToken || !GuestyId) {
      throw new Error("Missing Stripe card token or Guesty ID");
    }

    // ✅ Step 2: Create payment method
    const createMethodRes = await createPaymentMethod({
      guestId: GuestyId,
      stripeCardToken,
      paymentProviderId: paymentProviderId,
      reservationId: "", // if required, otherwise remove from params or add after step 3
      skipSetupIntent: true,
      reuse: false,
    });

    const paymentMethodId = createMethodRes?.data?._id;
    if (!paymentMethodId) {
      throw new Error("Failed to create payment method");
    }

    // ✅ Step 3: Create reservation
    const reservationRes = await createReservation({
      quoteId: quoteIdParms,
      guestId: GuestyId,
      ratePlanId: ratePlanIdParms ?? undefined,
    });

    const reservationId = reservationRes?.reservation?.reservationId;
    if (!reservationId) {
      throw new Error("Failed to create reservation");
    }

    // ✅ Step 4: Add payment
    try {
      const paymentRes = await addPayment({
        reservationId,
        amount: Number(1), // Replace with actual amount
        note: "Advance payment",
        method: "STRIPE",
        paymentMethodId,
        saveForFutureUse: true,
        shouldBePaidAt: new Date().toISOString(),
        isAuthorizationHold: false,
      });

      console.log("✅ Payment success:", paymentRes);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("❌ Payment failed:", error);

      // Fallback: cancel reservation
      try {
        await updateReservationStatus({
          reservationId,
          status: "canceled",
        });
        console.log("⚠️ Reservation status updated to canceled due to payment failure.");
      } catch (statusError) {
        console.error("❌ Failed to update reservation status:", statusError);
      }

      throw error; // rethrow to show UI error
    }

  } catch (err: any) {
    console.error("Payment flow error:", err);
    setStripeError(err?.message || "An unexpected error occurred");
    setPaymentSuccess(false);
  } finally {
    setLoading(false);
    setShowResult(true);
  }
};





  const { session, isLoading } = useAuth();
  console.log(session?.user.id, "sessionsessionsession");
  {
    /* Show payment status messages */
  }

  return (
    <React.Fragment>
     {showResult ? (
        paymentSuccess ? (
          <PaymentSuccess />
        ) : (
          <PaymentFailed error={stripeError || "Payment failed"} onRetry={() => setShowResult(false)} />
        )
      ) : (
     
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
               <Button type="submit" disabled={loading}>
  {loading ? "Processing..." : "Submit Payment"}
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
      )}
    </React.Fragment>
  );
}
