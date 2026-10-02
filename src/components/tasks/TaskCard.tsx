'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'

interface TaskCardProps {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
  onEdit: () => void
  onDelete: () => void
  onToggleComplete: (completed: boolean) => void
}

export function TaskCard({
  id,
  title,
  description,
  due_date,
  due_time,
  priority,
  status,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  const isCompleted = status === 'completed'

  const getPriorityColor = (pri?: string) => {
    switch (pri) {
      case 'high':
        return 'text-danger'
      case 'medium':
        return 'text-warning'
      default:
        return 'text-success'
    }
  }

  const getPriorityLabel = (pri?: string) => {
    switch (pri) {
      case 'high':
        return '🔴 Alta'
      case 'medium':
        return '🟡 Média'
      default:
        return '🟢 Baixa'
    }
  }

  return (
    <Card className="p-4 hover:shadow-hover transition-shadow group">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => onToggleComplete(e.target.checked)}
          className="w-5 h-5 mt-1 rounded border-border text-primary cursor-pointer accent-primary"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm leading-snug mb-1 ${
            isCompleted ? 'line-through text-text-secondary' : 'text-text-primary'
          }`}>
            {title}
          </h4>

          {description && !isCompleted && (
            <p className="text-xs text-text-secondary mb-2 line-clamp-2">{description}</p>
          )}

          <div className="flex items-center gap-3 text-xs text-text-secondary flex-wrap">
            <span>📅 {new Date(due_date).toLocaleDateString('pt-BR')}</span>
            {due_time && <span>🕐 {due_time}</span>}
          </div>
        </div>

        {/* Priority + Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-medium whitespace-nowrap ${getPriorityColor(priority)}`}>
            {getPriorityLabel(priority)}
          </span>

          {!isCompleted && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                onClick={onEdit}
                className="p-1.5 hover:bg-surface-secondary rounded transition text-text-secondary hover:text-primary"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 hover:bg-surface-secondary rounded transition text-text-secondary hover:text-danger"
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
