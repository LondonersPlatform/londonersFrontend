import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBooking } from "@/context/DatePickerContext";

interface GuestSelectorProps {
  MaxNumofGuests: number;
}

const GuestSelector = ({ MaxNumofGuests }: GuestSelectorProps) => {
  const {
    guestBreakdown,
    guests,

    handleGuestChange,
  } = useBooking();
  console.log("MaxNumofGuests", MaxNumofGuests);
  const [isOpen, setIsOpen] = useState(false);
  const [localGuestCounts, setLocalGuestCounts] = useState(guestBreakdown);

  const totalGuests = localGuestCounts.adults + localGuestCounts.children;

  // Sync local state with context when component mounts
  useEffect(() => {
    setLocalGuestCounts(guestBreakdown);
  }, [guestBreakdown]);

  const updateGuestCount = (
    type: keyof typeof guestBreakdown,
    increment: boolean
  ) => {
    const newCounts = { ...localGuestCounts };

    if (increment) {
      if (
        (type === "adults" || type === "children") &&
        totalGuests < MaxNumofGuests
      ) {
        newCounts[type]++;
      } else if (type === "infants" && newCounts.infants < 5) {
        newCounts.infants++;
      } else if (type === "pets" && newCounts.pets < 5) {
        newCounts.pets++;
      }
    } else {
      if (type === "adults" && newCounts.adults > 1) {
        newCounts.adults--;
      } else if (type !== "adults" && newCounts[type] > 0) {
        newCounts[type]--;
      }
    }

    setLocalGuestCounts(newCounts);
    const newTotal = newCounts.adults + newCounts.children;
    handleGuestChange(newTotal, newCounts);
  };

  const GuestCounter = ({
    title,
    subtitle,
    count,
    type,
    canDecrement = true,
    canIncrement = true,
  }: {
    title: string;
    subtitle: string;
    count: number;
    type: keyof typeof guestBreakdown;
    canDecrement?: boolean;
    canIncrement?: boolean;
  }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 rounded-full p-0 border-gray-300 hover:border-gray-400"
          onClick={() => updateGuestCount(type, false)}
          disabled={!canDecrement}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{count}</span>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 rounded-full p-0 border-gray-300 hover:border-gray-400"
          onClick={() => updateGuestCount(type, true)}
          disabled={!canIncrement}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="w-full border rounded-md p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
          <div className="text-left">
            <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
              GUESTS
            </div>
            <div className="text-sm text-gray-900">
              {totalGuests} guest{totalGuests > 1 ? "s" : ""}
              {localGuestCounts.infants > 0 &&
                `, ${localGuestCounts.infants} infant${
                  localGuestCounts.infants > 1 ? "s" : ""
                }`}
              {localGuestCounts.pets > 0 &&
                `, ${localGuestCounts.pets} pet${
                  localGuestCounts.pets > 1 ? "s" : ""
                }`}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-4"
        align="start"
        sideOffset={0}
      >
        <div className="space-y-0">
          <GuestCounter
            title="Adults"
            subtitle="Age 13+"
            count={localGuestCounts.adults}
            type="adults"
            canDecrement={localGuestCounts.adults > 1}
            canIncrement={totalGuests < MaxNumofGuests}
          />
          <GuestCounter
            title="Children"
            subtitle="Age 2–12"
            count={localGuestCounts.children}
            type="children"
            canDecrement={localGuestCounts.children > 0}
            canIncrement={totalGuests < MaxNumofGuests}
          />
          <GuestCounter
            title="Infants"
            subtitle="Under 2"
            count={localGuestCounts.infants}
            type="infants"
            canDecrement={localGuestCounts.infants > 0}
            canIncrement={localGuestCounts.infants < 5}
          />
          <GuestCounter
            title="Pets"
            subtitle="Bringing a service animal?"
            count={localGuestCounts.pets}
            type="pets"
            canDecrement={localGuestCounts.pets > 0}
            canIncrement={localGuestCounts.pets < 5}
          />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            This place has a maximum of {MaxNumofGuests} guests, not including
            infants. Pets aren't allowed.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSelector;
