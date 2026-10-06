'use client'

import React, { useEffect, useState, lazy, Suspense } from 'react'
import { PageHeader, Button } from '@/components/ui'
import { DashboardSummaryCard, UpcomingTasksList } from '@/components/dashboard'
import Link from 'next/link'

const MemoryWall = lazy(() => import('@/components/dashboard/MemoryWall').then(mod => ({ default: mod.MemoryWall })))

interface Stats {
  pending: number
  completed: number
  upcoming: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ pending: 0, completed: 0, upcoming: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/tasks')
        if (!res.ok) throw new Error('Erro ao carregar')
        const data = await res.json()

        const tasks = Array.isArray(data) ? data : []
        const today = new Date().toISOString().split('T')[0]
        const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]

        const pending = tasks.filter(
          (t: any) => t.due_date === today && t.status !== 'completed'
        ).length

        const completed = tasks.filter((t: any) => t.status === 'completed').length

        const upcoming = tasks.filter((t: any) => {
          const dueDate = t.due_date
          return dueDate > today && dueDate <= in7Days && t.status !== 'completed'
        }).length

        setStats({ pending, completed, upcoming })
      } catch (err) {
        console.error('Erro ao carregar stats:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title={`Olá, Nicole 👋`}
        description={`${today} — Você tem ${stats.pending} tarefas hoje`}
        action={
          <Link href="/tarefas">
            <Button>+ Nova Tarefa</Button>
          </Link>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardSummaryCard
          icon="📋"
          label="Tarefas Pendentes"
          value={stats.pending}
          description="Tarefas para hoje"
          variant="default"
        />
        <DashboardSummaryCard
          icon="✅"
          label="Tarefas Completas"
          value={stats.completed}
          description="Total concluído"
          variant="success"
        />
        <DashboardSummaryCard
          icon="🗓️"
          label="Próximas (7 dias)"
          value={stats.upcoming}
          description="Tarefas agendadas"
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Upcoming Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-text-primary">📌 Próximas Tarefas</h2>
          {loading ? (
            <div className="text-center py-8 text-text-secondary">Carregando...</div>
          ) : (
            <UpcomingTasksList />
          )}
        </div>

        {/* Right: Today's Schedule */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">⏰ Hoje</h2>
          <div className="bg-surface border border-border rounded-md p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {new Date().getDate()}
            </div>
            <p className="text-sm text-text-secondary mb-4">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
            <Link href="/tarefas">
              <Button variant="secondary" size="sm" className="w-full">
                Ver tarefas de hoje
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Memory Wall */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">🖼️ Mural de Memórias</h2>
          <Link href="/mural" className="text-sm text-primary hover:text-primary-hover font-medium">
            Ver tudo →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8 text-text-secondary">Carregando...</div>
        ) : (
          <Suspense fallback={<div className="text-center py-8 text-text-secondary">Carregando mural...</div>}>
            <MemoryWall />
          </Suspense>
        )}
      </div>
    </div>
  )
}
