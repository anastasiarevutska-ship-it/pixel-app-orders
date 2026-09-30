import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

type PhoneFrameProps = {
  children: ReactNode;
  /** Pinned to the bottom of the viewport (tab bar). */
  overlay?: ReactNode;
  /** Modals / sheets rendered above everything inside the phone. */
  modal?: ReactNode;
  /** Prototype-only content shown beside the phone on large screens. */
  aside?: ReactNode;
};

/**
 * Mobile viewport. On phones it fills the screen; on larger browsers it is a
 * 390×844 device centred on the page. `overlay` (the tab bar) is pinned to the
 * bottom of the viewport while `children` scroll underneath it.
 */
export function PhoneFrame({ children, overlay, modal, aside }: PhoneFrameProps) {
  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <div className={styles.scroller}>{children}</div>
        {overlay}
        {modal}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}
