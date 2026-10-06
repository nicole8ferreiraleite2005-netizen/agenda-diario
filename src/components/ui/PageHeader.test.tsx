import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from './PageHeader'

describe('PageHeader Component', () => {
  it('should render title', () => {
    render(<PageHeader title="Test Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
  })

  it('should render description when provided', () => {
    render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('should not render description when not provided', () => {
    render(<PageHeader title="Test Title" />)
    // Description should not be in the document
    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  it('should render action when provided', () => {
    render(
      <PageHeader
        title="Test Title"
        action={<button>Action Button</button>}
      />
    )
    expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument()
  })

  it('should render ReactNode as title', () => {
    const titleNode = <span data-testid="custom-title">Custom Title Node</span>
    render(<PageHeader title={titleNode} />)
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })

  it('should have proper semantic structure', () => {
    render(
      <PageHeader
        title="Main Title"
        description="Description text"
      />
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.parentElement?.parentElement).toHaveClass('flex')
  })

  it('should line clamp title and description', () => {
    const longTitle = 'A'.repeat(200)
    const { container } = render(
      <PageHeader title={longTitle} description="Long description" />
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('line-clamp-2')
  })
})
