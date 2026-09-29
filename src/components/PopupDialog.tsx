import { useEffect, type ReactNode } from 'react';
import styles from './PopupDialog.module.css';

type PopupDialogProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onDismiss: () => void;
};

/**
 * Figma "Notification_PopUp": Gray 20 panel, 8px radius, centred Body (Bold)
 * title + Body subtitle, 32px gaps. Shown over a scrim inside the phone.
 */
export function PopupDialog({ title, subtitle, children, onDismiss }: PopupDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDismiss();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDismiss]);

  return (
    <div className={styles.scrim} onClick={onDismiss}>
      <div
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.heading}>
          <p className="t-body-bold">{title}</p>
          {subtitle && <p className="t-body">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
