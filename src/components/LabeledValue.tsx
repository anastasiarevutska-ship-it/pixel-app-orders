import type { ReactNode } from 'react';
import styles from './LabeledValue.module.css';

type LabeledValueProps = {
  label: string;
  children: ReactNode;
  /**
   * `md` = Body Small label over Body (Bold) value, 6px gap ("Event type").
   * `sm` = Body Small label over Body Small (Bold) value, 4px gap ("Organizer").
   */
  size?: 'md' | 'sm';
};

/** Label/value pair from the "Upcoming event – open" card. */
export function LabeledValue({ label, children, size = 'sm' }: LabeledValueProps) {
  return (
    <div className={`${styles.pair} ${size === 'md' ? styles.md : styles.sm}`}>
      <p className="t-body-small">{label}</p>
      <div className={size === 'md' ? 't-body-bold' : 't-body-small-bold'}>{children}</div>
    </div>
  );
}
