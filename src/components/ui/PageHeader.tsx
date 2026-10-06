import React from 'react'

interface PageHeaderProps {
  title: string | React.ReactNode
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-1 line-clamp-2">
            {title}
          </h1>
          {description && (
            <p className="text-text-secondary text-xs sm:text-sm md:text-base line-clamp-2">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
