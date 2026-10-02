import { useState, useEffect } from 'react'
import { Task } from '@/lib/supabase'

export function useTasks(date?: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [date])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      const url = new URL('/api/tasks', window.location.origin)
      if (date) url.searchParams.set('date', date)

      const res = await fetch(url)
      if (!res.ok) throw new Error('Erro ao carregar tarefas')

      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Inserindo tarefa:', task)
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })

      if (!res.ok) throw new Error('Erro ao criar tarefa')
      const data = await res.json()
      console.log('Tarefa criada:', data)
      await fetchTasks()
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao criar tarefa'
      console.error('Erro catch:', msg)
      setError(msg)
      return null
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })

      if (!res.ok) throw new Error('Erro ao atualizar tarefa')
      const data = await res.json()
      await fetchTasks()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa')
      return null
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) throw new Error('Erro ao deletar tarefa')
      await fetchTasks()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar tarefa')
      return false
    }
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  }
}
