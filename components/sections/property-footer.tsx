import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function PropertyFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Image src="/placeholder.svg?height=30&width=120" alt="Londoner's Logo" width={120} height={30} />
            <p className="text-sm text-gray-500 mt-2">Luxury apartments in London</p>
          </div>
          <div className="flex justify-start md:justify-end space-x-4">
            <Link href="#" className="p-2 bg-gray-100 rounded-full">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-100 rounded-full">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-100 rounded-full">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 text-sm text-gray-500">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <Link href="#">Privacy policy</Link>
            <Link href="#">Terms and conditions</Link>
            <Link href="#">Blog</Link>
          </div>
          <div>Londoners © 2025 All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}

