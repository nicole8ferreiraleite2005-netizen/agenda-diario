import React from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  objectFit = 'cover',
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={`${className}`}
      style={{
        objectFit,
        width: '100%',
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
      }}
    />
  )
}
