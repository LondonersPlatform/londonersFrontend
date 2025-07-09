"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Users, Dog, PartyPopper, Cigarette } from "lucide-react"

import Arrowright from "@/public/svg-assets/arrowright"
import { ResponsiveModal } from "../ui/ResponsiveModal"

export default function HouseRulesModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="House Rules"
      trigger={
        <Button
          variant="outline"
          className="text-sm mt-6 font-semibold hover:bg-transparent items-center gap-1 rounded-3xl mx-0 px-0 border-none underline"
        >
          Show More
          <Arrowright />
        </Button>
      }
      className="max-w-2xl"
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-700">
          You'll be staying in someone's home, so please treat it with care and respect.
        </p>

        <div className="space-y-4">
          <h3 className="font-medium text-sm">Checking in and out</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Check-in after 16:00</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Check-out before 11:00</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm">5 guests maximum</span>
          </div>

          <div className="flex items-center gap-3">
            <Dog className="w-5 h-5 text-gray-600" />
            <span className="text-sm">No pets</span>
          </div>

          <div className="flex items-center gap-3">
            <PartyPopper className="w-5 h-5 text-gray-600" />
            <span className="text-sm">No parties or events</span>
          </div>

          <div className="flex items-center gap-3">
            <Cigarette className="w-5 h-5 text-gray-600" />
            <span className="text-sm">No smoking</span>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  )
}
