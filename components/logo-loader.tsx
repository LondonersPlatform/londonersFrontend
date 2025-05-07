"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LogoLoaderProps {
  isLoading?: boolean
  onLoadingComplete?: () => void
  timeout?: number
}

export default function LogoLoader({ isLoading = true, onLoadingComplete, timeout = 3000 }: LogoLoaderProps) {
  const [visible, setVisible] = useState(isLoading)

  useEffect(() => {
    setVisible(isLoading)

    let timer: NodeJS.Timeout

    if (isLoading && timeout) {
      timer = setTimeout(() => {
        setVisible(false)
        if (onLoadingComplete) onLoadingComplete()
      }, timeout)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isLoading, timeout, onLoadingComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95">
      <div className="relative flex flex-col items-center">
        <div className="animate-pulse">
          <Image src="/imglogo.png" alt="LONDONERS.com" width={300} height={80} priority />
        </div>
        <div className="mt-6 flex space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-black" style={{ animationDelay: "0ms" }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-black" style={{ animationDelay: "150ms" }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-black" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
