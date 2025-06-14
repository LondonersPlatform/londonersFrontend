"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Suspense, useState } from "react";
import Loading from "../loading";

import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Heart,
  User,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reservations = [
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "New",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Active",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Canceled",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Active",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Active",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "New",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "New",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Completed",
  },
  {
    id: "#8987776754",
    apartmentName: "Marlybone book",
    guests: 8,
    checkIn: "10 Jun 2025, 14:00",
    checkOut: "12 Jun 2025, 12:00",
    paidAmount: "$252",
    status: "Canceled",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "New":
      return "default";
    case "Completed":
      return "secondary";
    case "Active":
      return "outline";
    case "Canceled":
      return "destructive";
    default:
      return "default";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Active":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Canceled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
activeTab
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <ProtectedRoute>
        <div className="rounded-2xl   flex justify-center items-center font-bold text-2xl w-full  overflow-y-auto">
          <div className="flex-1 flex flex-col  ">
            <main className="flex-1   relative overflow-y-auto focus:outline-none">
              <div className=" ">
                <div className="  mx-auto px-4 sm:px-6 md:px-8">
                  <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Reservations
                    </h1>
                    <p className="mt-1 text-sm font-normal text-gray-400">
                      This section displays recent messages submitted by
                      londoner's support team
                    </p>
                  </div>

                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full   rounded-lg  border"
                  >
                    <div className="flex flex-col    sm:flex-row sm:items-center sm:justify-between gap-4 my-6 px-5">
                      <TabsList className="grid w-full   bg-white sm:w-auto grid-cols-4 lg:grid-cols-4">
                        <TabsTrigger value="all" className=" bg-[#59D75014] text-[#59D750]" >All</TabsTrigger>
                        <TabsTrigger value="previous">
                          Previous reservations
                        </TabsTrigger>
                        <TabsTrigger value="current">
                          Current reservations
                        </TabsTrigger>
                        <TabsTrigger value="upcoming">
                          Upcoming reservations
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex items-center gap-2">
                        <div className="relative flex-1 sm:flex-initial">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search by subject, title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-xl shadow  font-normal w-full sm:w-80"
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <TabsContent value={activeTab} className="mt-0  border ">
                      <div className=" lg:w-full w-[450px] px-4 sm:px-6 ">
                        <div className="   overflow-auto " >
                          <Table>
                            <TableHeader className="bg-[#F5F5F5] shadow  rounded-lg">
                              <TableRow>
                                <TableHead className="w-32">
                                  Booking No
                                </TableHead>
                                <TableHead>Apartment Name</TableHead>
                                <TableHead className="w-20">Guests</TableHead>
                                <TableHead className="w-36">Check In</TableHead>
                                <TableHead className="w-36">
                                  Check Out
                                </TableHead>
                                <TableHead className="w-28">
                                  Paid Amount
                                </TableHead>
                                <TableHead className="w-28">Status</TableHead>
                                <TableHead className="w-12"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className=" font-medium">
                              {reservations.map((reservation, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">
                                    {reservation.id}
                                  </TableCell>
                                  <TableCell>
                            <div className="flex items-center justify-start gap-3">
                                      <div className="flex shadow-lg  w-auto border rounded-full items-center py-1 px-4 flex-inline gap-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                        <AvatarFallback>MB</AvatarFallback>
                                      </Avatar>
                                      <span>{reservation.apartmentName}</span>
                                    </div>
                            </div>
                                  </TableCell>
                                  <TableCell>{reservation.guests}</TableCell>
                                  <TableCell>{reservation.checkIn}</TableCell>
                                  <TableCell>{reservation.checkOut}</TableCell>
                                  <TableCell>
                                    {reservation.paidAmount}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={getStatusColor(
                                        reservation.status
                                      )}
                                    >
                                      {reservation.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          View details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Edit reservation
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Cancel reservation
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-center">
                  {/**add paggination here  */}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </Suspense>
  );
}

export default Dashboard;
