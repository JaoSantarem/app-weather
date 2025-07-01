'use client';

import { WeatherData } from '@/types/weather';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  data: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

export function WeatherCard({ data, unit }: WeatherCardProps) {
  const formatTemperature = (tempC: number, tempF: number) => {
    return unit === 'celsius' ? `${Math.round(tempC)}°C` : `${Math.round(tempF)}°F`;
  };

  const formatWind = (windKph: number, windMph: number) => {
    return unit === 'celsius' ? `${windKph} km/h` : `${windMph} mph`;
  };

  const formatPressure = (pressureMb: number, pressureIn: number) => {
    return unit === 'celsius' ? `${pressureMb} mb` : `${pressureIn} in`;
  };

  const getWeatherIcon = (conditionCode: number) => {
    // Mapeamento básico de códigos de condição para emojis
    const iconMap: { [key: number]: string } = {
      1000: '☀️', // Clear
      1003: '⛅', // Partly cloudy
      1006: '☁️', // Cloudy
      1009: '☁️', // Overcast
      1030: '🌫️', // Mist
      1063: '🌦️', // Patchy rain
      1066: '🌨️', // Patchy snow
      1069: '🌨️', // Patchy sleet
      1087: '⛈️', // Thundery outbreaks
      1114: '🌨️', // Blowing snow
      1117: '❄️', // Blizzard
      1135: '🌫️', // Fog
      1147: '🌫️', // Freezing fog
      1150: '🌧️', // Patchy light drizzle
      1153: '🌧️', // Light drizzle
      1168: '🌧️', // Freezing drizzle
      1171: '🌧️', // Heavy freezing drizzle
      1180: '🌦️', // Patchy light rain
      1183: '🌧️', // Light rain
      1186: '🌧️', // Moderate rain at times
      1189: '🌧️', // Moderate rain
      1192: '🌧️', // Heavy rain at times
      1195: '🌧️', // Heavy rain
      1198: '🌧️', // Light freezing rain
      1201: '🌧️', // Moderate or heavy freezing rain
      1204: '🌨️', // Light sleet
      1207: '🌨️', // Moderate or heavy sleet
      1210: '🌨️', // Patchy light snow
      1213: '🌨️', // Light snow
      1216: '🌨️', // Patchy moderate snow
      1219: '🌨️', // Moderate snow
      1222: '🌨️', // Patchy heavy snow
      1225: '❄️', // Heavy snow
      1237: '🧊', // Ice pellets
      1240: '🌦️', // Light rain shower
      1243: '🌧️', // Moderate or heavy rain shower
      1246: '🌧️', // Torrential rain shower
      1249: '🌨️', // Light sleet showers
      1252: '🌨️', // Moderate or heavy sleet showers
      1255: '🌨️', // Light snow showers
      1258: '🌨️', // Moderate or heavy snow showers
      1261: '🧊', // Light showers of ice pellets
      1264: '🧊', // Moderate or heavy showers of ice pellets
      1273: '⛈️', // Patchy light rain with thunder
      1276: '⛈️', // Moderate or heavy rain with thunder
      1279: '⛈️', // Patchy light snow with thunder
      1282: '⛈️', // Moderate or heavy snow with thunder
    };

    return iconMap[conditionCode] || '🌤️';
  };

  return (
    <div className={styles.container}>
      {/* Header com localização */}
      <div className={styles.header}>
        <h1 className={styles.location}>
          {data.location.name}, {data.location.country}
        </h1>
        <p className={styles.time}>
          {new Date(data.location.localtime).toLocaleString('pt-BR')}
        </p>
      </div>

      {/* Clima atual */}
      <div className={styles.currentWeather}>
        <div className={styles.mainInfo}>
          <div className={styles.temperature}>
            {formatTemperature(data.current.temp_c, data.current.temp_f)}
          </div>
          <div className={styles.condition}>
            <span className={styles.icon}>
              {getWeatherIcon(data.current.condition.code)}
            </span>
            <span className={styles.description}>
              {data.current.condition.text}
            </span>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Sensação térmica</span>
            <span className={styles.value}>
              {formatTemperature(data.current.feelslike_c, data.current.feelslike_f)}
            </span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.label}>Umidade</span>
            <span className={styles.value}>{data.current.humidity}%</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.label}>Vento</span>
            <span className={styles.value}>
              {formatWind(data.current.wind_kph, data.current.wind_mph)}
            </span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.label}>Pressão</span>
            <span className={styles.value}>
              {formatPressure(data.current.pressure_mb, data.current.pressure_in)}
            </span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.label}>Índice UV</span>
            <span className={styles.value}>{data.current.uv}</span>
          </div>
        </div>
      </div>

      {/* Previsão para os próximos dias */}
      <div className={styles.forecast}>
        <h2 className={styles.forecastTitle}>Previsão para 7 dias</h2>
        <div className={styles.forecastGrid}>
          {data.forecast.forecastday.map((day, index) => (
            <div key={day.date} className={styles.forecastDay}>
              <div className={styles.dayName}>
                {index === 0 ? 'Hoje' : 
                 new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
              </div>
              <div className={styles.dayIcon}>
                {getWeatherIcon(day.day.condition.code)}
              </div>
              <div className={styles.dayTemp}>
                <span className={styles.maxTemp}>
                  {formatTemperature(day.day.maxtemp_c, day.day.maxtemp_f)}
                </span>
                <span className={styles.minTemp}>
                  {formatTemperature(day.day.mintemp_c, day.day.mintemp_f)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 