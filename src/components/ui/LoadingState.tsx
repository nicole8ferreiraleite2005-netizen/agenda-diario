import React from 'react'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-8 h-8 border-3 border-border border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-text-secondary">{message}</p>
    </div>
  )
}
