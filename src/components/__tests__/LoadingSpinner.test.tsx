import { render } from '@testing-library/react'
import { LoadingSpinner } from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    const { container } = render(<LoadingSpinner />)
    
    expect(container.textContent).toContain('Carregando...')
  })

  it('renders with custom message', () => {
    const customMessage = 'Buscando dados...'
    const { container } = render(<LoadingSpinner message={customMessage} />)
    
    expect(container.textContent).toContain(customMessage)
  })

  it('applies correct size class', () => {
    const { container } = render(<LoadingSpinner size="large" />)
    
    const element = container.firstChild as HTMLElement
    expect(element?.className).toContain('large')
  })

  it('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />)
    
    const spinner = container.querySelector('.spinner')
    expect(spinner).toBeTruthy()
  })
}) 