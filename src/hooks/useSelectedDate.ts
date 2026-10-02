'use client'

import { useState, useCallback } from 'react'

export function useSelectedDate(defaultDate?: Date) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate || new Date()
  )

  const goToToday = useCallback(() => {
    setSelectedDate(new Date())
  }, [])

  const goToPreviousDay = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() - 1)
      return next
    })
  }, [])

  const goToNextDay = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() + 1)
      return next
    })
  }, [])

  const setDate = useCallback((date: Date) => {
    setSelectedDate(date)
  }, [])

  return {
    selectedDate,
    setDate,
    goToToday,
    goToPreviousDay,
    goToNextDay,
  }
}
