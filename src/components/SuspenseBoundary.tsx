'use client'

import { Suspense, ReactNode } from 'react'

interface SuspenseBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SuspenseBoundary({ children, fallback }: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      {children}
    </Suspense>
  )
}

export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="inline-block p-4 bg-white/60 backdrop-blur rounded-full mb-4">
          <p className="text-gray-500 animate-pulse">Carregando...</p>
        </div>
      </div>
    </div>
  )
}
