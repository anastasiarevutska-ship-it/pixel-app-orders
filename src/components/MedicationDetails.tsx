import styles from './MedicationDetails.module.css';

type MedicationDetailsProps = {
  name: string;
  detail?: string;
  /** Vertical gap between lines (LabTest uses 6px). */
  gap?: number;
};

/** "MedicationDetails": bold primary line + regular secondary line, Navy 80. */
export function MedicationDetails({ name, detail, gap = 0 }: MedicationDetailsProps) {
  return (
    <div className={styles.details} style={{ gap }}>
      <p className="t-body-bold">{name}</p>
      {detail && <p className="t-body">{detail}</p>}
    </div>
  );
}
