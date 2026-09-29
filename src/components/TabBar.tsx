import { tabs, type TabId } from '../data/navigation';
import { Icon } from './Icon';
import styles from './TabBar.module.css';

/** Figma component "Nav": Navbar (56px) + Home Indicator (iPhone) (34px). */
export function TabBar({ activeTab }: { activeTab: TabId }) {
  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={styles.navbar}>
        <ul className={styles.items}>
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <li key={tab.id} className={styles.item}>
                <button
                  type="button"
                  className={`${styles.tab} ${active ? styles.active : ''} pressable`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon name={tab.icon} />
                  <span className={styles.label}>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.homeIndicator}>
        <span />
      </div>
    </nav>
  );
}
