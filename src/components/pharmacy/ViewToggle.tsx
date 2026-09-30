import type { ResultsView } from '../../state/prescriptionJourney';
import styles from './ViewToggle.module.css';

/** List / Map switch: TextField_Light frame with a Lavender (PrimaryButton fill) active segment. */
export function ViewToggle({ value, onChange }: { value: ResultsView; onChange: (v: ResultsView) => void }) {
  return (
    <div className={styles.toggle} role="tablist" aria-label="Results view">
      {(['list', 'map'] as const).map((v) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={v === value}
          className={`${styles.segment} ${v === value ? styles.active : ''} t-body-small-bold`}
          onClick={() => onChange(v)}
        >
          {v === 'list' ? 'List' : 'Map'}
        </button>
      ))}
    </div>
  );
}
