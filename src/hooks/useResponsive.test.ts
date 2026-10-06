import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useResponsive, useIsMobile, useIsTablet, useIsDesktop } from './useResponsive'

describe('useResponsive', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should detect mobile breakpoint correctly', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(375)
    const { result } = renderHook(() => useResponsive())

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.currentBreakpoint).toBe('xs')
  })

  it('should detect tablet breakpoint correctly', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(768)
    const { result } = renderHook(() => useResponsive())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.currentBreakpoint).toBe('md')
  })

  it('should detect desktop breakpoint correctly', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280)
    const { result } = renderHook(() => useResponsive())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.currentBreakpoint).toBe('xl')
  })
})

describe('useIsMobile', () => {
  it('should return mobile status', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(375)
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })
})

describe('useIsDesktop', () => {
  it('should return desktop status', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280)
    const { result } = renderHook(() => useIsDesktop())

    expect(result.current).toBe(true)
  })
})
