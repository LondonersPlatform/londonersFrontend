// components/StripeWrapper.tsx
"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_1234567890abcdefghijklmnop");

export default function StripeWrapper({ children }: { children: ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
