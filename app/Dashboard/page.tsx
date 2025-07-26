"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Search, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { SidebarContent } from "@/components/layout/Sidebar"

import { getReservationsByGuestId } from "../all-listings/Listing"

const ITEMS_PER_PAGE = 5

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "border-[#3F74E5] bg-[#3F74E5]/10 text-[#3F74E5] hover:bg-[#3F74E5]/20"
    case "Completed":
      return "border-[#39F61B] bg-[#39F61B]/10 text-[#39F61B] hover:bg-[#39F61B]/20"
    case "Canceled":
      return "border-[#FF3D00] bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20"
    default:
      return "bg-[#8c8c8c] text-white"
  }
}

export default function Dashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Check Auth
  if (typeof window !== "undefined") {
    const isAuth = localStorage.getItem("access_token") || localStorage.getItem("session")
    if (!isAuth) router.push("/")
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservationsByGuestId,
  })

  const reservationsData = data?.data || []

  const tabs = ["All", "Previous reservations", "Current reservations", "Upcoming reservations"]

  const filteredReservations = useMemo(() => {
    return reservationsData.filter((reservation: any) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Previous reservations" && reservation.type === "previous") ||
        (activeTab === "Current reservations" && reservation.type === "current") ||
        (activeTab === "Upcoming reservations" && reservation.type === "upcoming")

      const matchesSearch =
        reservation.apartment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.id?.toString().includes(searchQuery)

      return matchesTab && matchesSearch
    })
  }, [reservationsData, activeTab, searchQuery])

  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE)
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
        <SidebarContent />
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-[#000000] text-white p-0 border-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col min-w-0">
        <div className="bg-white p-4 lg:p-6 border-b border-[#ededed]">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </Button>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-1">Reservations</h1>
              <p className="text-[#8c8c8c] text-sm">View current, upcoming and past bookings</p>
            </div>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="bg-white px-4 lg:px-6 mt-6 border rounded-lg lg:mx-12 mx-4 py-4 border-[#ededed]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex space-x-6 lg:space-x-8 overflow-x-auto pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-[#59D750] bg-[#59D75014] rounded-lg p-3"
                      : "text-[#8c8c8c] hover:text-[#000000]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8c8c]" size={16} />
              <Input
                placeholder="Search by apartment or booking ID"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 pr-4 py-2 border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white overflow-hidden lg:mx-12 mx-4">
          <div className="overflow-x-auto h-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#f5f5f5] border-b border-[#ededed] sticky top-0 z-10">
                <tr>
                  {["Booking No", "Apartment Name", "Guests", "Check In", "Check Out", "Paid Amount", "Status"].map(
                    (head) => (
                      <th key={head} className="text-left py-3 px-4 lg:px-6 text-sm font-medium text-[#8c8c8c]">
                        {head}
                      </th>
                    )
                  )}
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-[#8c8c8c]">
                      Loading reservations...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-red-500">
                      Error loading reservations: {(error as Error).message}
                    </td>
                  </tr>
                ) : paginatedReservations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-[#8c8c8c]">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  paginatedReservations.map((reservation: any) => (
                    <tr key={reservation.id} className="border-b border-[#ededed] hover:bg-[#f5f5f5]/50">
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
                      <td className="py-4 px-4 lg:px-6 text-sm text-[#000000]">{reservation.checkIn}</td>
                      <td className="py-4 px-4 lg:px-6 text-sm text-[#000000]">{reservation.checkOut}</td>
                      <td className="py-4 px-4 lg:px-6 text-sm font-medium text-[#000000]">{reservation.amount}</td>
                      <td className="py-4 px-4 lg:px-6">
                        <Badge className={`${getStatusColor(reservation.status)} px-3 py-1 text-xs font-medium rounded-full`}>
                          {reservation.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-[#ededed] px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-[#8c8c8c] hover:text-[#000000]"
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  size="sm"
                  variant={currentPage === page ? "default" : "ghost"}
                  className={currentPage === page ? "bg-[#000000] text-white" : "text-[#8c8c8c] hover:text-[#000000]"}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-[#8c8c8c] hover:text-[#000000]"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
