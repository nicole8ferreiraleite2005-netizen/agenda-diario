'use client'

import { useState, useCallback } from 'react'

type Section = 'tasks' | 'mural' | 'calendar'

export function useCarousel(defaultSection: Section = 'mural') {
  const [activeSection, setActiveSection] = useState<Section>(defaultSection)

  const goToSection = useCallback((section: Section) => {
    setActiveSection(section)
  }, [])

  const goToPrevious = useCallback(() => {
    const sections: Section[] = ['tasks', 'mural', 'calendar']
    const currentIndex = sections.indexOf(activeSection)
    const previousIndex = (currentIndex - 1 + sections.length) % sections.length
    setActiveSection(sections[previousIndex])
  }, [activeSection])

  const goToNext = useCallback(() => {
    const sections: Section[] = ['tasks', 'mural', 'calendar']
    const currentIndex = sections.indexOf(activeSection)
    const nextIndex = (currentIndex + 1) % sections.length
    setActiveSection(sections[nextIndex])
  }, [activeSection])

  return {
    activeSection,
    goToSection,
    goToPrevious,
    goToNext,
  }
}
