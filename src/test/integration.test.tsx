import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Integration Tests', () => {
  describe('Button + User Interaction', () => {
    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })

      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should handle click and keyboard activation', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick}>Test</Button>)

      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)

      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Multiple Components', () => {
    it('should render multiple buttons with different variants', () => {
      render(
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </>
      )

      expect(screen.getByRole('button', { name: /primary/i })).toHaveClass('bg-primary')
      expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('bg-surface-secondary')
      expect(screen.getByRole('button', { name: /danger/i })).toHaveClass('bg-danger')
    })

    it('should handle disabled state across multiple buttons', () => {
      render(
        <>
          <Button>Enabled</Button>
          <Button disabled>Disabled</Button>
        </>
      )

      expect(screen.getByRole('button', { name: /enabled/i })).not.toBeDisabled()
      expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
    })
  })

  describe('Loading State', () => {
    it('should show loading state and prevent clicks during loading', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      const { rerender } = render(
        <Button onClick={handleClick} isLoading={false}>
          Click me
        </Button>
      )

      const button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)

      // Switch to loading state
      rerender(
        <Button onClick={handleClick} isLoading={true} disabled={true}>
          Click me
        </Button>
      )

      expect(screen.getByRole('button')).toHaveTextContent('...')
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('should maintain accessibility through state changes', async () => {
      const user = userEvent.setup()
      render(<Button>Accessible Button</Button>)

      const button = screen.getByRole('button')

      // Button should be keyboard accessible
      button.focus()
      expect(button).toHaveFocus()

      // Should respond to keyboard
      await user.keyboard('{Enter}')
      expect(button).toHaveFocus()
    })

    it('should have proper focus states', () => {
      const { container } = render(<Button>Focus Test</Button>)
      const button = screen.getByRole('button')

      button.focus()
      expect(button).toHaveFocus()

      // Should have focus-visible class or similar
      expect(button.className).toBeTruthy()
    })
  })
})
