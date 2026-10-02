'use client'

import { useState, useMemo, memo } from 'react'
import { useSelectedDate } from '@/hooks/useSelectedDate'
import { useSupabaseTasks } from '@/hooks/useSupabaseTasks'
import { TaskForm } from './TaskForm'
import { UploadImageModal } from './UploadImageModal'

export const TasksSection = memo(function TasksSection() {
  const { selectedDate, setDate, goToToday, goToPreviousDay, goToNextDay } =
    useSelectedDate()
  const { tasks, loading, createTask, updateTask, deleteTask } = useSupabaseTasks()
  const [editingTask, setEditingTask] = useState<any>(null)
  const [completingTask, setCompletingTask] = useState<any>(null)

  const dayTasks = useMemo(
    () => tasks.filter((t) => t.due_date === selectedDate.toISOString().split('T')[0]),
    [tasks, selectedDate]
  )

  const dayName = selectedDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="p-6 h-full flex flex-col gap-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-y-auto">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .task-card {
          animation: fadeInUp 0.4s ease-out forwards;
          will-change: transform;
        }
      `}</style>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">📝 Tarefas</h1>
        <p className="text-sm text-gray-600 mt-1">Organize seu dia produtivamente</p>
      </div>

      {completingTask && (
        <UploadImageModal
          taskId={completingTask.id}
          taskTitle={completingTask.title}
          onClose={() => setCompletingTask(null)}
          onUpload={async (imageUrl: string, notes: string) => {
            await updateTask(completingTask.id, {
              status: 'completed',
              completed_at: new Date().toISOString(),
              mural_image_url: imageUrl,
              mural_notes: notes,
            })
            setCompletingTask(null)
          }}
        />
      )}

      {/* Date Selector */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-orange-200 shadow-sm">
        <div className="flex justify-between items-center gap-2 mb-4">
          <button
            onClick={goToPreviousDay}
            className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-sm font-medium transition text-gray-800"
          >
            ← Ant
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-lg text-sm font-medium hover:shadow-lg transition"
          >
            Hoje
          </button>
          <button
            onClick={goToNextDay}
            className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-sm font-medium transition text-gray-800"
          >
            Prox →
          </button>
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-gray-800 capitalize">{dayName}</p>
          <p className="text-xs text-gray-500 mt-1">
            {dayTasks.length} {dayTasks.length === 1 ? 'tarefa' : 'tarefas'}
          </p>
        </div>
      </div>

      {loading && (
        <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-orange-200 text-center">
          <p className="text-sm text-gray-600">Carregando tarefas...</p>
        </div>
      )}

      {/* Task Form */}
      <TaskForm
        initialDate={selectedDate.toISOString().split('T')[0]}
        editing={editingTask}
        onSubmit={async (taskData) => {
          if (editingTask) {
            await updateTask(editingTask.id, taskData)
            setEditingTask(null)
          } else {
            await createTask(taskData)
          }
        }}
        onCancel={() => setEditingTask(null)}
      />

      {/* Tasks List */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Tarefas do Dia ({dayTasks.length})
        </h2>

        {dayTasks.length === 0 ? (
          <div className="bg-white/60 backdrop-blur rounded-xl p-8 border border-orange-200 text-center">
            <p className="text-gray-600 text-sm">Nenhuma tarefa para hoje</p>
            <p className="text-xs text-gray-400 mt-2">Crie uma nova tarefa acima para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dayTasks.map((task, index) => (
              <div
                key={task.id}
                className="bg-white/80 backdrop-blur rounded-xl p-4 border border-orange-200 hover:shadow-md transition group task-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={async (e) => {
                      if (e.target.checked) {
                        setCompletingTask(task)
                      } else {
                        await updateTask(task.id, {
                          status: 'pending',
                          completed_at: null,
                          mural_image_url: null,
                        })
                      }
                    }}
                    className="w-5 h-5 rounded border-orange-300 text-orange-400 cursor-pointer mt-1 accent-orange-400"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm leading-snug ${
                        task.status === 'completed'
                          ? 'line-through text-gray-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                    )}
                    {task.due_time && (
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        🕐 {task.due_time}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="p-2 hover:bg-orange-100 rounded-lg transition text-gray-600 hover:text-orange-600"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Remover tarefa?')) {
                          await deleteTask(task.id)
                        }
                      }}
                      className="p-2 hover:bg-rose-100 rounded-lg transition text-gray-600 hover:text-rose-600"
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Priority Badge */}
                {task.priority && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-orange-100">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        task.priority === 'high'
                          ? 'bg-rose-100 text-rose-700'
                          : task.priority === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {task.priority === 'high'
                        ? '🔴 Alta'
                        : task.priority === 'medium'
                        ? '🟡 Média'
                        : '🟢 Baixa'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
