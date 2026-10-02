// This is a Server Component - no 'use client'
// Renders static content without JavaScript

export function StaticDashboardHeader() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">
          Olá, Nicole 👋
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          {today} — Tenha um ótimo dia!
        </p>
      </div>
    </div>
  )
}
