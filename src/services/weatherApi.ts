import axios from 'axios';
import { WeatherData, SearchResult } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'your-api-key-here';
const BASE_URL = 'http://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const weatherService = {
  // Buscar clima atual e previsão por cidade
  getWeatherData: async (city: string): Promise<WeatherData> => {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        q: city,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  },

  // Buscar clima por coordenadas
  getWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        q: `${lat},${lon}`,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  },

  // Buscar cidades por nome
  searchCities: async (query: string): Promise<SearchResult[]> => {
    const response = await weatherApi.get('/search.json', {
      params: {
        q: query,
      },
    });
    return response.data;
  },
};

export default weatherService; 