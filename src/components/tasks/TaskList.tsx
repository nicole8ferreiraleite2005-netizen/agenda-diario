'use client'

import React, { useState } from 'react'
import { EmptyState, Button } from '@/components/ui'
import { TaskCard } from './TaskCard'
import { TaskFormModal } from './TaskFormModal'

interface Task {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
}

interface TaskListProps {
  tasks: Task[]
  date: string
  onTaskCreate: (taskData: any) => Promise<void>
  onTaskUpdate: (taskId: string, taskData: any) => Promise<void>
  onTaskDelete: (taskId: string) => Promise<void>
  onTaskToggle: (taskId: string, completed: boolean) => Promise<void>
}

export function TaskList({
  tasks,
  date,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggle,
}: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((t) => t.due_date === date)
  const pendingTasks = filteredTasks.filter((t) => t.status !== 'completed')
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed')

  const handleSubmit = async (taskData: any) => {
    if (editingTask) {
      await onTaskUpdate(editingTask.id, taskData)
      setEditingTask(null)
    } else {
      await onTaskCreate(taskData)
    }
    setIsModalOpen(false)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleDelete = async (taskId: string) => {
    if (confirm('Remover tarefa?')) {
      await onTaskDelete(taskId)
    }
  }

  const handleToggle = async (taskId: string, completed: boolean) => {
    await onTaskToggle(taskId, completed)
  }

  return (
    <>
      {/* Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleSubmit}
        initialDate={date}
        defaultTask={editingTask}
      />

      {/* Empty State */}
      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <EmptyState
          icon="✅"
          title="Sem tarefas"
          description="Nenhuma tarefa para este dia. Crie uma para começar!"
          action={
            <Button onClick={() => setIsModalOpen(true)}>+ Nova Tarefa</Button>
          }
        />
      ) : (
        <div className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                A Fazer ({pendingTasks.length})
              </h3>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task.id)}
                    onToggleComplete={(completed) => handleToggle(task.id, completed)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-success mb-3 uppercase tracking-wide">
                Completas ({completedTasks.length})
              </h3>
              <div className="space-y-3 opacity-75">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task.id)}
                    onToggleComplete={(completed) => handleToggle(task.id, completed)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add Task Button */}
          {pendingTasks.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingTask(null)
                setIsModalOpen(true)
              }}
              className="w-full"
            >
              + Adicionar Tarefa
            </Button>
          )}
        </div>
      )}
    </>
  )
}
