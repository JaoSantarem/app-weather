import '@testing-library/jest-dom'

// Mock do fetch global
global.fetch = jest.fn()

// Mock do navigator.geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn(),
  },
  writable: true,
}) 