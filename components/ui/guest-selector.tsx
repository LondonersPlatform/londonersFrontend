"use client";

import { useState } from "react";
import { Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GuestType {
  adults: number;
  children: number;
  infants: number;
}

interface GuestSelectorProps {
  onSelect: (guests: GuestType) => void;
  initialGuests?: GuestType;
  triggerClassName?: string;
}

export default function GuestSelector({
  onSelect,
  initialGuests = { adults: 1, children: 0, infants: 0 },
  triggerClassName,
}: GuestSelectorProps) {
  const [guests, setGuests] = useState<GuestType>(initialGuests);
  const [open, setOpen] = useState(false);

  const updateGuests = (type: keyof GuestType, value: number) => {
    const newGuests = { ...guests, [type]: Math.max(0, value) };
    setGuests(newGuests);
    onSelect(newGuests);
  };

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestSummary = `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex  bg-transparent outline-0 w-full font-medium text-gray-900  justify-start border-none gap-2",
            triggerClassName
          )}
        >
          <div className=" rounded-full ">
            <Image
              src="/p.svg"
              alt="LONDONERS"
              width={20}
              height={20}
              className="h-8"
            />
          </div>
         <div className=" flex flex-col items-center">
         <span>Geusts</span>
        
         <span className="text-xs text-[#8C8C8C]"> {totalGuests + "  "+"Geusts"}</span>

         </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-80 max-w-96 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-gray-500">Age 13 or above</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateGuests("adults", guests.adults - 1)}
                disabled={guests.adults <= 1}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border",
                  guests.adults <= 1
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-400 text-gray-600 hover:border-black hover:text-black"
                )}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center">{guests.adults}</span>
              <button
                onClick={() => updateGuests("adults", guests.adults + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
                type="button"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-sm text-gray-500">Age 2-12</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateGuests("children", guests.children - 1)}
                disabled={guests.children <= 0}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border",
                  guests.children <= 0
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-400 text-gray-600 hover:border-black hover:text-black"
                )}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center">{guests.children}</span>
              <button
                onClick={() => updateGuests("children", guests.children + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
                type="button"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Infants</p>
              <p className="text-sm text-gray-500">Under 2</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateGuests("infants", guests.infants - 1)}
                disabled={guests.infants <= 0}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border",
                  guests.infants <= 0
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-400 text-gray-600 hover:border-black hover:text-black"
                )}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center">{guests.infants}</span>
              <button
                onClick={() => updateGuests("infants", guests.infants + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
                type="button"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
