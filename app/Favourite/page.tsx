"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Heart,
  Mail,
  LayoutDashboard,
  Calendar,
  User,
  Menu,
  MapPin,
  Star,
  Bed,
  Users,
  Bath,
  Eye,
  Share,
  Trash2,
  Edit,
} from "lucide-react";
import Image from "next/image";
import { SidebarContent } from "@/components/layout/Sidebar";

const favorites = [
  {
    id: 1,
    name: "Marlybone book",
    location: "Phuket, Thailand",
    subLocation: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedrooms: 1,
    beds: 4,
    baths: 1,
    guests: 5,
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 2,
    name: "Marlybone book",
    location: "Phuket, Thailand",
    subLocation: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedrooms: 1,
    beds: 4,
    baths: 1,
    guests: 5,
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 3,
    name: "Marlybone book",
    location: "Phuket, Thailand",
    subLocation: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedrooms: 1,
    beds: 4,
    baths: 1,
    guests: 5,
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 4,
    name: "Marlybone book",
    location: "Phuket, Thailand",
    subLocation: "Devonshire Place",
    rating: 4.6,
    reviews: 200,
    bedrooms: 1,
    beds: 4,
    baths: 1,
    guests: 5,
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
];

export default function Favourite() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-[#000000] text-white p-0 border-0"
        >
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex  bg-white flex-col min-w-0">
        {/* Header */}
        <div className="bg-white p-4 lg:p-6 ">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-1">
                Favorites
              </h1>
              <p className="text-[#8c8c8c] text-sm">
                This section displays your favorites apartments
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 py-0">
          <div className="space-y-4">
            {favorites.map((apartment) => (
              <div
                key={apartment.id}
                className="bg-white rounded-lg shadow-sm border border-[#ededed] overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 ">
                  {/* Images - Left Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 col-span-2">
                    <div className="relative w-full h-64">
                      <Image
                        src={apartment.images[0] || "/l1.png"}
                        alt={apartment.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-full h-64">
                      <Image
                        src={apartment.images[1] || "/placeholder.svg"}
                        alt={apartment.name}
                        fill
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content - Right Side */}
                  <div className="flex-1 p-6 flex flex-col justify-between  col-span-3">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 ">
                      <h3 className="text-xl font-semibold text-[#000000] border-b-2 pb-2 border-[#D9D9D9]">
                        {apartment.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#8c8c8c] hover:text-[#000000] p-1 -mt-1"
                          >
                            <MoreHorizontal size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <Share size={16} className="mr-2" />
                            Share
                          </DropdownMenuItem>

                          <DropdownMenuItem className="cursor-pointer text-[#ff3d00] focus:text-[#ff3d00]">
                            <Trash2 size={16} className="mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={16} className="text-[#ff3d00]" />
                      <span className="text-sm text-[#8c8c8c]">
                        {apartment.location}
                      </span>
                      <span className="text-[#8c8c8c]">&gt;</span>
                      <span className="text-sm text-[#8c8c8c]">
                        {apartment.subLocation}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(apartment.rating)
                                ? "text-[#ffc107] fill-[#ffc107]"
                                : "text-[#d9d9d9]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-[#000000]">
                        {apartment.rating}
                      </span>
                      <span className="text-sm text-[#8c8c8c]">
                        ({apartment.reviews} Reviews)
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Bed size={16} className="text-[#8c8c8c]" />
                        <span className="text-sm text-[#8c8c8c]">
                          {apartment.bedrooms} Bedroom
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed size={16} className="text-[#8c8c8c]" />
                        <span className="text-sm text-[#8c8c8c]">
                          {apartment.beds} Beds
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath size={16} className="text-[#8c8c8c]" />
                        <span className="text-sm text-[#8c8c8c]">
                          {apartment.baths} Bath
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#8c8c8c]" />
                        <span className="text-sm text-[#8c8c8c]">
                          {apartment.guests} Guests
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div>
                      <Button className="bg-[#000000] text-white hover:bg-[#000000]/90 px-6 py-0 rounded-2xl text-sm font-medium ">
                        <Eye size={16} className="mr-2" />
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
