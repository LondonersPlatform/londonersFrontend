"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart, Copy, Check, Facebook, Twitter, Mail, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Define types for our data
interface Amenity {
  name: string
}

interface Room {
  id: string
  name: string
  image: string
  amenities?: Amenity[]
}

export default function PhotoTour() {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Sample data for the rooms
  const rooms: Room[] = [
    {
      id: "bedroom",
      name: "Bedroom",
      image: "/t2.png",
    },
    {
      id: "shared-living-room",
      name: "Shared living room",
      image: "/t2.png",
      amenities: [{ name: "Air conditioning" }, { name: "Heating" }, { name: "TV" }],
    },
    {
      id: "bath-room",
      name: "Bath room",
      image: "/t2.png",
    },
    {
      id: "shared-full-kitchen",
      name: "Shared full kitchen",
      image: "/t2.png",
      amenities: [
        { name: "Baking sheet" },
        { name: "Coffee" },
        { name: "Cooking basics" },
        { name: "Dishes and silverware" },
        { name: "Dishwasher" },
        { name: "Freezer" },
        { name: "Hot water kettle" },
        { name: "Microwave" },
        { name: "Oven" },
        { name: "Refrigerator" },
        { name: "Rice maker" },
        { name: "Stove" },
        { name: "Toaster" },
        { name: "Wine glasses" },
      ],
    },
  ]

  // Kitchen detail images
  const kitchenDetailImages = [
    "/k1.png",
    "/k2.png",
    "/k3.png",
  ]

  // Living room detail images
  const livingRoomDetailImages = [
    "/t1.png",
    "/t1.png",
    "/t1.png",
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Photo tour</h1>
        <div className="flex gap-2">
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share this listing</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2 mt-4">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="link"
                    readOnly
                    value={typeof window !== "undefined" ? window.location.href : ""}
                    className="h-9"
                  />
                </div>
                <Button size="sm" className="px-3" onClick={copyToClipboard}>
                  <span className="sr-only">Copy</span>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-medium">Share via</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Link className="h-4 w-4" />
                    <span className="sr-only">Copy Link</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setSaved(!saved)}>
            <Heart className={`h-4 w-4 ${saved ? "fill-black" : ""}`} />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>

      {/* Room thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {rooms.map((room) => (
          <div key={room.id} className="space-y-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
            </div>
            <p className="text-sm font-medium">{room.name}</p>
          </div>
        ))}
      </div>

      {/* Living Room Section - Side by side layout */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-2">Shared living room</h2>
          <div className="flex flex-wrap gap-1">
            {rooms[1].amenities?.map((amenity, index) => (
              <span key={index} className="text-sm text-gray-500">
                {amenity.name}
                {index < (rooms[1].amenities?.length || 0) - 1 && " · "}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={livingRoomDetailImages[0] || "/placeholder.svg"}
                alt="Living room"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={livingRoomDetailImages[1] || "/placeholder.svg"}
                  alt="Living room detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={livingRoomDetailImages[2] || "/placeholder.svg"}
                  alt="Living room detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen Section - Side by side layout */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-2">Shared full kitchen</h2>
          <div className="flex flex-wrap gap-1">
            {rooms[3].amenities?.map((amenity, index) => (
              <span key={index} className="text-sm text-gray-500">
                {amenity.name}
                {index < (rooms[3].amenities?.length || 0) - 1 && " · "}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src={kitchenDetailImages[0] || "/placeholder.svg"} alt="Kitchen" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={kitchenDetailImages[1] || "/placeholder.svg"}
                  alt="Kitchen detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={kitchenDetailImages[2] || "/placeholder.svg"}
                  alt="Kitchen detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duplicate Kitchen Section - Side by side layout */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-2">Shared full kitchen</h2>
          <div className="flex flex-wrap gap-1">
            {rooms[3].amenities?.map((amenity, index) => (
              <span key={index} className="text-sm text-gray-500">
                {amenity.name}
                {index < (rooms[3].amenities?.length || 0) - 1 && " · "}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src={kitchenDetailImages[0] || "/placeholder.svg"} alt="Kitchen" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={kitchenDetailImages[1] || "/placeholder.svg"}
                  alt="Kitchen detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={kitchenDetailImages[2] || "/placeholder.svg"}
                  alt="Kitchen detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
