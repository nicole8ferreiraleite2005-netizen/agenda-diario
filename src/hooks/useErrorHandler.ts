'use client'

import { useState, useCallback } from 'react'

export interface AppError {
  message: string
  code?: string
  retry?: () => Promise<void>
}

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null)
  const [isRecovering, setIsRecovering] = useState(false)

  const handleError = useCallback((err: unknown) => {
    const message = err instanceof Error ? err.message : 'Um erro ocorreu'
    const code = err instanceof Error && 'code' in err ? (err.code as string) : undefined

    setError({
      message,
      code,
    })
  }, [])

  const retry = useCallback(async (retryFn?: () => Promise<void>) => {
    if (!retryFn) {
      setError(null)
      return
    }

    try {
      setIsRecovering(true)
      await retryFn()
      setError(null)
    } catch (err) {
      handleError(err)
    } finally {
      setIsRecovering(false)
    }
  }, [handleError])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    isRecovering,
    handleError,
    retry,
    clearError,
  }
}
