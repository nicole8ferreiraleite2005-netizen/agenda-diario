import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

  const variantStyles = {
    primary: 'bg-primary text-surface hover:bg-primary-hover dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-surface-secondary text-text-primary border border-border hover:bg-surface-secondary/80 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
    danger: 'bg-danger text-surface hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800',
    ghost: 'text-primary hover:bg-surface-secondary dark:text-blue-400 dark:hover:bg-gray-700',
  }

  const sizeStyles = {
    xs: 'px-2 py-1.5 text-xs min-h-[32px]',
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-5 py-3 text-lg min-h-[48px]',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  )
}
