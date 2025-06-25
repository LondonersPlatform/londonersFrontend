"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  LayoutDashboard,
  Calendar,
  User,
  Menu,
} from "lucide-react"
import Image from "next/image"
import { SidebarContent } from "@/components/layout/Sidebar"
import { useRouter } from "next/navigation"

const reservations = [
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Canceled",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Confirmed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartment: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    amount: "$252",
    status: "Canceled",
  },
];


const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return " border-[#3F74E5] bg-[#3F74E5]/10 text-[#3F74E5] hover:bg-[#3F74E5]/20";
    case "Completed":
      return "border-[#39F61B] bg-[#39F61B]/10 text-[#39F61B] hover:bg-[#39F61B]/20";
    case "Canceled":
      return " border-[#FF3D00] bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20";
    default:
      return "bg-[#8c8c8c] text-white";
  }
};




export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
 const router = useRouter();
 useEffect(() => {
    const isAuth = localStorage.getItem("access_token") || localStorage.getItem("session");
    if (!isAuth) {
      router.push("/"); // ✅ Redirect if not authenticated
    }
  }, []);
  const tabs = ["All", "Previous reservations", "Current reservations", "Upcoming reservations"]

  return (
    <div className="flex h-screen   bg-[#f5f5f5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-[#000000] text-white p-0 border-0">
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 bg-white   flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white p-4 lg:p-6  border-[#ededed]">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </Button>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-1">Reservations</h1>
              <p className="text-[#8c8c8c] text-sm">
                This section displays recent messages submitted by londoners support team
              </p>
            </div>
          </div>
        </div>



         {/* Tabs and Search */}
        <div className="bg-white px-4 lg:px-6  mt-6 border rounded-lg  lg:mx-12 mx-4  py-4 border-b border-[#ededed]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs - Scrollable on mobile */}
            <div className="flex space-x-6 lg:space-x-8 overflow-x-auto pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={` text-sm font-medium  transition-colors  ${
                    activeTab === tab
                      ? "text-[#59D750]  bg-[#59D75014]  rounded-lg p-3"
                      : "text-[#8c8c8c] border-transparent hover:text-[#000000]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8c8c8c]" size={16} />
                <Input
                  placeholder="Search by subject, title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full lg:w-64 border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
                />
              </div>
            
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 bg-white overflow-hidden lg:mx-12 mx-4">
          <div className="overflow-x-auto h-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#f5f5f5] border-b border-[#ededed] sticky top-0">
                <tr>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Booking No</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Apartment Name</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Guests</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Check In</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Check Out</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Paid Amount</th>
                  <th className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={index} className="border-b border-[#ededed] hover:bg-[#f5f5f5]/50">
                    <td className="py-4 px-4 lg:px-6 text-sm font-medium text-[#000000]">{reservation.id}</td>
                    <td className="py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="Apartment"
                          width={32}
                          height={32}
                          className="rounded-full flex-shrink-0"
                        />
                        <span className="text-sm text-[#000000] truncate">{reservation.apartment}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6 text-sm text-[#000000]">{reservation.guests}</td>
                    <td className="py-4 px-4 lg:px-6 text-sm text-[#000000] whitespace-nowrap">
                      {reservation.checkIn}
                    </td>
                    <td className="py-4 px-4 lg:px-6 text-sm text-[#000000] whitespace-nowrap">
                      {reservation.checkOut}
                    </td>
                    <td className="py-4 px-4 lg:px-6 text-sm font-medium text-[#000000]">{reservation.amount}</td>
                    <td className="py-4 px-4 lg:px-6">
                      <Badge
                        className={`${getStatusColor(reservation.status)} px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap`}
                      >
                        {reservation.status}
                      </Badge>
                    </td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-[#ededed] px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] order-2 sm:order-1">
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button size="sm" className="bg-[#000000] text-white hover:bg-[#000000]/90 w-8 h-8 p-0">
                1
              </Button>
              <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] w-8 h-8 p-0">
                2
              </Button>
              <span className="text-[#8c8c8c] px-2">...</span>
              <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] w-8 h-8 p-0">
                10
              </Button>
              <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] w-8 h-8 p-0">
                11
              </Button>
              <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] w-8 h-8 p-0">
                12
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-[#8c8c8c] hover:text-[#000000] order-3">
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
