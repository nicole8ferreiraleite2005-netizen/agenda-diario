import Image from 'next/image'

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
  const isExternal = src.startsWith('http')

  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={className}
        style={{
          objectFit,
          width: '100%',
          height: 'auto',
          aspectRatio: `${width} / ${height}`,
        }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{
        objectFit,
        width: '100%',
        height: 'auto',
      }}
    />
  )
}
