"use client";

import React, { useEffect, useState } from "react";

import { PricingBreakdown } from "@/components/sections/BookingEngine/PricingBreakdown";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const BottomBookingBar = ({
  quoteData,
  basePrice,
  nights,
  subtotal,
  earlyBirdDiscount,
  Cleaningfee,
  total,
  loading,
  setIsOpen,
  handleClick,
  openLoginModal,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (quoteData) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [quoteData]);
  const handleButtonClick = () => {
    if (!quoteData) {
      setIsOpen(true);
    } else {
      if (localStorage.getItem("access_token")) {
        handleClick();
      } else {
        openLoginModal();
      }
    }
  };

  useEffect(() => {
    if (quoteData && window.innerWidth < 768) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [quoteData]);

  return (
    <div className=" block">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {/* Optional trigger */}
          <div />
        </DrawerTrigger>

        <DrawerContent className=" md:hidden py-12 flex items-center justify-between px-6 ">
          {quoteData && (
            <div className="flex w-full py-6 flex-grow flex-col">
              <p className="text-center text-sm text-gray-600">
                You won't be charged yet
              </p>

              <PricingBreakdown
                basePrice={basePrice}
                nights={nights}
                subtotal={subtotal}
                earlyBirdDiscount={earlyBirdDiscount}
                serviceFee={Cleaningfee}
                total={total}
              />
            </div>
          )}

          <Button
            className="w-full bg-gradient-to-r from-black to-black hover:from-gray-600 hover:to-black text-white font-semibold py-4 rounded-lg text-base transition-all duration-200 shadow-lg"
            onClick={handleButtonClick}
          >
            {loading
              ? "Loading..."
              : !quoteData
              ? "Check Availability"
              : "Book Now"}
          </Button>
        </DrawerContent>
      </Drawer>

      {quoteData && (
        <div className="fixed md:hidden block   bottom-0 left-0 right-0 w-full z-10 bg-white border-t border-gray-200 shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Info Block */}
            <div className="flex flex-col gap-1 text-sm text-gray-800">
              <div className="font-medium text-xl underline">
                <span className="text-gray-900 font-semibold">{total}</span>{" "}
             £
              </div>
              <div className="font-medium text-sm">
                <span className="text-gray-600 font-normal">
                  For {nights} nights{" "}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              className="bg-black hover:bg-gray-800 text-white font-medium text-sm px-6 py-3 rounded-md shadow transition duration-200"
              onClick={handleButtonClick}
            >
              {loading
                ? "Loading..."
                : !quoteData
                ? "Check Availability"
                : "Book Now"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBookingBar;
