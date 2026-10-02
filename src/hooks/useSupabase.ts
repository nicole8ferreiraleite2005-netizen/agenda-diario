import { useMemo } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

export function useSupabase() {
  return useMemo(() => {
    if (!isSupabaseConfigured()) {
      return null
    }
    return createClient()
  }, [])
}
