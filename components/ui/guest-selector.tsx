"use client"

import { useState, useRef, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuestType {
  adults: number
  children: number
  infants: number
}

interface GuestSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (guests: GuestType) => void
  initialGuests?: GuestType
}

export default function GuestSelector({
  isOpen,
  onClose,
  onSelect,
  initialGuests = { adults: 1, children: 0, infants: 0 },
}: GuestSelectorProps) {
  const [guests, setGuests] = useState<GuestType>(initialGuests)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const updateGuests = (type: keyof GuestType, value: number) => {
    const newGuests = { ...guests, [type]: Math.max(0, value) }
    setGuests(newGuests)
    onSelect(newGuests)
  }

  if (!isOpen) return null

  return (
    <div ref={containerRef} className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg p-6 w-80  z-50 border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Adults</p>
            <p className="text-sm text-gray-500">Age 13 or above</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests("adults", guests.adults - 1)}
              disabled={guests.adults <= 1}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                guests.adults <= 1
                  ? "border-gray-200 text-gray-300"
                  : "border-gray-400 text-gray-600 hover:border-black hover:text-black",
              )}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-4 text-center">{guests.adults}</span>
            <button
              onClick={() => updateGuests("adults", guests.adults + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Children</p>
            <p className="text-sm text-gray-500">Age 2-12</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests("children", guests.children - 1)}
              disabled={guests.children <= 0}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                guests.children <= 0
                  ? "border-gray-200 text-gray-300"
                  : "border-gray-400 text-gray-600 hover:border-black hover:text-black",
              )}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-4 text-center">{guests.children}</span>
            <button
              onClick={() => updateGuests("children", guests.children + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Infants</p>
            <p className="text-sm text-gray-500">Under 2</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests("infants", guests.infants - 1)}
              disabled={guests.infants <= 0}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                guests.infants <= 0
                  ? "border-gray-200 text-gray-300"
                  : "border-gray-400 text-gray-600 hover:border-black hover:text-black",
              )}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-4 text-center">{guests.infants}</span>
            <button
              onClick={() => updateGuests("infants", guests.infants + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:border-black hover:text-black"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

