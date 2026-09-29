import type { NextDose } from '../data/home';
import { CardHeader } from './CardHeader';
import { GlassCard } from './GlassCard';
import { IconButton } from './IconButton';
import { MedicationDetails } from './MedicationDetails';
import styles from './NextDoseCard.module.css';

/** Figma component "Cards". */
export function NextDoseCard({ dose }: { dose: NextDose }) {
  return (
    <GlassCard angle={162.758760785285}>
      <CardHeader title={`Next Dose @ ${dose.time}`} />
      <div className={styles.row}>
        <MedicationDetails name={dose.medication} detail={dose.dosage} />
        <IconButton icon="chevronDown" variant="navy" label="Show dose details" />
      </div>
    </GlassCard>
  );
}
