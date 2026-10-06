'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Task, TaskNote } from '@/lib/supabase'
import { TaskNotesModal } from '@/components/TaskNotesModal'

export default function MuralPage() {
  const router = useRouter()
  const [completedTasks, setCompletedTasks] = useState<(Task & { note?: TaskNote })[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchCompletedTasks()
  }, [])

  const fetchCompletedTasks = async () => {
    try {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })

      const tasksWithNotes = await Promise.all(
        (tasks || []).map(async (task) => {
          const { data: note } = await supabase
            .from('task_notes')
            .select('*')
            .eq('task_id', task.id)
            .single()

          return { ...task, note }
        })
      )

      setCompletedTasks(tasksWithNotes)
    } catch (error) {
      console.error('Erro ao carregar tarefas concluídas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenNoteModal = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleSaveNote = async (noteText: string) => {
    if (!selectedTask) return

    try {
      const existingNote = completedTasks.find((t) => t.id === selectedTask.id)?.note

      if (existingNote) {
        await supabase
          .from('task_notes')
          .update({ note: noteText, updated_at: new Date().toISOString() })
          .eq('task_id', selectedTask.id)
      } else {
        await supabase.from('task_notes').insert({
          task_id: selectedTask.id,
          note: noteText,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }

      await fetchCompletedTasks()
    } catch (error) {
      console.error('Erro ao salvar nota:', error)
      throw error
    }
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">🎨 Mural de Realizações</h1>
            <button
              onClick={() => router.push('/tarefas')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              ← Voltar
            </button>
          </div>
          <p className="text-gray-600">Veja as tarefas que você concluiu e suas anotações</p>
        </header>

        {loading ? (
          <div className="text-center text-gray-600 py-12">Carregando...</div>
        ) : completedTasks.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg">Nenhuma tarefa concluída ainda</p>
            <p className="text-sm">Complete tarefas para vê-las aqui! 🎯</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{task.title}</h3>
                    <span className="text-2xl">✅</span>
                  </div>

                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                      {task.priority === 'low' ? '🟢' : task.priority === 'medium' ? '🟡' : '🔴'} {task.priority}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      📅 {new Date(task.due_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                {task.note ? (
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-4">
                    <p className="text-sm text-gray-800 italic">{task.note.note}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(task.note.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-3 rounded mb-4">
                    <p className="text-sm text-gray-500">Sem anotações</p>
                  </div>
                )}

                <button
                  onClick={() => handleOpenNoteModal(task)}
                  className="w-full px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition"
                >
                  {task.note ? '✏️ Editar Anotação' : '📝 Adicionar Anotação'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTask && (
        <TaskNotesModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTask(null)
          }}
          onSaveNote={handleSaveNote}
          existingNote={completedTasks.find((t) => t.id === selectedTask.id)?.note}
        />
      )}
    </main>
  )
}
