'use client';

import { useState, useEffect } from 'react';
import { CitySearch } from '@/components/CitySearch';
import { WeatherCard } from '@/components/WeatherCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { UnitToggle } from '@/components/UnitToggle';
import { useWeather, useWeatherByCoords } from '@/hooks/useWeather';
import styles from './page.module.css';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('São Paulo');
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  // Verificar se a cidade selecionada são coordenadas
  const isCoords = selectedCity.includes(',');

  const weatherByCoordsQuery = useWeatherByCoords(coords?.lat || 0, coords?.lon || 0);
  const weatherByCityQuery = useWeather(selectedCity);
  
  const weatherQuery = isCoords ? weatherByCoordsQuery : weatherByCityQuery;

  useEffect(() => {
    if (isCoords) {
      const [lat, lon] = selectedCity.split(',').map(Number);
      setCoords({ lat, lon });
    } else {
      setCoords(null);
    }
  }, [selectedCity, isCoords]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleUnitChange = (newUnit: 'celsius' | 'fahrenheit') => {
    setUnit(newUnit);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌤️ Weather App</h1>
        <p className={styles.subtitle}>Previsão do tempo em tempo real</p>
      </header>

      <main className={styles.main}>
        <div className={styles.controls}>
          <CitySearch onCitySelect={handleCitySelect} />
          <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
        </div>

        <div className={styles.content}>
          {weatherQuery.isLoading && (
            <LoadingSpinner message="Carregando dados do clima..." />
          )}

          {weatherQuery.error && (
            <div className={styles.error}>
              <h2>Erro ao carregar dados</h2>
              <p>
                {weatherQuery.error instanceof Error 
                  ? weatherQuery.error.message 
                  : 'Ocorreu um erro inesperado. Tente novamente.'}
              </p>
            </div>
          )}

          {weatherQuery.data && (
            <WeatherCard data={weatherQuery.data} unit={unit} />
          )}

          {!weatherQuery.isLoading && !weatherQuery.error && !weatherQuery.data && (
            <div className={styles.empty}>
              <h2>Bem-vindo ao Weather App!</h2>
              <p>Digite o nome de uma cidade para ver a previsão do tempo.</p>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Weather App - Dados fornecidos pela WeatherAPI.com</p>
      </footer>
    </div>
  );
}
