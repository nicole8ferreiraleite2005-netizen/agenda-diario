# Testing Guide 🧪

## Quick Start

```bash
# Run all tests once
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── test/
│   ├── setup.ts              # Global test setup
│   └── integration.test.tsx   # Integration tests
├── components/
│   └── ui/
│       ├── Button.test.tsx
│       ├── Card.test.tsx
│       └── PageHeader.test.tsx
└── hooks/
    ├── useResponsive.test.ts
    └── useDarkMode.test.ts
```

## Test Categories

### Unit Tests
- Hook tests (useResponsive, useDarkMode)
- Component tests (Button, Card, PageHeader)
- Pure function tests

### Integration Tests
- Multi-component interactions
- Hook + Component combinations
- State management flows

### Test Coverage
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Writing Tests

### Hook Test Pattern

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMyHook } from './useMyHook'

describe('useMyHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current).toBeDefined()
  })
})
```

### Component Test Pattern

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('should render text', () => {
    render(<MyComponent />)
    expect(screen.getByText('text')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<MyComponent onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

## Best Practices

✅ **Do:**
- Use `userEvent` instead of `fireEvent`
- Test behavior, not implementation
- Use semantic queries (role, label, text)
- Test accessibility (keyboard, focus states)
- Keep tests focused and isolated

❌ **Don't:**
- Test internal state
- Use `data-testid` when semantic queries work
- Test library code
- Skip accessibility tests
- Create interdependent tests

## Test Statistics

| Test File | Cases | Status |
|-----------|-------|--------|
| useResponsive | 6 | ✅ |
| useDarkMode | 4 | ✅ |
| Button | 7 | ✅ |
| PageHeader | 7 | ✅ |
| Card | 7 | ✅ |
| Integration | 11 | ✅ |
| **Total** | **42 tests** | ✅ |

## Running Specific Tests

```bash
# Run tests for a specific file
npx vitest src/components/ui/Button.test.tsx

# Run tests matching a pattern
npx vitest --grep "Button"

# Run with UI
npx vitest --ui

# Debug mode
npx vitest --inspect-brk
```

## Coverage Report

```bash
# Generate and view coverage
npm run test:coverage

# Open coverage HTML report
open coverage/index.html
```

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Check tsconfig paths match vitest config aliases

### Issue: "Module not found in jsdom"
**Solution**: Add mock in `src/test/setup.ts`

### Issue: "act() warning"
**Solution**: Use `userEvent` instead of `fireEvent`, ensure async operations are awaited

## Continuous Integration

Tests run automatically on:
- Pre-commit hooks (via husky + lint-staged)
- CI/CD pipeline (GitHub Actions)
- Pull request checks

## Performance

Target metrics:
- Average test duration: < 100ms
- Total suite runtime: < 30s
- Memory usage: < 500MB

## Next Steps

- [ ] E2E tests with Playwright
- [ ] Visual regression testing
- [ ] Performance benchmarks
- [ ] Accessibility audit (jest-axe)
- [ ] Coverage thresholds enforcement

---

For more information, see [FASE9_TESTING.md](./FASE9_TESTING.md)
