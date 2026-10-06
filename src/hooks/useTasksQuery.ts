import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Task {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
  mural_image_url?: string
  mural_notes?: string
  completed_at?: string
}

const TASKS_QUERY_KEY = ['tasks']

export function useTasks() {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/tasks')
      if (!res.ok) throw new Error('Failed to fetch tasks')
      return res.json() as Promise<Task[]>
    },
    staleTime: 5 * 60 * 1000,
  })

  const createTaskMutation = useMutation({
    mutationFn: async (taskData: Partial<Task>) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      if (!res.ok) throw new Error('Failed to create task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Task> }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  return {
    tasks: tasksQuery.data || [],
    loading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: (data: Partial<Task>) => createTaskMutation.mutateAsync(data),
    updateTask: (id: string, data: Partial<Task>) =>
      updateTaskMutation.mutateAsync({ id, data }),
    deleteTask: (id: string) => deleteTaskMutation.mutateAsync(id),
    refetch: tasksQuery.refetch,
  }
}
