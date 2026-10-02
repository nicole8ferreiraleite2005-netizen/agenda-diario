'use client'

import { useState } from 'react'

interface CalendarProps {
  selectedDate: string
  onDateSelect: (date: string) => void
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate || new Date()))

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const days = []
  const firstDay = getFirstDayOfMonth(currentDate)
  const daysInMonth = getDaysInMonth(currentDate)

  // Preencher dias anteriores
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Preencher dias do mês
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const monthYear = monthName.charAt(0).toUpperCase() + monthName.slice(1)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isoDate = date.toISOString().split('T')[0]
    onDateSelect(isoDate)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isoDate = date.toISOString().split('T')[0]
    return isoDate === selectedDate
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600 font-bold text-lg"
          title="Mês anterior"
        >
          ←
        </button>
        <h2 className="text-lg font-bold text-gray-900">{monthYear}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600 font-bold text-lg"
          title="Próximo mês"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && handleDayClick(day)}
            disabled={!day}
            className={`
              aspect-square rounded-lg font-semibold text-sm transition
              ${!day ? 'invisible' : ''}
              ${isSelected(day!) ? 'bg-blue-500 text-white' : ''}
              ${isToday(day!) && !isSelected(day!) ? 'bg-blue-100 text-blue-900 border-2 border-blue-500' : ''}
              ${!isSelected(day!) && !isToday(day!) ? 'hover:bg-gray-100 text-gray-700' : ''}
              ${day ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
