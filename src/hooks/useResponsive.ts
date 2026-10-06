import { useState, useEffect } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ResponsiveInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  currentBreakpoint: Breakpoint
  width: number
}

export function useResponsive(): ResponsiveInfo {
  const [responsiveInfo, setResponsiveInfo] = useState<ResponsiveInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    currentBreakpoint: 'md',
    width: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      let breakpoint: Breakpoint = 'xs'
      let isMobile = true
      let isTablet = false
      let isDesktop = false

      if (width >= 640) {
        breakpoint = 'sm'
        isMobile = false
        isTablet = true
      }
      if (width >= 768) {
        breakpoint = 'md'
        isTablet = true
      }
      if (width >= 1024) {
        breakpoint = 'lg'
        isTablet = false
        isDesktop = true
      }
      if (width >= 1280) {
        breakpoint = 'xl'
        isDesktop = true
      }

      setResponsiveInfo({
        isMobile,
        isTablet,
        isDesktop,
        currentBreakpoint: breakpoint,
        width,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return responsiveInfo
}

export function useIsMobile() {
  const { isMobile } = useResponsive()
  return isMobile
}

export function useIsTablet() {
  const { isTablet } = useResponsive()
  return isTablet
}

export function useIsDesktop() {
  const { isDesktop } = useResponsive()
  return isDesktop
}
