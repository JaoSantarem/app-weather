'use client';

import { useState, useEffect, useRef } from 'react';
import { useCitySearch } from '@/hooks/useWeather';
import { SearchResult } from '@/types/weather';
import styles from './CitySearch.module.css';

interface CitySearchProps {
  onCitySelect: (city: SearchResult) => void;
  currentCity?: string;
}

export function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: cities, isLoading, error } = useCitySearch(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length >= 2);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!cities) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < cities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && cities[selectedIndex]) {
          handleCitySelect(cities[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleCitySelect = (city: SearchResult) => {
    onCitySelect(city);
    setQuery(city.display_name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onCitySelect({
            place_id: Date.now(),
            display_name: `${latitude},${longitude}`,
            lat: latitude.toString(),
            lon: longitude.toString(),
            address: { city: '', town: '', village: '', state: '', country: '' },
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Erro ao obter sua localização. Verifique as permissões.');
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite o nome da cidade..."
        className={styles.input}
      />
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {isLoading && (
            <div className={styles.loading}>Buscando cidades...</div>
          )}
          {error && (
            <div className={styles.error}>
              Erro ao buscar cidades. Tente novamente.
            </div>
          )}
          {cities && cities.length > 0 && (
            <ul className={styles.cityList}>
              {cities.map((city, index) => (
                <li
                  key={city.place_id}
                  className={`${styles.cityItem} ${
                    index === selectedIndex ? styles.selected : ''
                  }`}
                  onClick={() => handleCitySelect(city)}
                >
                  <div className={styles.cityName}>{city.display_name}</div>
                  <div className={styles.cityDetails}>
                    {city.address?.city || city.address?.town || city.address?.village || ''}
                    {city.address?.state ? `, ${city.address.state}` : ''}
                    {city.address?.country ? `, ${city.address.country}` : ''}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cities && cities.length === 0 && query.length >= 2 && (
            <div className={styles.noResults}>
              Nenhuma cidade encontrada para &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </>
  );
} 