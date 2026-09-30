import { useState } from 'react';
import { RADIUS_OPTIONS, type Radius } from '../../data/pharmacies';
import { Icon } from '../Icon';
import styles from './RadiusDropdown.module.css';

/** Search radius, using the TextField_Light dropdown from "Change Reminder Time". */
export function RadiusDropdown({ value, onChange }: { value: Radius; onChange: (r: Radius) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.root}>
      <button
        type="button"
        className={`${styles.field} ${styles.trigger} ${open ? styles.open : ''} t-body`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>Within {value} miles</span>
        <span className={open ? '' : styles.flip}>
          <Icon name="chevronUp" />
        </span>
      </button>
      {open && (
        <ul className={styles.options} role="listbox">
          {RADIUS_OPTIONS.map((r) => (
            <li key={r}>
              <button
                type="button"
                role="option"
                aria-selected={r === value}
                className={`${styles.field} ${r === value ? styles.selected : ''} t-body`}
                onClick={() => {
                  onChange(r);
                  setOpen(false);
                }}
              >
                {r} miles
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
