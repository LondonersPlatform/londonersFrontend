// context/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'

type AuthContextType = {
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  signOut: async () => {},
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Initialize session check
    const initializeSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession()
      setSession(initialSession)
      setIsLoading(false)

      // Store in localStorage if session exists
      if (initialSession) {
        localStorage.setItem('access_token', initialSession.access_token)
        localStorage.setItem('email', initialSession.user.email ?? '')
      }
    }

    initializeSession()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession)
      
      // Handle specific auth events
      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          if (newSession) {
            localStorage.setItem('access_token', newSession.access_token)
            localStorage.setItem('email', newSession.user.email ?? '')
          }
          break
        case 'SIGNED_OUT':
          localStorage.removeItem('access_token')
          localStorage.removeItem('email')
          router.push('/')
          break
      }
    })

    // Set up token refresh timer
    const refreshTimer = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      if (currentSession?.expires_at) {
        const expiresAt = new Date(currentSession.expires_at * 1000)
        const now = new Date()
        const fiveMinutes = 5 * 60 * 1000 // 5 minutes in milliseconds
        
        // Refresh if token expires in less than 5 minutes
        if (expiresAt.getTime() - now.getTime() < fiveMinutes) {
          await supabase.auth.refreshSession()
        }
      }
    }, 60 * 1000) // Check every minute

    return () => {
      subscription?.unsubscribe()
      clearInterval(refreshTimer)
    }
  }, [router, supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const refreshSession = async () => {
    setIsLoading(true)
    const { data: { session: refreshedSession } } = await supabase.auth.getSession()
    setSession(refreshedSession)
    setIsLoading(false)
    return refreshedSession
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}