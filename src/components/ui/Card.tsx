import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={`bg-surface border border-border rounded-md shadow-card transition-all duration-base ${
        hoverable ? 'hover:shadow-hover cursor-pointer' : ''
      } ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
