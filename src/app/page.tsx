'use client';

import { useState } from 'react';
import { CitySearch } from '@/components/CitySearch';
import { CardTempo } from '@/components/WeatherCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useWeatherByCoords } from '@/hooks/useWeather';
import { SearchResult } from '@/types/weather';
import styles from './page.module.css';

function getBgColorByWeatherCode(c: number) {
  if ([0, 1].includes(c)) return 'linear-gradient(135deg, #4f8ef7 0%, #70c1ff 100%)'; // Sol
  if ([2, 3].includes(c)) return 'linear-gradient(135deg, #7b8fa3 0%, #b0b8c1 100%)'; // Nublado
  if ([45, 48].includes(c)) return 'linear-gradient(135deg, #6e7f8d 0%, #bfc6d1 100%)'; // Neblina
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c)) return 'linear-gradient(135deg, #4e5d6c 0%, #6e8ca0 100%)'; // Chuva
  if ([71, 73, 75, 77, 85, 86].includes(c)) return 'linear-gradient(135deg, #b3c6e7 0%, #e0e7ef 100%)'; // Neve
  if ([95, 96, 99].includes(c)) return 'linear-gradient(135deg, #5a4e7c 0%, #b8a1e3 100%)'; // Tempestade
  return 'linear-gradient(135deg, #4f8ef7 0%, #70c1ff 100%)'; // Default
}

export default function Home() {
  const [cidadeEscolhida, setCidadeEscolhida] = useState<SearchResult | null>(null);
  const [unidade, setUnidade] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [diaEscolhido, mudaDia] = useState(0);

  const lat = cidadeEscolhida ? Number(cidadeEscolhida.lat) : null;
  const lon = cidadeEscolhida ? Number(cidadeEscolhida.lon) : null;

  const tempoQuery = useWeatherByCoords(lat || 0, lon || 0);

  let codBg = 0;
  if (tempoQuery.data && tempoQuery.data.daily) {
    codBg = tempoQuery.data.daily.weathercode[diaEscolhido] ?? 0;
  } else if (tempoQuery.data && tempoQuery.data.current_weather) {
    codBg = tempoQuery.data.current_weather.weathercode ?? 0;
  }
  const bgStyle = { background: getBgColorByWeatherCode(codBg) };

  const aoEscolherCidade = (c: SearchResult) => {
    setCidadeEscolhida(c);
    mudaDia(0);
  };

  const aoMudarUnidade = (u: 'celsius' | 'fahrenheit') => {
    setUnidade(u);
  };

  return (
    <div className={styles.container} style={bgStyle}>
      <header className={styles.header}>
        <h1 className={styles.title}>Previsão do tempo</h1>
      </header>

      <main className={styles.main}>
        <CitySearch onCitySelect={aoEscolherCidade} />

        {tempoQuery.isLoading && (
          <LoadingSpinner message="Carregando dados do clima..." />
        )}

        {tempoQuery.error && (
          <div className={styles.error}>
            <h2>Erro ao carregar dados</h2>
            <p>
              {tempoQuery.error instanceof Error 
                ? tempoQuery.error.message 
                : 'Ocorreu um erro inesperado. Tente novamente.'}
            </p>
          </div>
        )}

        {tempoQuery.data && cidadeEscolhida && (
          <CardTempo
            dados={tempoQuery.data}
            unidade={unidade}
            nomeCidade={cidadeEscolhida.display_name}
            mudaUnidade={aoMudarUnidade}
            diaEscolhido={diaEscolhido}
            mudaDia={mudaDia}
          />
        )}

        {!tempoQuery.isLoading && !tempoQuery.error && !tempoQuery.data && (
          <div className={styles.empty}>
            <p>Digite o nome de uma cidade obter a previsão do tempo</p>
          </div>
        )}
      </main>
    </div>
  );
}
