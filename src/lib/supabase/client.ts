import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isConfigured = url && key

export function createClient() {
  if (!isConfigured) {
    throw new Error(
      'Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
    )
  }

  return createBrowserClient(url!, key!)
}

export function isSupabaseConfigured() {
  return isConfigured
}
