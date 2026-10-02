'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from './useSupabase'

export interface Memory {
  id: string
  task_id?: string
  title?: string
  image_url?: string
  notes?: string
  completed_at?: string
  created_at?: string
}

export function useSupabaseMemories() {
  const supabase = useSupabase()
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMemories = async () => {
    if (!supabase) {
      loadMemoriesFromLocalStorage()
      return
    }

    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setMemories(data || [])
    } catch (err) {
      console.error('Erro ao carregar memórias:', err)
      loadMemoriesFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  const loadMemoriesFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('memories')
      setMemories(stored ? JSON.parse(stored) : [])
    } catch (e) {
      setMemories([])
    }
    setLoading(false)
  }

  const createMemory = async (memory: Omit<Memory, 'id' | 'created_at'>) => {
    if (!supabase) {
      return createMemoryLocal(memory)
    }

    try {
      const { data, error: err } = await supabase
        .from('memories')
        .insert([memory])
        .select()

      if (err) throw err
      if (data) {
        setMemories([data[0], ...memories])
        return { success: true, data: data[0] }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao criar memória'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const createMemoryLocal = (memory: Omit<Memory, 'id' | 'created_at'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    const updated = [newMemory, ...memories]
    setMemories(updated)
    try {
      localStorage.setItem('memories', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true, data: newMemory }
  }

  const updateMemory = async (id: string, updates: Partial<Memory>) => {
    if (!supabase) {
      return updateMemoryLocal(id, updates)
    }

    try {
      const { data, error: err } = await supabase
        .from('memories')
        .update(updates)
        .eq('id', id)
        .select()

      if (err) throw err
      if (data) {
        setMemories(memories.map(m => m.id === id ? data[0] : m))
        return { success: true, data: data[0] }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao atualizar'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const updateMemoryLocal = (id: string, updates: Partial<Memory>) => {
    const updated = memories.map(m => m.id === id ? { ...m, ...updates } : m)
    setMemories(updated)
    try {
      localStorage.setItem('memories', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true, data: updated.find(m => m.id === id) }
  }

  const deleteMemory = async (id: string) => {
    if (!supabase) {
      return deleteMemoryLocal(id)
    }

    try {
      const { error: err } = await supabase
        .from('memories')
        .delete()
        .eq('id', id)

      if (err) throw err
      setMemories(memories.filter(m => m.id !== id))
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao deletar'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const deleteMemoryLocal = (id: string) => {
    const updated = memories.filter(m => m.id !== id)
    setMemories(updated)
    try {
      localStorage.setItem('memories', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true }
  }

  useEffect(() => {
    loadMemories()
  }, [supabase])

  return {
    memories,
    loading,
    error,
    createMemory,
    updateMemory,
    deleteMemory,
    loadMemories,
  }
}
