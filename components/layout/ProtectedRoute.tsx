'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (session === null) {
      router.push('/') // Redirect to login or landing page
    }
  }, [session])

  if (session === null || !session) return null // Show nothing while checking auth

  return <>{children}</>
}
