import { useEffect, useState } from 'react';
import { isValidZip, type SearchLocation } from '../../data/pharmacies';
import { Button } from '../Button';
import styles from './LocationPicker.module.css';

type LocationPickerProps = {
  initialZip?: string;
  onSelect: (location: SearchLocation) => void;
  onCancel?: () => void;
};

/** Set the search location: simulated current location, or a ZIP code (TextField_Light). */
export function LocationPicker({ initialZip = '', onSelect, onCancel }: LocationPickerProps) {
  const [zip, setZip] = useState(initialZip);
  const [locating, setLocating] = useState(false);

  // Simulated location lookup — no browser geolocation.
  useEffect(() => {
    if (!locating) return;
    const t = window.setTimeout(() => onSelect({ kind: 'current' }), 700);
    return () => window.clearTimeout(t);
  }, [locating, onSelect]);

  return (
    <div className={styles.picker}>
      <Button onClick={() => setLocating(true)} disabled={locating}>
        {locating ? 'Finding your location…' : 'Use current location'}
      </Button>
      <p className={`${styles.or} t-body-small`}>or search by ZIP code</p>
      <form
        className={styles.zipRow}
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidZip(zip)) onSelect({ kind: 'zip', zip });
        }}
      >
        <input
          className={`${styles.input} t-body`}
          aria-label="ZIP code"
          placeholder="ZIP code"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
        />
        <Button type="submit" className={styles.search} disabled={!isValidZip(zip) || locating}>
          Search
        </Button>
      </form>
      {onCancel && (
        <button type="button" className={`${styles.cancel} t-body-small-bold`} onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
