import React from 'react'

interface PageHeaderProps {
  title: string | React.ReactNode
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">{title}</h1>
        {description && (
          <p className="text-text-secondary text-sm sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  )
}
