'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import { useSupabaseTasks } from '@/hooks/useSupabaseTasks'

export const CalendarSection = memo(function CalendarSection() {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'year'>('month')
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 9, 1))
  const [selectedYear, setSelectedYear] = useState(2026)
  const { tasks } = useSupabaseTasks()

  const tasksByDate = useMemo(() => {
    const map = new Map<string, number>()
    tasks.forEach(task => {
      map.set(task.due_date, (map.get(task.due_date) || 0) + 1)
    })
    return map
  }, [tasks])

  const handlePreviousMonth = useCallback(() => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }, [selectedDate])

  const handleNextMonth = useCallback(() => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }, [selectedDate])

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDate(new Date(selectedYear, selectedDate.getMonth(), day))
  }, [selectedYear, selectedDate])

  const handleMonthSelect = useCallback((index: number) => {
    setSelectedDate(new Date(selectedYear, index, 1))
    setViewMode('month')
  }, [selectedYear])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(selectedDate)
  const firstDay = getFirstDayOfMonth(selectedDate)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const currentMonth = monthNames[selectedDate.getMonth()]
  const today = new Date()
  const isToday = (day: number | null) => {
    return day === today.getDate() &&
           selectedDate.getMonth() === today.getMonth() &&
           selectedDate.getFullYear() === today.getFullYear()
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 h-full flex flex-col gap-3 sm:gap-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">📅 Calendário</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Organize suas atividades ao longo do tempo</p>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        {(['day', 'week', 'month', 'year'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition min-h-[36px] sm:min-h-[40px] ${
              viewMode === mode
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-lg'
                : 'bg-white/60 text-gray-700 hover:bg-white border border-orange-200'
            }`}
          >
            {mode === 'day' && '📆 Dia'}
            {mode === 'week' && '📅 Semana'}
            {mode === 'month' && '📊 Mês'}
            {mode === 'year' && '📈 Ano'}
          </button>
        ))}
      </div>

      {/* Year Selector for Month/Year Views */}
      {(viewMode === 'month' || viewMode === 'year') && (
        <div className="flex gap-2 items-center bg-white/60 backdrop-blur p-3 rounded-lg border border-orange-200 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setSelectedYear(prev => Math.max(2025, prev - 1))}
            className="p-2 rounded hover:bg-orange-200 transition"
          >
            ←
          </button>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="flex-1 px-3 py-2 rounded border border-orange-300 bg-white font-semibold text-gray-800"
          >
            {[2025, 2026, 2027].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={() => setSelectedYear(prev => Math.min(2027, prev + 1))}
            className="p-2 rounded hover:bg-orange-200 transition"
          >
            →
          </button>
        </div>
      )}

      {/* Month Navigation for Month View */}
      {viewMode === 'month' && (
        <div className="flex gap-2 items-center bg-white/60 backdrop-blur p-3 rounded-lg border border-orange-200">
          <button
            onClick={handlePreviousMonth}
            className="p-2 rounded hover:bg-orange-200 transition font-bold"
          >
            ←
          </button>
          <h2 className="flex-1 text-center font-bold text-lg text-gray-800">
            {currentMonth} {selectedYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded hover:bg-orange-200 transition font-bold"
          >
            →
          </button>
        </div>
      )}

      {/* Calendar Content */}
      <div className="flex-1 bg-white/80 backdrop-blur rounded-2xl p-6 border border-orange-200 overflow-auto">
        {viewMode === 'month' && (
          <div>
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
                <div key={day} className="text-center font-bold text-xs sm:text-sm text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {days.map((day, idx) => {
                const dateStr = day ? `${selectedYear}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ''
                const taskCount = day ? (tasksByDate.get(dateStr) || 0) : 0

                return (
                  <button
                    key={idx}
                    onClick={() => day && handleDaySelect(day)}
                    className={`p-2 sm:p-3 text-center rounded-lg text-xs sm:text-sm font-medium transition relative ${
                      day === null
                        ? 'bg-gray-50'
                        : isToday(day)
                          ? 'bg-gradient-to-br from-orange-400 to-rose-400 text-white shadow-lg scale-110'
                          : 'bg-orange-100/50 text-gray-800 hover:bg-orange-200 cursor-pointer'
                    }`}
                  >
                    <div>{day}</div>
                    {taskCount > 0 && (
                      <div className="absolute bottom-1 right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {taskCount}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {viewMode === 'year' && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ano de {selectedYear}</h2>
            <div className="grid grid-cols-3 gap-3">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className="p-4 bg-gradient-to-br from-orange-100 to-rose-100 rounded-lg hover:from-orange-200 hover:to-rose-200 transition font-semibold text-gray-800"
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'week' && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">📅 Visualização de Semana</p>
            <p className="text-sm mt-2">Semana de {new Date(selectedYear, selectedDate.getMonth(), 1).toLocaleDateString('pt-BR')}</p>
            <p className="text-xs mt-4 text-gray-400">Em desenvolvimento...</p>
          </div>
        )}

        {viewMode === 'day' && (
          <div className="text-center py-8">
            <p className="text-3xl mb-4">
              {new Date(selectedYear, selectedDate.getMonth(), selectedDate.getDate()).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="bg-orange-100/50 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-600">Nenhuma tarefa agendada para este dia</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-xs text-gray-500 text-center">
        Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}
      </div>
    </div>
  )
})
