import type { LabTest } from '../data/home';
import { CardHeader } from './CardHeader';
import { MedicationDetails } from './MedicationDetails';
import styles from './LabTestCard.module.css';

/** Figma component "LabTest" (Yellow 40 fill, no glass). */
export function LabTestCard({ labTest }: { labTest: LabTest }) {
  return (
    <section className={styles.card}>
      <CardHeader icon="chart" title={labTest.title} />
      <MedicationDetails name={labTest.dateTime} detail={labTest.location} gap={6} />
    </section>
  );
}
