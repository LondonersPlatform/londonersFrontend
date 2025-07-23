"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import Arrowright from "@/public/svg-assets/arrowright"
import { ResponsiveModal } from "../ui/ResponsiveModal"

export default function CancellationPolicyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <ResponsiveModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Cancellation Policy"
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
          <p className="text-sm text-gray-700 leading-relaxed">
            Make sure you're comfortable with this Host's policy. In rare cases,
            you may be eligible for a refund outside of this policy under Airbnb's{" "}
            <a href="#" className="underline text-gray-900">
              Major Disruptive Events Policy
            </a>
            .
          </p>

          <div className="space-y-6">
            {/* Within 48 hours */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">Within</p>
                <p className="text-sm text-gray-700">48 hours</p>
                <p className="text-sm text-gray-700">after booking</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">Full refund</p>
                <p className="text-sm text-gray-700">Get back 100% of what you paid.</p>
              </div>
            </div>

            {/* Before Jul 11 */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">Before</p>
                <p className="text-sm text-gray-700">Jul 11</p>
                <p className="text-sm text-gray-700">3:00 PM</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">Partial refund</p>
                <p className="text-sm text-gray-700">
                  Get back 50% of every night. No refund of the service fee.
                </p>
              </div>
            </div>

            {/* After Jul 11 */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">After</p>
                <p className="text-sm text-gray-700">Jul 11</p>
                <p className="text-sm text-gray-700">3:00 PM</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">No refund</p>
                <p className="text-sm text-gray-700">This reservation is non-refundable.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a href="#" className="text-sm underline text-gray-900">
              Learn more about cancellation policies
            </a>
          </div>
        </div>
      </ResponsiveModal>
    </div>
  )
}
