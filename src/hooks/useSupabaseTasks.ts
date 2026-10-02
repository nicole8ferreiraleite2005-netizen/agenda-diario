'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from './useSupabase'

export interface Task {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed' | 'cancelled'
  completed_at?: string | null
  mural_image_url?: string | null
  mural_notes?: string | null
  created_at?: string
}

export function useSupabaseTasks() {
  const supabase = useSupabase()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = async () => {
    if (!supabase) {
      loadTasksFromLocalStorage()
      return
    }

    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true })

      if (err) throw err
      setTasks(data || [])
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err)
      loadTasksFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  const loadTasksFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('tasks')
      setTasks(stored ? JSON.parse(stored) : getMockTasks())
    } catch (e) {
      setTasks(getMockTasks())
    }
    setLoading(false)
  }

  const getMockTasks = (): Task[] => [
    {
      id: '1',
      title: 'Exemplar tarefa 1',
      description: 'Use Supabase para salvar permanentemente',
      due_date: new Date().toISOString().split('T')[0],
      priority: 'high',
      status: 'pending',
    },
  ]

  const createTask = async (task: Omit<Task, 'id' | 'created_at'>) => {
    if (!supabase) {
      return createTaskLocal(task)
    }

    try {
      const { data, error: err } = await supabase
        .from('tasks')
        .insert([task])
        .select()

      if (err) throw err
      if (data) {
        setTasks([...tasks, data[0]])
        return { success: true, data: data[0] }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao criar tarefa'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const createTaskLocal = (task: Omit<Task, 'id' | 'created_at'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    const updated = [...tasks, newTask]
    setTasks(updated)
    try {
      localStorage.setItem('tasks', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true, data: newTask }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!supabase) {
      return updateTaskLocal(id, updates)
    }

    try {
      const { data, error: err } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()

      if (err) throw err
      if (data) {
        setTasks(tasks.map(t => t.id === id ? data[0] : t))
        return { success: true, data: data[0] }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao atualizar'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const updateTaskLocal = (id: string, updates: Partial<Task>) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    setTasks(updated)
    try {
      localStorage.setItem('tasks', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true, data: updated.find(t => t.id === id) }
  }

  const deleteTask = async (id: string) => {
    if (!supabase) {
      return deleteTaskLocal(id)
    }

    try {
      const { error: err } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (err) throw err
      setTasks(tasks.filter(t => t.id !== id))
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao deletar'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const deleteTaskLocal = (id: string) => {
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    try {
      localStorage.setItem('tasks', JSON.stringify(updated))
    } catch (e) {
      console.log('localStorage not available')
    }
    return { success: true }
  }

  useEffect(() => {
    loadTasks()
  }, [supabase])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    loadTasks,
  }
}
