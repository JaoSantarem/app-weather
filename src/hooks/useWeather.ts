'use client';

import { useQuery } from '@tanstack/react-query';
import { weatherService } from '@/services/weatherApi';

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => weatherService.getWeatherData(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};

export const useWeatherByCoords = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => weatherService.getWeatherByCoords(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: ['citySearch', query],
    queryFn: () => weatherService.searchCities(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};

export const useLocation = () => {
  return useQuery({
    queryKey: ['location'],
    queryFn: (): Promise<{ lat: number; lon: number }> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation não é suportada'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    enabled: false, // Só executa quando chamado manualmente
    retry: 1,
  });
}; 