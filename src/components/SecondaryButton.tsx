import { IconButton } from './IconButton';
import styles from './SecondaryButton.module.css';

/** Figma component "SecondaryButton": label + ButtonIconSmall with arrow. */
export function SecondaryButton({ children, onClick }: { children: string; onClick?: () => void }) {
  return (
    <button type="button" className={`${styles.button} pressable`} onClick={onClick}>
      <span className="t-body-bold">{children}</span>
      <IconButton icon="arrowRight" size="sm" />
    </button>
  );
}
