'use client'

import React, { useEffect, useState } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'
import Link from 'next/link'

interface Memory {
  id: string
  title: string
  image_url?: string
  created_at: string
}

export function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const res = await fetch('/api/tasks')
        if (!res.ok) throw new Error('Erro ao carregar')
        const data = await res.json()

        // Filtrar tarefas concluídas com imagens (memórias)
        const completed = (Array.isArray(data) ? data : [])
          .filter((task: any) => task.status === 'completed' && task.mural_image_url)
          .slice(0, 6)
          .map((task: any) => ({
            id: task.id,
            title: task.title,
            image_url: task.mural_image_url,
            created_at: task.completed_at || new Date().toISOString(),
          }))

        setMemories(completed)
      } catch (err) {
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMemories()
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-text-secondary">Carregando memórias...</div>
  }

  if (memories.length === 0) {
    return (
      <EmptyState
        icon="📸"
        title="Sem memórias ainda"
        description="Complete tarefas e adicione fotos para criar memórias visuais"
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="group relative overflow-hidden rounded-lg bg-surface-secondary aspect-square hover:shadow-hover transition-shadow"
          >
            {memory.image_url && (
              <img
                src={memory.image_url}
                alt={memory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-xs font-medium line-clamp-2">{memory.title}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/mural" className="block text-center text-sm text-primary hover:text-primary-hover font-medium mt-4">
        Ver mural completo →
      </Link>
    </div>
  )
}
