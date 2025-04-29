import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PropertyHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder.svg?height=30&width=120" alt="Londoner's Logo" width={120} height={30} />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-sm font-medium">
              Places to stay
            </Link>
            <Link href="#" className="text-sm font-medium">
              Check out
            </Link>
            <Link href="#" className="text-sm font-medium">
              Rentals
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            List a property
          </Button>
          <Button size="sm">Login</Button>
        </div>
      </div>
    </header>
  )
}

