'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function PrimaryNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '📊 Dashboard', icon: '📊' },
    { href: '/tarefas', label: '📝 Tarefas', icon: '📝' },
    { href: '/mural', label: '🖼️ Mural', icon: '🖼️' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface shadow-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:text-primary-hover transition-colors">
            <span className="text-2xl">📅</span>
            <span className="hidden sm:inline">Agenda Diário</span>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-surface'
                      : 'text-text-secondary hover:bg-surface-secondary'
                  }`}
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="inline sm:hidden">{item.icon}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-md text-lg transition-all ${
                    isActive
                      ? 'bg-primary text-surface'
                      : 'text-text-secondary hover:bg-surface-secondary'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
