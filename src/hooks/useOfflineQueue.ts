'use client'

import { useEffect, useState, useRef } from 'react'

interface QueuedOperation {
  id: string
  type: 'create' | 'update' | 'delete'
  table: string
  data: any
  timestamp: number
}

export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(true)
  const [queue, setQueue] = useState<QueuedOperation[]>([])
  const queueRef = useRef<QueuedOperation[]>([])

  useEffect(() => {
    // Detect online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load queue from localStorage
    try {
      const stored = localStorage.getItem('offline_queue')
      const parsed = stored ? JSON.parse(stored) : []
      queueRef.current = parsed
      setQueue(parsed)
    } catch (e) {
      console.error('Error loading offline queue:', e)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const addToQueue = (type: QueuedOperation['type'], table: string, data: any) => {
    const operation: QueuedOperation = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      table,
      data,
      timestamp: Date.now(),
    }

    const updated = [...queueRef.current, operation]
    queueRef.current = updated
    setQueue(updated)

    // Persist to localStorage
    try {
      localStorage.setItem('offline_queue', JSON.stringify(updated))
    } catch (e) {
      console.error('Error saving offline queue:', e)
    }

    return operation.id
  }

  const removeFromQueue = (id: string) => {
    const updated = queueRef.current.filter(op => op.id !== id)
    queueRef.current = updated
    setQueue(updated)

    try {
      localStorage.setItem('offline_queue', JSON.stringify(updated))
    } catch (e) {
      console.error('Error updating offline queue:', e)
    }
  }

  const clearQueue = () => {
    queueRef.current = []
    setQueue([])
    try {
      localStorage.removeItem('offline_queue')
    } catch (e) {
      console.error('Error clearing offline queue:', e)
    }
  }

  return {
    isOnline,
    queue,
    queueLength: queue.length,
    addToQueue,
    removeFromQueue,
    clearQueue,
  }
}
