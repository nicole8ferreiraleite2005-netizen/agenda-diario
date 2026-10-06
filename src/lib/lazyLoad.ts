import { lazy, ComponentType } from 'react'

export function lazyLoadComponent<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>
): ComponentType<P> {
  return lazy(importFunc)
}
