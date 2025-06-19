// components/StripeWrapper.tsx
"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51RIXhqFbNnrrcGZUDWpd3j2atgKq0SaLjxsXoH8saOSZPAwO9TJ39gjdeW01IDuVU5OiOurMu1JauTeGGpCbd0H500CCk5TaxQ");

export default function StripeWrapper({ children }: { children: ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
