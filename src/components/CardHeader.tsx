import type { ReactNode } from 'react';
import type { IconName } from './Icon';
import { IconButton } from './IconButton';
import styles from './CardHeader.module.css';

type CardHeaderProps = {
  title: ReactNode;
  /** Leading lavender icon badge (Button_Icon). */
  icon?: IconName;
  /** Trailing navy action button (ButtonIcon with Chevron_Down_Small). */
  actionLabel?: string;
  /** Makes the card collapsible with the navy chevron ButtonIcon (Medications / OTB cards). */
  expanded?: boolean;
  onToggle?: () => void;
  /** `home` = H3 28/38 (Home frame cards), `library` = H3 22/1.2 (card library). */
  titleStyle?: 'home' | 'library';
};

export function CardHeader({ title, icon, actionLabel, expanded, onToggle, titleStyle = 'home' }: CardHeaderProps) {
  return (
    <div className={styles.row}>
      {icon && <IconButton icon={icon} />}
      <h3 className={`${styles.title} ${titleStyle === 'home' ? 't-h3' : 't-h3-card'}`}>{title}</h3>
      {actionLabel && <IconButton icon="chevronDown" variant="navy" label={actionLabel} />}
      {onToggle && (
        <IconButton
          icon={expanded ? 'chevronUpLight' : 'chevronDown'}
          variant="navy"
          label={expanded ? 'Collapse' : 'Expand'}
          onClick={onToggle}
        />
      )}
    </div>
  );
}
