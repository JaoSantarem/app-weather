import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWeather } from '../useWeather'
import { weatherService } from '@/services/weatherApi'

// Mock do serviço
jest.mock('@/services/weatherApi', () => ({
  weatherService: {
    getWeatherData: jest.fn(),
    getWeatherByCoords: jest.fn(),
    searchCities: jest.fn(),
  },
}))

const mockWeatherService = weatherService as jest.Mocked<typeof weatherService>

// Wrapper para o QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch weather data for a city', async () => {
    const mockWeatherData = {
      location: { name: 'São Paulo', country: 'Brazil' },
      current: { temp_c: 25, temp_f: 77 },
      forecast: { forecastday: [] },
    }

    mockWeatherService.getWeatherData.mockResolvedValue(mockWeatherData)

    const { result } = renderHook(() => useWeather('São Paulo'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockWeatherService.getWeatherData).toHaveBeenCalledWith('São Paulo')
    expect(result.current.data).toEqual(mockWeatherData)
  })

  it('should handle errors', async () => {
    const error = new Error('API Error')
    mockWeatherService.getWeatherData.mockRejectedValue(error)

    const { result } = renderHook(() => useWeather('Invalid City'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBe(error)
  })

  it('should not fetch when city is empty', () => {
    const { result } = renderHook(() => useWeather(''), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(mockWeatherService.getWeatherData).not.toHaveBeenCalled()
  })
}) 