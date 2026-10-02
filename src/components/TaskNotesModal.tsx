'use client'

import { useState } from 'react'
import { Task, TaskNote } from '@/lib/supabase'

interface TaskNotesModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onSaveNote: (note: string) => Promise<void>
  existingNote?: TaskNote
}

export function TaskNotesModal({
  task,
  isOpen,
  onClose,
  onSaveNote,
  existingNote,
}: TaskNotesModalProps) {
  const [note, setNote] = useState(existingNote?.note || '')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!note.trim()) {
      alert('Escreva uma anotação antes de salvar')
      return
    }

    setLoading(true)
    try {
      await onSaveNote(note)
      setNote('')
      onClose()
    } catch (error) {
      alert('Erro ao salvar nota')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Anotação da Tarefa</h2>
        <p className="text-sm text-gray-600 mb-4">{task.title}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Como foi? O que aprendeu?
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escreva suas anotações, reflexões e aprendizados sobre esta tarefa..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading || !note.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
            >
              {loading ? 'Salvando...' : 'Salvar Anotação'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
