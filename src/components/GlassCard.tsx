import type { ReactNode } from 'react';
import styles from './GlassCard.module.css';

type GlassCardProps = {
  children: ReactNode;
  /** Gradient angle as exported from Figma (varies per card). */
  angle: number;
  radius?: 'md' | 'lg';
};

/** Card using the Figma "Glass Morphism" fill + stroke styles. */
export function GlassCard({ children, angle, radius = 'lg' }: GlassCardProps) {
  return (
    <section
      className={`${styles.card} ${radius === 'md' ? styles.radiusMd : styles.radiusLg}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, var(--glass-fill-from) 9.3268%, var(--glass-fill-to) 89.968%)`,
      }}
    >
      {children}
    </section>
  );
}
