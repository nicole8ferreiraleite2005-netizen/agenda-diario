'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Portal } from '@/components/Portal'

interface TaskFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskData: any) => Promise<void>
  initialDate?: string
  defaultTask?: any
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialDate,
  defaultTask,
}: TaskFormModalProps) {
  const [formData, setFormData] = useState({
    title: defaultTask?.title || '',
    description: defaultTask?.description || '',
    due_date: defaultTask?.due_date || initialDate || new Date().toISOString().split('T')[0],
    due_time: defaultTask?.due_time || '',
    priority: defaultTask?.priority || 'medium',
    recurrence: defaultTask?.recurrence || 'none',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('Título é obrigatório')
      return
    }

    try {
      setIsLoading(true)
      await onSubmit(formData)
      setFormData({
        title: '',
        description: '',
        due_date: initialDate || new Date().toISOString().split('T')[0],
        due_time: '',
        priority: 'medium',
        recurrence: 'none',
      })
      onClose()
    } catch (err) {
      setError('Erro ao salvar tarefa')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-surface rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-surface border-b border-border p-6">
            <h2 className="text-xl font-bold text-text-primary">
              {defaultTask ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-danger/10 text-danger rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Título *
              </label>
              <input
                type="text"
                placeholder="O que você precisa fazer?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Descrição
              </label>
              <textarea
                placeholder="Detalhes adicionais..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Data *
                </label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  value={formData.due_time}
                  onChange={(e) => setFormData({ ...formData, due_time: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Prioridade
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">🟢 Baixa</option>
                  <option value="medium">🟡 Média</option>
                  <option value="high">🔴 Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Recorrência
                </label>
                <select
                  value={formData.recurrence}
                  onChange={(e) => setFormData({ ...formData, recurrence: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="none">Nenhuma</option>
                  <option value="daily">📅 Diária</option>
                  <option value="weekly">📆 Semanal</option>
                  <option value="monthly">📊 Mensal</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="flex-1"
              >
                {defaultTask ? 'Atualizar' : 'Criar Tarefa'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  )
}
