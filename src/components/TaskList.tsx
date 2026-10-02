'use client'

import { Task } from '@/lib/supabase'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  loading?: boolean
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

export function TaskList({ tasks, onToggle, onDelete, onEdit, loading }: TaskListProps) {
  if (loading) {
    return <div className="text-center text-gray-500 py-8">Carregando tarefas...</div>
  }

  if (tasks.length === 0) {
    return <div className="text-center text-gray-500 py-8">Nenhuma tarefa para este dia</div>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`
            p-4 rounded-lg border-2 transition transform hover:scale-[1.02]
            ${task.status === 'completed'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-sm'
              : 'bg-white border-gray-200 hover:border-blue-300 shadow-md'}
          `}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={(e) => onToggle(task.id, e.target.checked)}
              className="w-5 h-5 mt-1 rounded cursor-pointer accent-green-500 transition"
            />

            <div className="flex-1 min-w-0">
              <h3
                className={`
                  font-semibold break-words
                  ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}
                `}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-gray-600 mt-1 break-words">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                  {task.priority === 'low' ? '🟢 Baixa' : task.priority === 'medium' ? '🟡 Média' : '🔴 Alta'}
                </span>

                {task.due_time && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    ⏰ {task.due_time.substring(0, 5)}
                  </span>
                )}

                {task.recurrence !== 'none' && (
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    🔄 {task.recurrence}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
