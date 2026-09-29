import { formatDistance, type Pharmacy } from '../../data/pharmacies';
import { IconButton } from '../IconButton';
import { StatusLabel } from '../StatusLabel';
import styles from './PharmacyRow.module.css';

type PharmacyRowProps = { pharmacy: Pharmacy; focused?: boolean; onSelect: () => void };

/** Result row on the ArticleCard surface (Lavender 20, 8px radius, article shadow). */
export function PharmacyRow({ pharmacy, focused, onSelect }: PharmacyRowProps) {
  return (
    <button type="button" className={`${styles.row} ${focused ? styles.focused : ''} pressable`} onClick={onSelect}>
      <span className={styles.text}>
        <span className={`${styles.name} t-body-bold`}>{pharmacy.name}</span>
        <span className="t-body-small">
          {pharmacy.address}, {pharmacy.cityStateZip}
        </span>
        <span className={styles.meta}>
          <StatusLabel tone="neutral">{formatDistance(pharmacy.distance)}</StatusLabel>
          <span className={`${styles.hours} t-body-small`}>{pharmacy.hours}</span>
        </span>
      </span>
      <IconButton icon="arrowRight" size="sm" />
    </button>
  );
}
