'use client'

import { useRef, useCallback, useState } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export function useCache<T>(ttlMs: number = 5 * 60 * 1000) {
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map())
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 })

  const get = useCallback((key: string): T | null => {
    const entry = cacheRef.current.get(key)

    if (!entry) {
      setCacheStats(s => ({ ...s, misses: s.misses + 1 }))
      return null
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl
    if (isExpired) {
      cacheRef.current.delete(key)
      setCacheStats(s => ({ ...s, misses: s.misses + 1 }))
      return null
    }

    setCacheStats(s => ({ ...s, hits: s.hits + 1 }))
    return entry.data
  }, [])

  const set = useCallback((key: string, data: T) => {
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    })
  }, [ttlMs])

  const clear = useCallback(() => {
    cacheRef.current.clear()
  }, [])

  const invalidate = useCallback((key: string) => {
    cacheRef.current.delete(key)
  }, [])

  return {
    get,
    set,
    clear,
    invalidate,
    stats: cacheStats,
  }
}
