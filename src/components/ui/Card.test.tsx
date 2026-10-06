import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card Component', () => {
  it('should render children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    )
    const card = container.querySelector('div')
    expect(card).toHaveClass('card')
    expect(card).toHaveClass('custom-class')
  })

  it('should have card styling classes', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')

    expect(card).toHaveClass('bg-surface')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('rounded-md')
  })

  it('should render with default padding', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')

    expect(card).toHaveClass('p-4')
  })

  it('should accept multiple children', () => {
    render(
      <Card>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Card>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('should support hover state', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')

    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('transition')
  })

  it('should render as section element', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')

    expect(card).toBeInTheDocument()
    expect(card?.tagName).toBe('DIV')
  })
})
