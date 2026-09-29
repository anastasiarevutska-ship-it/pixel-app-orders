import { formatDistance, type Pharmacy, type Radius } from '../../data/pharmacies';
import { Button } from '../Button';
import { GlassCard } from '../GlassCard';
import styles from './PharmacyMap.module.css';

// Map canvas in px (the element keeps this aspect ratio); the search radius spans RING px.
const W = 326;
const H = 420;
const RING = 136;

function position(p: Pharmacy, radius: Radius) {
  const r = (p.distance / radius) * RING;
  const rad = (p.bearing * Math.PI) / 180;
  return { left: `${((W / 2 + r * Math.sin(rad)) / W) * 100}%`, top: `${((H / 2 - r * Math.cos(rad)) / H) * 100}%` };
}

type PharmacyMapProps = {
  pharmacies: Pharmacy[];
  radius: Radius;
  focusedId?: string;
  onFocus: (id?: string) => void;
  onSelect: (id: string) => void;
};

/**
 * Prototype map: a static illustrated street grid with pins for the same
 * results as the list. Tapping a pin reveals a glass card with the pharmacy.
 */
export function PharmacyMap({ pharmacies, radius, focusedId, onFocus, onSelect }: PharmacyMapProps) {
  const focused = pharmacies.find((p) => p.id === focusedId);

  return (
    <div className={styles.map} onClick={() => onFocus(undefined)}>
      <svg className={styles.streets} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path className={styles.water} d="M-10 300 C 60 270, 110 330, 170 300 S 280 240, 340 262 L 340 292 C 280 272, 220 334, 170 330 S 60 300, -10 330 Z" />
        <rect className={styles.park} x="208" y="58" width="72" height="54" rx="6" />
        <rect className={styles.park} x="36" y="186" width="54" height="64" rx="6" />
        <g className={styles.road}>
          <path d="M0 150 H326 M0 236 H326 M0 360 H326 M96 0 V420 M163 0 V420 M250 0 V420" />
          <path d="M0 40 L326 190 M0 400 L180 0" />
        </g>
        <g className={styles.minor}>
          <path d="M0 95 H326 M0 190 H326 M0 290 H326 M40 0 V420 M130 0 V420 M205 0 V420 M292 0 V420" />
        </g>
        <circle className={styles.ring} cx={W / 2} cy={H / 2} r={RING} />
      </svg>

      <span className={styles.you} style={{ left: '50%', top: '50%' }} aria-label="Search location" />

      {pharmacies.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className={`${styles.pin} ${p.id === focusedId ? styles.pinFocused : ''}`}
          style={position(p, radius)}
          aria-label={`${p.name}, ${formatDistance(p.distance)}`}
          onClick={(e) => {
            e.stopPropagation();
            onFocus(p.id);
          }}
        >
          <span>{i + 1}</span>
        </button>
      ))}

      <span className={`${styles.scale} t-label-bold`}>{radius} mi</span>

      {focused && (
        <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
          <GlassCard angle={161.79559775870828}>
            <div className={styles.sheetText}>
              <p className="t-body-bold">{focused.name}</p>
              <p className="t-body-small">
                {focused.address}, {focused.cityStateZip}
              </p>
              <p className={`${styles.sheetMeta} t-body-small`}>
                {formatDistance(focused.distance)} away · {focused.hours}
              </p>
            </div>
            <Button onClick={() => onSelect(focused.id)}>Select pharmacy</Button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
