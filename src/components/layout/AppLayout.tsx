'use client'

import React from 'react'
import { PrimaryNavigation } from './PrimaryNavigation'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PrimaryNavigation />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface text-center py-6">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} Agenda Diário. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
