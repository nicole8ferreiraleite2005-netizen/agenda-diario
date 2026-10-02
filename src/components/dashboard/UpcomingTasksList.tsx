'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: string
}

export function UpcomingTasksList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de tarefas próximas
    const loadTasks = async () => {
      try {
        const res = await fetch('/api/tasks')
        if (!res.ok) throw new Error('Erro ao carregar')
        const data = await res.json()

        // Filtrar tarefas dos próximos 7 dias
        const now = new Date()
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

        const upcoming = (Array.isArray(data) ? data : [])
          .filter((task: Task) => {
            const dueDate = new Date(task.due_date)
            return dueDate >= now && dueDate <= in7Days && task.status !== 'completed'
          })
          .sort((a: Task, b: Task) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
          .slice(0, 5)

        setTasks(upcoming)
      } catch (err) {
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-danger'
      case 'medium':
        return 'text-warning'
      default:
        return 'text-success'
    }
  }

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case 'high':
        return '🔴 Alta'
      case 'medium':
        return '🟡 Média'
      default:
        return '🟢 Baixa'
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-text-secondary">Carregando...</div>
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon="✅"
        title="Nenhuma tarefa próxima"
        description="Todas as tarefas estão em dia!"
      />
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id} hoverable className="p-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary text-sm mb-1 line-clamp-2">
              {task.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span>📅 {new Date(task.due_date).toLocaleDateString('pt-BR')}</span>
              {task.due_time && <span>🕐 {task.due_time}</span>}
            </div>
          </div>
          <div className={`text-xs font-medium whitespace-nowrap ${getPriorityColor(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </div>
        </Card>
      ))}
      <Link href="/tarefas" className="block text-center text-sm text-primary hover:text-primary-hover font-medium mt-4">
        Ver todas as tarefas →
      </Link>
    </div>
  )
}
