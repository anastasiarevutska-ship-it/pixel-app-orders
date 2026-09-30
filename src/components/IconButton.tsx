import { Icon, type IconName } from './Icon';
import styles from './IconButton.module.css';

type IconButtonProps = {
  icon: IconName;
  /** `lavender` = Button_Icon / ButtonIconSmall, `navy` = ButtonIcon. */
  variant?: 'lavender' | 'navy';
  /** `md` = 40×40 (8px padding, 8px radius), `sm` = 24×24 (4px radius). */
  size?: 'md' | 'sm';
  /** Accessible label; omit to render a purely decorative badge. */
  label?: string;
  onClick?: () => void;
  className?: string;
};

export function IconButton({ icon, variant = 'lavender', size = 'md', label, onClick, className: extra }: IconButtonProps) {
  const className = `${styles.root} ${styles[variant]} ${styles[size]} ${extra ?? ''}`;
  if (!label) {
    return (
      <span className={className}>
        <Icon name={icon} />
      </span>
    );
  }
  return (
    <button type="button" className={`${className} pressable`} aria-label={label} onClick={onClick}>
      <Icon name={icon} />
    </button>
  );
}
