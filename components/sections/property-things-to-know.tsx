import { Button } from "@/components/ui/button"

export function PropertyThingsToKnow() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Things to know</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="font-medium">House Rules</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Check-in after 15:00</li>
            <li>Checkout before 11:00</li>
            <li>4 guests maximum</li>
          </ul>
          <Button variant="ghost" className="text-sm h-auto p-0">
            Show more
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Safety & Property</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Carbon monoxide alarm</li>
            <li>Smoke alarm</li>
            <li>Security camera/recording device</li>
          </ul>
          <Button variant="ghost" className="text-sm h-auto p-0">
            Show more
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Cancellation Policy</h3>
          <p className="text-sm text-gray-700">
            Free cancellation within 48 hours of booking. After that, cancel before 5 days of your trip and get a 50%
            refund.
          </p>
          <Button variant="ghost" className="text-sm h-auto p-0">
            Show more
          </Button>
        </div>
      </div>
    </div>
  )
}

