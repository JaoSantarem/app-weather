import axios from 'axios';
import { WeatherData, SearchResult } from '@/types/weather';

// Open-Meteo base URL
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
// Nominatim base URL para busca de cidades
const GEOCODE_BASE_URL = 'https://nominatim.openstreetmap.org/search';

export const weatherService = {
  // Buscar clima atual e previsão por coordenadas
  getWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,relative_humidity_2m,precipitation,weathercode',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
        current_weather: true,
        timezone: 'auto',
      },
    });
    return response.data;
  },

  // Buscar cidades por nome usando Nominatim
  searchCities: async (query: string): Promise<SearchResult[]> => {
    const response = await axios.get(GEOCODE_BASE_URL, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      },
    });
    return response.data;
  },
};

export default weatherService; 