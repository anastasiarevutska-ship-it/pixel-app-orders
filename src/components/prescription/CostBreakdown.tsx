import { formatMoney, type Coverage } from '../../data/prescriptions';
import styles from './CostBreakdown.module.css';

/**
 * Cost summary. Composed from existing pieces: Lavender 20 inset panel
 * (ArticleCard fill + 8px radius), Body Small rows, Lavender divider
 * (pop-up "Line 2") and a Body (Bold) total.
 */
export function CostBreakdown({ coverage }: { coverage: Coverage }) {
  return (
    <dl className={styles.panel}>
      <div className={`${styles.row} t-body-small`}>
        <dt>Medication cost</dt>
        <dd>{formatMoney(coverage.medicationCost)}</dd>
      </div>
      <div className={`${styles.row} t-body-small`}>
        <dt>Insurance covers</dt>
        <dd>−{formatMoney(coverage.insuranceCovers)}</dd>
      </div>
      <div className={styles.divider} />
      <div className={`${styles.row} t-body-bold`}>
        <dt>Your cost</dt>
        <dd>{formatMoney(coverage.patientCost)}</dd>
      </div>
    </dl>
  );
}
