'use client'

import React, { useEffect, useState, lazy, Suspense } from 'react'
import { ClipboardList, BarChart3 } from 'lucide-react'
import { PageHeader, Button } from '@/components/ui'
import Link from 'next/link'

const TaskList = lazy(() => import('@/components/tasks/TaskList').then(mod => ({ default: mod.TaskList })))

interface Task {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
}

export default function TarefasPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/tasks')
      if (!res.ok) throw new Error('Erro ao carregar')
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreate = async (taskData: any) => {
    console.log('Criar tarefa:', taskData)
    await loadTasks()
  }

  const handleTaskUpdate = async (taskId: string, taskData: any) => {
    console.log('Atualizar tarefa:', taskId, taskData)
    await loadTasks()
  }

  const handleTaskDelete = async (taskId: string) => {
    console.log('Deletar tarefa:', taskId)
    await loadTasks()
  }

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    console.log('Toggle tarefa:', taskId, completed)
    await loadTasks()
  }

  const dayName = new Date(selectedDate).toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  const goToPreviousDay = () => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() - 1)
    setSelectedDate(date.toISOString().split('T')[0])
  }

  const goToNextDay = () => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + 1)
    setSelectedDate(date.toISOString().split('T')[0])
  }

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Tarefas
          </div>
        }
        description="Organize suas tarefas e acompanhe seu progresso"
      />

      {/* Date Navigation */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={goToPreviousDay}
          >
            ← Anterior
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={goToToday}
          >
            Hoje
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={goToNextDay}
          >
            Próximo →
          </Button>
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-text-primary capitalize">{dayName}</p>
          <p className="text-xs text-text-secondary">
            {selectedDate}
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-12 text-text-secondary">Carregando tarefas...</div>
      ) : (
        <Suspense fallback={<div className="text-center py-12 text-text-secondary">Carregando lista de tarefas...</div>}>
          <TaskList
            tasks={tasks}
            date={selectedDate}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onTaskToggle={handleTaskToggle}
          />
        </Suspense>
      )}
    </div>
  )
}
