import { render, fireEvent } from '@testing-library/react'
import { UnitToggle } from '../UnitToggle'

describe('UnitToggle', () => {
  const mockOnUnitChange = jest.fn()

  beforeEach(() => {
    mockOnUnitChange.mockClear()
  })

  it('renders with celsius selected', () => {
    const { container } = render(
      <UnitToggle unit="celsius" onUnitChange={mockOnUnitChange} />
    )
    
    expect(container.textContent).toContain('Unidade:')
    expect(container.textContent).toContain('°C')
    expect(container.textContent).toContain('°F')
  })

  it('renders with fahrenheit selected', () => {
    const { container } = render(
      <UnitToggle unit="fahrenheit" onUnitChange={mockOnUnitChange} />
    )
    
    expect(container.textContent).toContain('Unidade:')
    expect(container.textContent).toContain('°C')
    expect(container.textContent).toContain('°F')
  })

  it('calls onUnitChange when celsius button is clicked', () => {
    const { container } = render(
      <UnitToggle unit="fahrenheit" onUnitChange={mockOnUnitChange} />
    )
    
    const celsiusButton = container.querySelector('button')
    fireEvent.click(celsiusButton!)
    
    expect(mockOnUnitChange).toHaveBeenCalledWith('celsius')
  })

  it('calls onUnitChange when fahrenheit button is clicked', () => {
    const { container } = render(
      <UnitToggle unit="celsius" onUnitChange={mockOnUnitChange} />
    )
    
    const buttons = container.querySelectorAll('button')
    const fahrenheitButton = buttons[1]
    fireEvent.click(fahrenheitButton!)
    
    expect(mockOnUnitChange).toHaveBeenCalledWith('fahrenheit')
  })

  it('applies active class to selected unit', () => {
    const { container } = render(
      <UnitToggle unit="celsius" onUnitChange={mockOnUnitChange} />
    )
    
    const buttons = container.querySelectorAll('button')
    const celsiusButton = buttons[0] as HTMLElement
    const fahrenheitButton = buttons[1] as HTMLElement
    
    expect(celsiusButton.className).toContain('active')
    expect(fahrenheitButton.className).not.toContain('active')
  })
}) 