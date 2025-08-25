"use client";

import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentStatusProps {
  status: string;
  transactionId: string;
  date: string;
  time: string;
  transactionType: string;
  amount: string;
  onTryAgain?: () => void;
  onGoToDashboard?: () => void;
  onBackToHome?: () => void;
}

export default function PaymentStatus({
  status,
  transactionId,
  date,
  time,
  transactionType,
  amount,
  onTryAgain,
 
 
}: PaymentStatusProps) {
  const isSuccess = status === "success";
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const formatted = dateTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
    const router = useRouter();
    const onBackToHome = () => {
    router.push('/');
  };

  const onGoToDashboard = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Status Icon */}
        <div className="flex justify-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isSuccess ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isSuccess ? "Payment successful" : "Payment Failed"}
          </h1>
          {isSuccess && (
            <p className="text-gray-600">Successfully paid {amount}</p>
          )}
        </div>

        {/* Transaction Details Card */}
        <Card className="border border-gray-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Date</span>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-xl shadow-sm w-fit">
                <span>{formatted}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Type of transaction</span>
              <span className="text-gray-900 font-medium">
                {transactionType}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Amount</span>
              <span className="text-gray-900 font-medium">{amount}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Status</span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSuccess ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isSuccess ? status : status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={isSuccess ? onGoToDashboard : onTryAgain}
          >
            {isSuccess ? "Go to dashboard" : "Try again"}
          </Button>

          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
