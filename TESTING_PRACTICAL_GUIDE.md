# 🧪 TESTES - Opção 3 Prática

## ✅ Status
- Dependências instaladas ✅
- Scripts adicionados (`npm test`, `npm run test:watch`) ✅
- Framework pronto ✅

## 🚀 Comece Agora

### 1. Implementar Primeiro Teste (30 min)

Crie: `src/__tests__/useToast.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/hooks/useToast'
import { describe, it, expect } from 'vitest'

describe('useToast', () => {
  it('should create a toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.success('Test message')
    })
    
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Test message')
    expect(result.current.toasts[0].type).toBe('success')
  })

  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.success('Test')
    })
    
    const toastId = result.current.toasts[0].id
    
    act(() => {
      result.current.dismiss(toastId)
    })
    
    expect(result.current.toasts).toHaveLength(0)
  })

  it('should auto-dismiss after duration', async () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.show('Test', 'info', 100)
    })
    
    expect(result.current.toasts).toHaveLength(1)
    
    await new Promise(resolve => setTimeout(resolve, 150))
    
    expect(result.current.toasts).toHaveLength(0)
  })
})
```

### 2. Rodar Testes
```bash
npm run test
```

### 3. Ver Cobertura
```bash
npm run test:coverage
```

## 📝 Próximos Testes (Em Ordem)

### Hook Tests (2-3 horas)
1. **useToast** (exemplo acima)
2. **useErrorHandler** - Error handling
3. **useCache** - Caching logic
4. **useOfflineQueue** - Offline support
5. **useAuth** - Authentication

### Component Tests (2-3 horas)
1. **ErrorBoundary** - Error catching
2. **ConfirmDialog** - Dialog rendering
3. **TaskForm** - Form validation
4. **TasksSection** - Task list

### Integration Tests (1-2 horas)
1. Auth + Task flow
2. Offline + Online transition
3. Error recovery

## 🎯 Meta

- **Mínimo**: 40+ testes (já preparados)
- **Meta**: 80%+ cobertura
- **Tempo**: 6-8 horas (pode ser distribuído)

## ✍️ Template para Novos Testes

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('Nome da Feature', () => {
  beforeEach(() => {
    // Setup
  })

  afterEach(() => {
    // Cleanup
  })

  it('should fazer X quando Y', () => {
    // Arrange
    const setup = ...
    
    // Act
    const result = ...
    
    // Assert
    expect(result).toBe(...)
  })
})
```

## 🔍 Checklist para Cada Teste

- [ ] Teste nomeclatura clara
- [ ] Setup com beforeEach
- [ ] Cleanup com afterEach
- [ ] Arrange-Act-Assert structure
- [ ] Assertions específicas
- [ ] Sem side effects

## 📊 Progresso

Completo quando:
- [x] Vitest instalado
- [x] Scripts configurados
- [ ] 10+ testes implementados
- [ ] npm run test passa
- [ ] 80%+ cobertura
- [ ] CI/CD configurado

## 🚀 Próximo Passo

```bash
npm run test
# Verá alguns testes falhando (esperado - precisam ser implementados)
```

Escolha um teste simples (useToast é bom) e implemente!

## 💡 Dica

Testes são **mais rápidos** se implementados em pequenos lotes:
- 1 hora: 5 testes de hook simples
- 2 horas: 5 testes de component
- 1 hora: Integration tests

Total: 4 horas para cobertura básica ✅
