import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Coordenadas de São Paulo (exemplo)
const LATITUDE = -23.55;
const LONGITUDE = -46.63;

const fetchWeather = async () => {
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&hourly=temperature_2m`
    
  );
  return data;
};

export function useWeather() {
  return useQuery({
    queryKey: ['weather', LATITUDE, LONGITUDE],
    queryFn: fetchWeather,
  });
}