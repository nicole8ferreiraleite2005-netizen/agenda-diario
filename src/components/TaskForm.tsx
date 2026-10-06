'use client'

import { useState } from 'react'
import { Edit, Plus } from 'lucide-react'
import { Task } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'

interface TaskFormProps {
  initialDate: string
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onCancel: () => void
  editing?: Task
}

export function TaskForm({ initialDate, onSubmit, onCancel, editing }: TaskFormProps) {
  const { error, success } = useToast()
  const [title, setTitle] = useState(editing?.title || '')
  const [description, setDescription] = useState(editing?.description || '')
  const [dueDate, setDueDate] = useState(editing?.due_date || initialDate)
  const [dueTime, setDueTime] = useState(editing?.due_time || '')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editing?.priority || 'medium')
  const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly' | 'monthly'>(
    editing?.recurrence || 'none'
  )
  const [reminderBeforeDay, setReminderBeforeDay] = useState(editing?.reminder_before_day || false)
  const [reminderBeforeHours, setReminderBeforeHours] = useState(editing?.reminder_before_hours || 24)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      error('Digite um título para a tarefa')
      return
    }

    if (!dueDate) {
      error('Selecione uma data para a tarefa')
      return
    }

    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: dueDate,
        due_time: dueTime || undefined,
        priority,
        recurrence,
        reminder_before_day: reminderBeforeDay,
        reminder_before_hours: reminderBeforeHours,
        category_id: undefined,
        status: editing?.status || 'pending',
        completed_at: editing?.completed_at || undefined,
      })
      success(editing ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!')
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err)
      error('Erro ao salvar tarefa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        {editing ? (
          <>
            <Edit className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Editar Tarefa</h2>
          </>
        ) : (
          <>
            <Plus className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Nova Tarefa</h2>
          </>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="O que você precisa fazer?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            aria-required="true"
            aria-label="Título da tarefa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes adicionais..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data *</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recorrência</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="none">Nenhuma</option>
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900">Lembretes</h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={reminderBeforeDay}
              onChange={(e) => setReminderBeforeDay(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-700">Lembrar no dia anterior</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horas antes da tarefa</label>
            <input
              type="number"
              value={reminderBeforeHours}
              onChange={(e) => setReminderBeforeHours(parseInt(e.target.value))}
              min="1"
              max="168"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          {loading ? 'Salvando...' : 'Salvar Tarefa'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
