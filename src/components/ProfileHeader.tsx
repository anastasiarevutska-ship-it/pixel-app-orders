import type { Patient } from '../data/home';
import styles from './ProfileHeader.module.css';

export function ProfileHeader({ patient }: { patient: Patient }) {
  return (
    <header className={styles.profile}>
      <div className={styles.avatar}>
        <img src={patient.photo} alt="" />
      </div>
      <div className={styles.greeting}>
        <p className="t-body">Welcome back,</p>
        <p className="t-body-bold">{patient.firstName}!</p>
      </div>
    </header>
  );
}
