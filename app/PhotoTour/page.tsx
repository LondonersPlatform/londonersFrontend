"use client"

import { useState, useCallback, memo, useMemo } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart, Copy, Check, Facebook, Twitter, Mail, Link, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { usePhotoTourImages } from "./query/query"
import Loading from "../loading"
import { addFavorite, deleteFavorite } from "../all-listings/Listing"
import { useLoginModal } from "@/context/login-modal-context"

interface Room {
  name: string
  features: string[]
  images: string[]
  thumbnail: string
}

interface PhotoTourProps {
  rooms: Room[]
}

// Memoized RoomThumbnail to prevent unnecessary re-renders
const RoomThumbnail = memo(function RoomThumbnail({ room }: { room: Room}) {
  return (
    <div className="space-y-2">
      <div 
        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
    
      >
        <Image 
          src={room.thumbnail} 
          alt={room.name} 
          fill 
          className="object-cover object-center" 
          sizes="(max-width: 640px) 50vw, 25vw"
          priority={false}
        />
      </div>
      <p className="text-sm font-medium">{room.name}</p>
    </div>
  )
})

// Memoized RoomSection to prevent unnecessary re-renders
const RoomSection = memo(function RoomSection({ room, onImageClick }: { 
  room: Room; 
  onImageClick: (index: number) => void 
}) {
  return (
    <div className="mb-12 justify-center grid grid-cols-1 md:grid-cols-3 gap-6">
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
          {room.images[0] && (
            <div 
              className="relative aspect-video overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onImageClick(0)}
            >
              <Image
                src={room.images[0]}
                alt={`${room.name} main view`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
            </div>
          )}
          
          {room.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(1).map((image, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onImageClick(imgIndex + 1)}
                >
                  <Image
                    src={image}
                    alt={`${room.name} detail ${imgIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={imgIndex < 2} // Only prioritize first few images
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

// Memoized ImageViewer to prevent unnecessary re-renders
const ImageViewer = memo(function ImageViewer({ 
  isOpen, 
  room, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}: {
  isOpen: boolean
  room: Room | null
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close image viewer"
      >
        <X className="h-8 w-8" />
      </button>
      
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center">
        <button 
          onClick={onPrev}
          className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={room.images[currentIndex]}
            alt={`${room.name} image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        
        <button 
          onClick={onNext}
          className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        {currentIndex + 1} / {room.images.length}
      </div>
    </div>
  )
})

export default function PhotoTour() {
  const { setRedirectPath, setLoginOpen } = useLoginModal();
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const searchParams = useSearchParams();
  const listing_id = searchParams.get('listingId');
  const { data, isLoading, isError, error } = usePhotoTourImages(listing_id);
  const router = useRouter();

  const copyToClipboard = useCallback(() => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const openImageViewer = useCallback((room: Room, index: number) => {
    setCurrentRoom(room)
    setCurrentImageIndex(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = useCallback(() => {
    setIsViewerOpen(false)
  }, [])

  const goToPrevious = useCallback(() => {
    if (!currentRoom) return
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? currentRoom.images.length - 1 : prevIndex - 1
    )
  }, [currentRoom])

  const goToNext = useCallback(() => {
    if (!currentRoom) return
    setCurrentImageIndex(prevIndex => 
      prevIndex === currentRoom.images.length - 1 ? 0 : prevIndex + 1
    )
  }, [currentRoom])

  const handleFavoriteClick = useCallback(async (
    e: React.MouseEvent,
    listingId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const accessToken = localStorage.getItem("access_token");
    const guestyId = localStorage.getItem("GuestyId");

    if (!accessToken || !guestyId) {
      setRedirectPath("/all-listings");
      setLoginOpen(true);
      return;
    }

    const newFavoriteState = !saved;
    setSaved(newFavoriteState);

    try {
      if (newFavoriteState) {
        await addFavorite({
          guestyUserId: guestyId,
          listingId,
        });
      } else {
        await deleteFavorite({
          guesty_user_id: guestyId,
          listingId,
        });
      }
    } catch (error: any) {
      console.error("Failed to update favorite:", error.message);
      setSaved(!newFavoriteState);
    }
  }, [saved, setLoginOpen, setRedirectPath])

  const shareButtons = useMemo(() => [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Mail, label: "Email" },
    { icon: Link, label: "Copy Link" }
  ], [])

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center py-8">Error: {(error as Error).message}</p>;
  if (!data) return <p className="text-center py-8">No data available</p>;

  return (
    <div className="container mx-auto max-w-6xl px-4 ">
      {/* Header */}
    <div className="sticky top-0  z-30 bg-white flex items-center justify-between mb-6 py-4 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Photo tour</h1>
     
        <div className="flex gap-2">
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full" aria-label="Share">
                <Share2 className="h-4 w-4" />
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
                <Button size="sm" className="px-3" onClick={copyToClipboard} aria-label={copied ? "Copied" : "Copy"}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-medium">Share via</h3>
                <div className="flex gap-4">
                  {shareButtons.map(({ icon: Icon, label }) => (
                    <Button key={label} variant="outline" size="icon" className="rounded-full" aria-label={label}>
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={(e) => handleFavoriteClick(e, listing_id as string)}
            aria-label={saved ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-red-600 text-red-700" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="max-w-screen-lg items-center justify-center mx-auto">
        {/* Room thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {data.rooms.map((room, index) => (
            <RoomThumbnail 
              key={index} 
              room={room} 
      
            />
          ))}
        </div>
      </div>

      {/* Room sections */}
      {data.rooms.map((room, index) => (
        <RoomSection 
          key={index} 
          room={room} 
          onImageClick={(imgIndex) => openImageViewer(room, imgIndex)} 
        />
      ))}

      <ImageViewer
        isOpen={isViewerOpen}
        room={currentRoom}
        currentIndex={currentImageIndex}
        onClose={closeImageViewer}
        onPrev={goToPrevious}
        onNext={goToNext}
      />
    </div>
  )
}