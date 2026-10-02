import React from 'react'
import { Card } from '@/components/ui/Card'

interface DashboardSummaryCardProps {
  icon: string
  label: string
  value: number | string
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

export function DashboardSummaryCard({
  icon,
  label,
  value,
  description,
  variant = 'default',
}: DashboardSummaryCardProps) {
  const variantStyles = {
    default: 'border-l-4 border-l-primary',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    danger: 'border-l-4 border-l-danger',
  }

  return (
    <Card className={`${variantStyles[variant]} p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{label}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
          {description && (
            <p className="text-xs text-text-secondary mt-2">{description}</p>
          )}
        </div>
        <div className="text-4xl ml-4">{icon}</div>
      </div>
    </Card>
  )
}
