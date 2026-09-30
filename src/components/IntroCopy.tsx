import type { TreatmentProgress } from '../data/home';
import styles from './IntroCopy.module.css';

export function IntroCopy({ progress }: { progress: TreatmentProgress }) {
  return (
    <section className={styles.intro}>
      <div className={styles.heading}>
        <h1 className={`${styles.day} t-display`}>Day {progress.day}</h1>
        <p className={`${styles.treatment} t-h4`}>of {progress.treatmentName}</p>
      </div>
      <p className={`${styles.message} t-h4`}>{progress.message}</p>
    </section>
  );
}
