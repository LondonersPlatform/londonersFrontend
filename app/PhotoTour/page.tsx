"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart, Copy, Check, Facebook, Twitter, Mail, Link, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { usePhotoTourImages } from "./query/query"
import Loading from "../loading"

// Define types based on the API response
interface Room {
  name: string
  features: string[]
  images: string[]
  thumbnail: string
}

interface PhotoTourProps {
  rooms: Room[]
}

export default function PhotoTour() {
  const rooms = [
    {
      "name": "full bathroom",
      "features": [
        "Bidet",
        "Body soap",
        "Cleaning products",
        "Conditioner",
        "Hair dryer",
        "Heating",
        "Hot water",
        "Shampoo",
        "Shower gel"
      ],
      "images": [
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260859714-rpqmetg0uhq87oyfvrtg.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260871898-jupkbly73wkn40xqzmlv.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260881597-ry3whaoh1oblexsts13e.jpg.jpg"
      ],
      "thumbnail": "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260859714-rpqmetg0uhq87oyfvrtg.jpg.jpg"
    },
    {
      "name": "full kitchen",
      "features": [
        "Coffee",
        "Coffee maker",
        "Stove",
        "Cooking basics",
        "Dishes and silverware",
        "Freezer",
        "Refrigerator",
        "High chair",
        "Hot water kettle",
        "Microwave",
        "Mini fridge",
        "Oven",
        "Toaster",
        "Wine glasses"
      ],
      "images": [
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260746329-izpwtbko6yx8tz56aad6.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260757197-ey5tqkwv9b5seskrhscw.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260766517-agxjyrqq4pf3prcncgz6.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260780100-z3dma9mk3iwaxjreanwe.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260793343-slonscmgv5flrxqcfkjt.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260810267-vxquw1r9bp2jxnisdegw.jpg.jpg"
      ],
      "thumbnail": "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260746329-izpwtbko6yx8tz56aad6.jpg.jpg"
    },
    {
      "name": "living area",
      "features": [
        "King bed",
        "Sofa bed",
        "Heating",
        "TV"
      ],
      "images": [
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260551727-mkke8ciejlkty51purem.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260569757-ckmrmdidnmaiwkxflsij.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260577157-gio8ntncvxkfaytlm022.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260590503-lpqczobwcxm5wcem8tje.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260607187-gkproarq9en5o6vcp4fd.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260617756-uur1qfda67frc5lfgva3.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260633438-zntkdnz45wk7v4mmgelx.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260641041-bovj2hfvcjz0ocp7am4c.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260650624-nabe7acufzytmzlbpskb.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260668118-sbm5eo7zb1fx9n3omqdw.jpg.jpg",
        "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260688782-swejxnvjyfnbhgtme6rj.jpg.jpg"
      ],
      "thumbnail": "https://oaumvyuwtzuyhkwzzxtb.supabase.co/storage/v1/object/public/images/67dc70e7f5e903001a135050/1748260551727-mkke8ciejlkty51purem.jpg.jpg"
    }
  ]

  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  
  // Image viewer state
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openImageViewer = useCallback((room: Room, index: number) => {
    setCurrentRoom(room)
    setCurrentImageIndex(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setIsViewerOpen(false)
  }

  const goToPrevious = () => {
    if (!currentRoom) return
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? currentRoom.images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    if (!currentRoom) return
    setCurrentImageIndex(prevIndex => 
      prevIndex === currentRoom.images.length - 1 ? 0 : prevIndex + 1
    )
  }


const searchParams = useSearchParams();
const listing_id = searchParams.get('listingId');
const { data, isLoading, isError, error } = usePhotoTourImages(listing_id);
  const router = useRouter();
console.log("data==>",data)
  if (isLoading) return <Loading/>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
     <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => router.back()} // Go back to the previous page
    >
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

      <div className="max-w-screen-lg items-center justify-center mx-auto">
        {/* Room thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {rooms.map((room, index) => (
            <div key={index} className="space-y-2">
              <div 
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openImageViewer(room, 0)}
              >
                <Image 
                  src={room.thumbnail} 
                  alt={room.name} 
                  fill 
                  className="object-cover object-center" 
                  unoptimized 
                />
              </div>
              <p className="text-sm font-medium">{room.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Room sections */}
      {rooms.map((room, index) => (
        <div key={index} className="mb-12 justify-center grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h2 className="text-xl font-medium mb-2">{room.name}</h2>
            <div className="flex flex-wrap gap-1">
              {room.features.map((feature, featureIndex) => (
                <span key={featureIndex} className="text-sm text-gray-500">
                  {feature}
                  {featureIndex < room.features.length - 1 && " · "}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              {/* Main image (first image) */}
              {room.images[0] && (
                <div 
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageViewer(room, 0)}
                >
                  <Image
                    src={room.images[0]}
                    alt={`${room.name} main view`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              
              {/* Additional images in 2-column grid */}
              {room.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {room.images.slice(1).map((image, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageViewer(room, imgIndex + 1)}
                    >
                      <Image
                        src={image}
                        alt={`${room.name} detail ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Image Viewer Modal */}
      {isViewerOpen && currentRoom && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={closeImageViewer}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center">
            <button 
              onClick={goToPrevious}
              className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={currentRoom.images[currentImageIndex]}
                alt={`${currentRoom.name} image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            
            <button 
              onClick={goToNext}
              className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {currentImageIndex + 1} / {currentRoom.images.length}
          </div>
        </div>
      )}
    </div>
  )
}