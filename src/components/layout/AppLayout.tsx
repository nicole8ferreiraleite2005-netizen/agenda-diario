'use client'

import React from 'react'
import { PrimaryNavigation } from './PrimaryNavigation'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <PrimaryNavigation />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface text-center py-4 sm:py-6 px-3 sm:px-4">
        <p className="text-xs sm:text-sm text-text-secondary">
          © {new Date().getFullYear()} Agenda Diário. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
