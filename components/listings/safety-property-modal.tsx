"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Building } from "lucide-react"
import Modal from "../ui/modal"
import Arrowright from "@/public/svg-assets/arrowright"


export default function SafetyPropertyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
     <Button variant="outline" className="text-sm mt-6 hover:bg-transparent items-center gap-1 rounded-3xl mx-0 px-0  border-none underline " onClick={() => setIsOpen(true)}>
       Show More
       <Arrowright />
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Safety & Property">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-gray-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Security camera/recording device</p>
                <p className="text-sm text-gray-600">CCTV Security Cameras installed by the building entrance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-gray-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Must climb stairs</p>
                <p className="text-sm text-gray-600">Just one flight of stairs to access the apartment.</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed">
            {"We don't have a drive way or garage, but you can find street parking in the area. You can visit"}{" "}
            <a href="https://www.justpark.com/uk/parking/marylebone" className="underline text-gray-900">
              https://www.justpark.com/uk/parking/marylebone
            </a>
            {", input the street name and dates, and it will display nearby spots available for booking."}
          </div>
        </div>
      </Modal>
    </>
  )
}
