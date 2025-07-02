'use client';

import { WeatherData } from '@/types/weather';
import styles from './WeatherCard.module.css';
import { useState } from 'react';
import { UnitToggle } from './UnitToggle';

interface CardTempoProps {
  dados: WeatherData;
  unidade: 'celsius' | 'fahrenheit';
  nomeCidade: string;
  mudaUnidade: (u: 'celsius' | 'fahrenheit') => void;
  diaEscolhido: number;
  mudaDia: (d: number) => void;
}

const codigosClima: Record<number, { texto: string; icone: string }> = {
  0: { texto: 'Sol', icone: '☀️' },
  1: { texto: 'Meio sol', icone: '🌤️' },
  2: { texto: 'Nublado', icone: '⛅' },
  3: { texto: 'Nuvens', icone: '☁️' },
  45: { texto: 'Névoa', icone: '🌫️' },
  48: { texto: 'Névoa', icone: '🌫️' },
  51: { texto: 'Chuvisco', icone: '🌦️' },
  53: { texto: 'Chuvisco', icone: '🌦️' },
  55: { texto: 'Chuvisco', icone: '🌧️' },
  56: { texto: 'Chuvisco', icone: '🌧️' },
  57: { texto: 'Chuvisco', icone: '🌧️' },
  61: { texto: 'Chuva', icone: '🌦️' },
  63: { texto: 'Chuva', icone: '🌧️' },
  65: { texto: 'Chuva', icone: '🌧️' },
  66: { texto: 'Chuva', icone: '🌧️' },
  67: { texto: 'Chuva', icone: '🌧️' },
  71: { texto: 'Neve', icone: '🌨️' },
  73: { texto: 'Neve', icone: '🌨️' },
  75: { texto: 'Neve', icone: '❄️' },
  77: { texto: 'Neve', icone: '❄️' },
  80: { texto: 'Chuvinha', icone: '🌦️' },
  81: { texto: 'Chuvinha', icone: '🌧️' },
  82: { texto: 'Chuvona', icone: '🌧️' },
  85: { texto: 'Neve', icone: '🌨️' },
  86: { texto: 'Neve', icone: '❄️' },
  95: { texto: 'Tempestade', icone: '⛈️' },
  96: { texto: 'Tempestade', icone: '⛈️' },
  99: { texto: 'Tempestade', icone: '⛈️' },
};

function corFundoClima(c: number) {
  if ([0, 1].includes(c)) return 'linear-gradient(135deg, #4f8ef7 0%, #70c1ff 100%)';
  if ([2, 3].includes(c)) return 'linear-gradient(135deg, #7b8fa3 0%, #b0b8c1 100%)';
  if ([45, 48].includes(c)) return 'linear-gradient(135deg, #6e7f8d 0%, #bfc6d1 100%)';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c)) return 'linear-gradient(135deg, #4e5d6c 0%, #6e8ca0 100%)';
  if ([71, 73, 75, 77, 85, 86].includes(c)) return 'linear-gradient(135deg, #b3c6e7 0%, #e0e7ef 100%)';
  if ([95, 96, 99].includes(c)) return 'linear-gradient(135deg, #5a4e7c 0%, #b8a1e3 100%)';
  return 'linear-gradient(135deg, #4f8ef7 0%, #70c1ff 100%)';
}

export function CardTempo({ dados, unidade, nomeCidade, mudaUnidade, diaEscolhido, mudaDia }: CardTempoProps) {
  const agora = new Date();
  const ehHoje = diaEscolhido === 0;
  const cod = ehHoje
    ? dados.current_weather?.weathercode ?? 0
    : dados.daily?.weathercode[diaEscolhido] ?? 0;
  const cond = codigosClima[cod] || { texto: 'Sei lá', icone: '❓' };
  const temp = ehHoje
    ? dados.current_weather?.temperature ?? null
    : dados.daily?.temperature_2m_max[diaEscolhido] ?? null;
  const vento = ehHoje
    ? dados.current_weather?.windspeed ?? null
    : null;
  const ventoDir = ehHoje
    ? dados.current_weather?.winddirection ?? null
    : null;
  const tempFormatada = (t: number) => {
    if (unidade === 'celsius') return `${Math.round(t)}°C`;
    return `${Math.round(t * 9/5 + 32)}°F`;
  };
  return (
    <div className={styles.container} style={{ background: corFundoClima(cod) }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
        <UnitToggle unit={unidade} onUnitChange={mudaUnidade} />
      </div>
      <div className={styles.header}>
        <div className={styles.location}>{nomeCidade}</div>
        <div className={styles.date}>{agora.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        <div className={styles.time}>{agora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        <div className={styles.conditionText}>{cond.texto}</div>
      </div>
      <div className={styles.currentWeather} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={styles.details} style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          {ehHoje ? (
            <>
              <div className={styles.detailItem}>
                <span className={styles.label}>Vento</span>
                <span className={styles.value}>
                  {vento !== null ? `${vento} km/h` : '--'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Direção do vento</span>
                <span className={styles.value}>
                  {ventoDir !== null ? `${ventoDir}°` : '--'}
                </span>
              </div>
            </>
          ) : null}
        </div>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.icon} style={{ textAlign: 'center' }}>{cond.icone}</div>
          <div className={styles.temperature} style={{ textAlign: 'center', marginLeft: 0 }}>
            {temp !== null ? tempFormatada(temp) : '--'}
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      {dados.daily && (
        <div className={styles.forecast}>
          <div className={styles.forecastTitle}>Previsão diária</div>
          <div className={styles.forecastGrid}>
            {dados.daily.time.map((date, idx) => {
              const codDia = dados.daily!.weathercode[idx];
              const condDia = codigosClima[codDia] || { texto: '', icone: '❓' };
              return (
                <div
                  key={date}
                  className={styles.forecastDay}
                  style={diaEscolhido === idx ? { border: '2px solid #fff', boxShadow: '0 0 0 2px #fff3' } : {}}
                  onClick={() => mudaDia(idx)}
                >
                  <div className={styles.dayName}>
                    {idx === 0 ? 'Hoje' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </div>
                  <div className={styles.dayIcon}>{condDia.icone}</div>
                  <div className={styles.dayTemp}>
                    <span className={styles.maxTemp}>
                      {tempFormatada(dados.daily!.temperature_2m_max[idx])}
                    </span>
                    <span className={styles.minTemp}>
                      {tempFormatada(dados.daily!.temperature_2m_min[idx])}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 