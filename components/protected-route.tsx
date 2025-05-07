// components/protected-route.tsx
'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({
  children,
  redirectTo = '/',
}: {
  children: React.ReactNode
  redirectTo?: string
}) {
  const { session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push(redirectTo)
    }
  }, [session, isLoading, router, redirectTo])

  if (isLoading) {
    return <div>Loading...</div> // Or your custom loading component
  }

  if (!session) {
    return null // or return a redirect component if preferred
  }

  return <>{children}</>
}