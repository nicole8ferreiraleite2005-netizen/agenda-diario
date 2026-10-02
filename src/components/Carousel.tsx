'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

interface CarouselProps {
  activeSection: 'tasks' | 'mural' | 'calendar'
  onPrevious: () => void
  onNext: () => void
  onGoToSection?: (section: 'tasks' | 'mural' | 'calendar') => void
  tasks: ReactNode
  mural: ReactNode
  calendar: ReactNode
}

export function Carousel({
  activeSection,
  onPrevious,
  onNext,
  onGoToSection,
  tasks,
  mural,
  calendar,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)

  const sectionOrder = ['tasks', 'mural', 'calendar'] as const
  const currentIndex = sectionOrder.indexOf(activeSection)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onPrevious, onNext])

  // Mouse drag
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseDown = (e: MouseEvent) => {
      dragStartX.current = e.clientX
      isDragging.current = true
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const diff = e.clientX - dragStartX.current
      setDragOffset(diff)
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const diff = e.clientX - dragStartX.current
      const threshold = 50

      if (diff > threshold) {
        onPrevious()
      } else if (diff < -threshold) {
        onNext()
      }

      setDragOffset(0)
    }

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartTime.current = Date.now()
      isDragging.current = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      const diff = e.touches[0].clientX - touchStartX.current
      setDragOffset(diff)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX.current - touchEndX
      const timeDiff = Date.now() - touchStartTime.current

      const minDistance = Math.max(50, container.clientWidth ? container.clientWidth * 0.2 : 50)
      const isQuickFlick = timeDiff < 300 && Math.abs(diff) > 30
      const isSlowSwipe = Math.abs(diff) > minDistance

      if (isQuickFlick || isSlowSwipe) {
        if (diff > 0) {
          onNext()
        } else {
          onPrevious()
        }
      }

      setDragOffset(0)
    }

    container.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchmove', handleTouchMove)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onPrevious, onNext])

  return (
    <div className="w-full flex-1 flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden relative cursor-grab active:cursor-grabbing">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .carousel-container {
          will-change: transform;
        }
      `}</style>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden touch-pan-y relative carousel-container"
        style={{
          transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging.current ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          width: '300%',
        }}
      >
        {/* SECTION 1: TASKS */}
        <div className="w-1/3 h-full overflow-y-auto">
          {tasks}
        </div>

        {/* SECTION 2: MURAL */}
        <div className="w-1/3 h-full overflow-y-auto">
          {mural}
        </div>

        {/* SECTION 3: CALENDAR */}
        <div className="w-1/3 h-full overflow-y-auto">
          {calendar}
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-3 py-4 bg-white/40 backdrop-blur">
        {sectionOrder.map((section, index) => (
          <button
            key={section}
            onClick={() => onGoToSection && onGoToSection(section)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-3 h-3 bg-orange-400 shadow-lg'
                : 'w-2 h-2 bg-orange-200/60 hover:bg-orange-300'
            }`}
            aria-label={`Ir para ${section}`}
          />
        ))}
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 pointer-events-none">
        ← Arrastar ou usar setas do teclado →
      </div>
    </div>
  )
}
