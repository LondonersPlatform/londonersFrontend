"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import GuestSelector from "@/components/ui/guest-selector";
import LoginModal from "@/components/sections/login-modal";
import { DatePickerWithRange } from "../ui/DateRangePicker";
import { Input } from "../ui/input";
import { useAuth } from "@/context/auth-context";
import { ProfileDropdown } from "./components/ProfileDropdown";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useRouter } from "next/navigation";

export default function Header() {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<any | undefined>();
  const router = useRouter();

  const getTotalGuests = () => {
    const total = guests.adults + guests.children + guests.infants;
    return total === 0
      ? "Add guests"
      : `${total} guest${total !== 1 ? "s" : ""}`;
  };
  const { session, isLoading } = useAuth();
  console.log(session, "sessionsessionsession");
  return (
    <>
      <header className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link href="/" className="mr-8">
          <Image
            src="/logo.png"
            alt="LONDONERS"
            width={150}
            height={30}
            className="h-8"
          />
        </Link>
        <div className="   flex items-center">
          <nav className=" hidden border w-full rounded-full px-4 p-0 lg:flex items-center  space-x-6">
            <div className="relative border-e-2 pe-6">
              <div
                className="flex items-center text-sm cursor-pointer"
                onClick={() => {
                  setCheckInOpen(!checkInOpen);
                  setCheckOutOpen(false);
                  setGuestsOpen(false);
                }}
              >
                <DatePickerWithRange onDateChange={setSelectedDateRange} />
              </div>
            </div>

            <div className="relative pe-6">
              <div
                className="flex items-center text-sm cursor-pointer"
                onClick={() => {
                  setGuestsOpen(!guestsOpen);
                  setCheckInOpen(false);
                  setCheckOutOpen(false);
                }}
              ></div>
              <GuestSelector
                //  ال props دي مش موجودة في ال component ده
                // isOpen={guestsOpen}
                // onClose={() => setGuestsOpen(false)}
                onSelect={setGuests}
                initialGuests={guests}
              />
            </div>
            <Button
              variant="primary"
              className="hidden mt-2 md:flex items-center rounded-full px-4 py-2 my-2 text-sm"
              onClick={() => {
                const checkIn = selectedDateRange?.from
                  ? selectedDateRange.from.toISOString().split("T")[0]
                  : "";
                const checkOut = selectedDateRange?.to
                  ? selectedDateRange.to.toISOString().split("T")[0]
                  : "";

                const minOccupancy =
                  guests.adults + guests.children + guests.infants;

                const query = new URLSearchParams({
                  checkIn,
                  checkOut,
                  minOccupancy: minOccupancy.toString(),
                  ignoreFlexibleBlocks: "false",
                });

                router.push(`/all-listings?${query.toString()}`);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            className=" mt-2 lg:hidden flex items-center rounded-full px-4 py-2 my-2 text-sm"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          {!isLoading && session ? (
            <ProfileDropdown session={session} isLoading={isLoading} />
          ) : (
            <Button
              variant="secondary"
              className="rounded-full px-6 py-2 text-sm font-medium"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          )}
        </div>
      </header>
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTitle>
          <SheetContent
            side="top"
            className="p-6 max:h-[60vh] overflow-y-auto rounded-b-xl"
          >
            <div className="flex w-full items-start py-12 h-full justify-center">
              <div className="w-full gap-4 flex flex-col items-center">
                <nav className="rounded-full p-0 gap-4 flex flex-col w-full items-center ">
                  <div className="relative w-full justify-between border-2  rounded-lg py-2 ">
                    <div
                      className="grid items-center text-sm cursor-pointer"
                      onClick={() => {
                        setCheckInOpen(!checkInOpen);
                        setCheckOutOpen(false);
                        setGuestsOpen(false);
                      }}
                    >
                      <DatePickerWithRange
                        onDateChange={setSelectedDateRange}
                      />
                    </div>
                  </div>

                  <div className="relative w-full py-2 rounded-lg justify-center border-2 ps-3 pe-6">
                    <div
                      className="flex items-center justify-center text-sm cursor-pointer"
                      onClick={() => {
                        setGuestsOpen(!guestsOpen);
                        setCheckInOpen(false);
                        setCheckOutOpen(false);
                      }}
                    ></div>

                    <GuestSelector
                      // isOpen={guestsOpen}
                      // onClose={() => setGuestsOpen(false)}
                      onSelect={setGuests}
                      initialGuests={guests}
                    />
                  </div>
                  <Button
                    variant="primary"
                    className=" mt-2 flex w-full items-center rounded-lg px-4 py-2 my-2 text-sm"
                    onClick={() => {
                      const checkIn = selectedDateRange?.from
                        ? selectedDateRange.from.toISOString().split("T")[0]
                        : "";
                      const checkOut = selectedDateRange?.to
                        ? selectedDateRange.to.toISOString().split("T")[0]
                        : "";
                      const minOccupancy =
                        guests.adults + guests.children + guests.infants;

                      const query = new URLSearchParams({
                        checkIn,
                        checkOut,
                        minOccupancy: minOccupancy.toString(),
                        ignoreFlexibleBlocks: "false",
                      });

                      router.push(`/all-listings?${query.toString()}`);
                      setDrawerOpen(false); // Close the drawer after searching
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </nav>
              </div>
            </div>
          </SheetContent>
        </SheetTitle>
      </Sheet>
      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
