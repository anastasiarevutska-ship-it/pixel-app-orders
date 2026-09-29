import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** `primary` = Lavender fill, `secondary` = 1.5px Lavender outline (Figma PrimaryButton / SecondaryButton). */
  variant?: 'primary' | 'secondary';
};

/** Full-width 48px CTA from the Pixel card library (OTB, Upcoming event, pop-ups). */
export function Button({ variant = 'primary', className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]} t-body-bold pressable ${className ?? ''}`} {...rest} />
  );
}

/** Vertical CTA stack (Figma "CTAs": 16px gap). */
export function ButtonStack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>;
}
