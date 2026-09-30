import styles from './StatusLabel.module.css';

export type StatusTone = 'neutral' | 'yellow' | 'red' | 'violet' | 'teal';

/** Figma "Label" chip (Medications card): Label (Bold) on a tinted 2px-radius fill. */
export function StatusLabel({ tone, children }: { tone: StatusTone; children: string }) {
  return <span className={`${styles.label} ${styles[tone]} t-label-bold`}>{children}</span>;
}
