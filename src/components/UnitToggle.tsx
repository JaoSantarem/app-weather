'use client';

import styles from './UnitToggle.module.css';

interface UnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onUnitChange: (unit: 'celsius' | 'fahrenheit') => void;
}

export function UnitToggle({ unit, onUnitChange }: UnitToggleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          className={`${styles.button} ${unit === 'celsius' ? styles.active : ''}`}
          onClick={() => onUnitChange('celsius')}
        >
          °C
        </button>
        <button
          className={`${styles.button} ${unit === 'fahrenheit' ? styles.active : ''}`}
          onClick={() => onUnitChange('fahrenheit')}
        >
          °F
        </button>
      </div>
    </div>
  );
} 