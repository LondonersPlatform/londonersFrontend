"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, getFavorite } from "../all-listings/Listing";
import { useEffect, useState } from "react";
import LogoLoader from "@/components/logo-loader";
import { SidebarContent } from "@/components/layout/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Share,
  Trash2,
  MapPin,
  Star,
  Bed,
  Users,
  Bath,
  Eye,
  Menu,
  Heart,
} from "lucide-react";
import Image from "next/image";
import ShareModalListing from "@/components/listings/ShareModalListing";

export default function Favourite() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const guestyUserId = localStorage.getItem("GuestyId");
      if (!guestyUserId) return [];
      return await getFavorite({ guesty_user_id: guestyUserId });
    },
  });

  const guestyUserId =
    typeof window !== "undefined" ? localStorage.getItem("GuestyId") : null;

  const deleteMutation = useMutation({
    mutationFn: ({ listingId }: { listingId: string }) =>
      deleteFavorite({ guesty_user_id: guestyUserId as string, listingId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      setDialogOpen(false);
      setSelectedListingId(null);
    },
  });

  const handleViewDetails = (listing: any) => {
    const queryParams = new URLSearchParams({
      area: listing.area || "",
      rating: listing.rating?.toString() || "",
      bedroom: listing.bedrooms?.toString() || "",
      bath: listing.baths?.toString() || "",
      beds: listing.beds?.toString() || "",
      guests: listing.guests?.toString() || "",
      title: listing.name || "",
    });

    router.push(`/all-listings/${listing.id}?${queryParams.toString()}`);
  };

  useEffect(() => {
    const isAuth =
      localStorage.getItem("access_token") || localStorage.getItem("session");
    if (!isAuth) {
      router.push("/"); // ✅ Redirect if not authenticated
    }
  }, []);
  if (isLoading) return <LogoLoader />;

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
        <SidebarContent />
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-[#000000] text-white p-0 border-0"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Header */}
        <div className="bg-white p-4 lg:p-6">
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

        {/* Listings */}

        {favorites.length === 0 ? (
          <div className="flex flex-col h-full bg-slate-100 mx-6 rounded-xl items-center justify-center  text-center space-y-4">
            <Heart size={56} />
            <h2 className="text-2xl font-semibold text-[#000000]">
              No Favorites Yet
            </h2>
            <p className="text-[#8c8c8c] max-w-md">
              You haven't added any apartments to your favorites. Explore
              listings and mark your favorite ones to see them here.
            </p>
            <Button
              onClick={() => router.push("/all-listings")}
              className="bg-[#000000] text-white hover:bg-[#000000]/90 px-6 py-2 rounded-full"
            >
              Explore Listings
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-6 py-0">
            <div className="space-y-4">
              {favorites.map((apartment: any) => {
                const queryParams = new URLSearchParams({
                  area: apartment.area || "",
                  rating: apartment.rating?.toString() || "",
                  bedroom: apartment.bedrooms?.toString() || "",
                  bath: apartment.baths?.toString() || "",
                  beds: apartment.beds?.toString() || "",
                  guests: apartment.guests?.toString() || "",
                  title: apartment.name || "",
                });

                const urlPathId = `/all-listings/${
                  apartment.id
                }?${queryParams.toString()}`;

                return (
                  <div
                    key={apartment.id}
                    className="bg-white rounded-lg shadow-sm border border-[#ededed] overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      {/* Images */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 col-span-2">
                        {[0, 1].map((idx) => (
                          <div key={idx} className="relative w-full h-64">
                            <Image
                              src={
                                apartment.images?.[idx] || "/placeholder.svg"
                              }
                              alt={apartment.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-6 flex flex-col justify-between col-span-3">
                        <div className="flex items-start justify-between mb-4">
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
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setShareModalOpen(true)}
                              >
                                <Share size={16} className="mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-[#ff3d00] focus:text-[#ff3d00]"
                                onClick={() => {
                                  setSelectedListingId(apartment.id);
                                  setDialogOpen(true);
                                }}
                              >
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
                                className={
                                  i < Math.floor(apartment.rating)
                                    ? "text-[#ffc107] fill-[#ffc107]"
                                    : "text-[#d9d9d9]"
                                }
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

                        {/* Share Modal */}
                        <ShareModalListing
                          urlPathId={`${window.location.origin}${urlPathId}`}
                          shareModalOpen={shareModalOpen}
                          setShareModalOpen={setShareModalOpen}
                          imagesDummy={apartment.images}
                          title={apartment.name}
                          rating={apartment.rating}
                          area={apartment.location}
                          bedroom={apartment.bedrooms}
                          beds={apartment.beds}
                          bath={apartment.baths}
                          guests={apartment.guests}
                        />

                        {/* View Button */}
                        <div>
                          <Button
                            onClick={() => handleViewDetails(apartment)}
                            className="bg-[#000000] text-white hover:bg-[#000000]/90 px-6 py-0 rounded-2xl text-sm font-medium"
                          >
                            <Eye size={16} className="mr-2" />
                            View details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Do you really want to remove this listing from favorites? This
            action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-700 hover:bg-red-800"
              onClick={() =>
                selectedListingId &&
                deleteMutation.mutate({ listingId: selectedListingId })
              }
            >
              {deleteMutation.isPending && (
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  />
                </svg>
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
