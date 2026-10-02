'use client'

import { useMemo, memo } from 'react'
import { useSupabaseTasks } from '@/hooks/useSupabaseTasks'

export const MuralSection = memo(function MuralSection() {
  const { tasks, loading } = useSupabaseTasks()

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'completed' && task.mural_image_url),
    [tasks]
  )

  return (
    <div className="p-6 h-full flex flex-col gap-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-y-auto">
      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .mural-card {
          animation: zoomIn 0.4s ease-out forwards;
          will-change: transform;
        }
      `}</style>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">🖼️ Mural de Realizações</h1>
        <p className="text-sm text-gray-600 mt-1">Celebre suas tarefas completas com evidências visuais</p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/60 backdrop-blur rounded-full mb-4">
              <p className="text-gray-500 animate-pulse">Carregando...</p>
            </div>
          </div>
        </div>
      ) : completedTasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-12 border border-orange-200 text-center max-w-sm">
            <p className="text-6xl mb-4">📸</p>
            <p className="text-gray-700 font-medium mb-2">Nenhuma tarefa concluída ainda</p>
            <p className="text-gray-500 text-sm">Complete tarefas e faça upload de fotos para celebrar suas realizações aqui!</p>
            <div className="mt-6 pt-6 border-t border-orange-100">
              <p className="text-xs text-gray-400">Dica: ao marcar uma tarefa como concluída, você pode adicionar uma foto 📷</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className="bg-white/80 backdrop-blur rounded-2xl overflow-hidden border border-orange-200 hover:shadow-lg transition group mural-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                {task.mural_image_url && (
                  <div className="relative overflow-hidden bg-gray-200 h-48 group-hover:scale-105 transition">
                    <img
                      src={task.mural_image_url}
                      alt={task.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-green-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✅ Completa
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-base text-gray-800 line-clamp-2">
                    {task.title}
                  </h3>

                  {task.mural_notes && (
                    <p className="text-gray-600 text-sm line-clamp-3 italic">
                      "{task.mural_notes}"
                    </p>
                  )}

                  {task.completed_at && (
                    <div className="flex items-center gap-2 text-xs text-orange-600 font-medium pt-2 border-t border-orange-100">
                      <span>🕐</span>
                      <span>
                        {new Date(task.completed_at).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Footer */}
          <div className="sticky bottom-0 bg-white/80 backdrop-blur border-t border-orange-200 rounded-t-2xl p-4 text-center">
            <p className="text-sm font-medium text-gray-700">
              🎉 {completedTasks.length} {completedTasks.length === 1 ? 'tarefa' : 'tarefas'} concluída(s)
            </p>
          </div>
        </div>
      )}
    </div>
  )
})
