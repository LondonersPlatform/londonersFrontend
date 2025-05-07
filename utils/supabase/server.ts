// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from './client'

export async function getSession() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Check if token needs refresh (5 minutes before expiry)
  const expiresAt = session.expires_at ? new Date(session.expires_at * 1000) : null
  const now = new Date()
  
  if (expiresAt && (expiresAt.getTime() - now.getTime() < 300000)) {
    const { data: { session: newSession }, error } = await supabase.auth.refreshSession()
    
    if (error) {
      return NextResponse.json({ error: 'Session refresh failed' }, { status: 401 })
    }
    
    return newSession
  }

  return session
}