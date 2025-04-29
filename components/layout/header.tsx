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



export default function Header() {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 })
  
  const [searchOpen, setSearchOpen] = useState(false)

  const getTotalGuests = () => {
    const total = guests.adults + guests.children + guests.infants;
    return total === 0
      ? "Add guests"
      : `${total} guest${total !== 1 ? "s" : ""}`;
  };


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
          <nav className="hidden border rounded-full px-4 p-0 md:flex items-center  space-x-6">
            <div className="relative border-e-2 pe-6">
              <div
                className="flex items-center text-sm cursor-pointer"
                onClick={() => {
                  setCheckInOpen(!checkInOpen);
                  setCheckOutOpen(false);
                  setGuestsOpen(false);
                }}
              >
                <DatePickerWithRange/>
      
      
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
              >
                <div className="mr-2 rounded-full  p-2">
                  <Image
                    src="/p.svg"
                    alt="LONDONERS"
                    width={20}
                    height={20}
                    className="h-8"
                  />
                </div>
                <div>
                  <p className="font-medium">Guests</p>
                  <p className="text-gray-500">{getTotalGuests()}</p>
                </div>
              </div>
              <GuestSelector
                isOpen={guestsOpen}
                onClose={() => setGuestsOpen(false)}
                onSelect={setGuests}
                initialGuests={guests}
              />
            </div>

            <Button
              variant="primary"
              className="hidden mt-2 md:flex items-center rounded-full px-4 py-2 my-2 text-sm"
              onClick={() => setSearchOpen(!searchOpen)}
           >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>


          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            className="rounded-full px-6 py-2 text-sm font-medium"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
        </div>



      </header>
 {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Search</h2>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search for destinations, properties..." className="pl-10 rounded-full" autoFocus />
              </div>
              <Button variant="primary" className="rounded-full">
                Search
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Popular searches</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  London
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Manchester
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Edinburgh
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Bath
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Liverpool
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
