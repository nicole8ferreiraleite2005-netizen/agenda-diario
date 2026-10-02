'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from './useSupabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const supabase = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let mounted = true

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setUser(session?.user ?? null)
        }
      } catch (err) {
        console.error('Error getting session:', err)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getSession()

    // Real-time auth state subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string) => {
    setError(null)
    if (!supabase) {
      setError('Supabase não configurado. Use localStorage.')
      return { success: false, error: 'Supabase não configurado' }
    }

    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao fazer login'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const signup = async (email: string, password: string) => {
    setError(null)
    if (!supabase) {
      setError('Supabase não configurado. Use localStorage.')
      return { success: false, error: 'Supabase não configurado' }
    }

    try {
      const { error: err } = await supabase.auth.signUp({ email, password })
      if (err) throw err
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao criar conta'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const logout = async () => {
    if (!supabase) {
      setUser(null)
      return
    }

    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  return { user, loading, error, login, signup, logout }
}
