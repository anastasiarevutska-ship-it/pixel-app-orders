import defaultFirst from '../assets/figma/progress-first.svg';
import defaultLast from '../assets/figma/progress-last.svg';
import defaultMiddle from '../assets/figma/progress-middle.svg';
import skipMark from '../assets/figma/schedule-skip-mark.svg';
import { brand } from '../brand';
import type { ScheduleEntry, TodaySchedule } from '../data/home';
import { GlassCard } from './GlassCard';
import { MedicationDetails } from './MedicationDetails';
import styles from './ScheduleCard.module.css';

/**
 * ProgressBar variants exported from Figma:
 *  - first:  filled Lavender box with check, connector below
 *  - middle: outlined box, connector above and below
 *  - last:   outlined box, connector above
 * A skipped entry overlays the ✕ mark on the box.
 */
function progressAsset(index: number, count: number) {
  if (index === 0) return brand.icons.progressFirst ?? defaultFirst;
  if (index === count - 1) return brand.icons.progressLast ?? defaultLast;
  return brand.icons.progressMiddle ?? defaultMiddle;
}

function ScheduleItem({ entry, index, count }: { entry: ScheduleEntry; index: number; count: number }) {
  return (
    <li className={styles.item}>
      <span className={styles.progress}>
        <img src={progressAsset(index, count)} alt="" />
        {entry.status === 'skipped' && <img className={styles.skip} src={skipMark} alt="" />}
      </span>
      <MedicationDetails name={entry.medication} detail={entry.dosage} />
      <p className={`${styles.time} t-body-bold`}>{entry.time}</p>
    </li>
  );
}

/** Figma frame "ScheduleCard". */
export function ScheduleCard({ schedule }: { schedule: TodaySchedule }) {
  return (
    <GlassCard angle={140.57394782037716} radius="md">
      <div className={styles.header}>
        <span className={`${styles.eyebrow} t-label-bold`}>{schedule.eyebrow}</span>
        <h3 className="t-h3">{schedule.date}</h3>
      </div>
      <ul className={styles.list}>
        {schedule.entries.map((entry, i) => (
          <ScheduleItem key={entry.medication} entry={entry} index={i} count={schedule.entries.length} />
        ))}
      </ul>
    </GlassCard>
  );
}
