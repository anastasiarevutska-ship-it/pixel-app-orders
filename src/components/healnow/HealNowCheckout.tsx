import { useEffect, useState } from 'react';
import { formatMoney } from '../../data/prescriptions';
import { usePrototype } from '../../state/PrototypeContext';
import styles from './HealNowCheckout.module.css';

/** Saved payment methods — prototype mock values only (no real card data). */
const METHODS = [
  { id: 'visa', label: 'Visa •••• 4242', detail: 'Expires 08/28' },
  { id: 'hsa', label: 'HSA card •••• 1180', detail: 'Health savings account' },
];

type Phase = 'review' | 'processing' | 'success';

/**
 * Simulated HealNow checkout. Presented as a third-party sheet over Pixel
 * (own header + brand accent) so it reads as a hand-off; no real payment API.
 */
export function HealNowCheckout() {
  const { state, dispatch } = usePrototype();
  const [phase, setPhase] = useState<Phase>('review');
  const [method, setMethod] = useState(METHODS[0].id);
  const { scenario } = state;
  const amount = formatMoney(scenario.coverage.patientCost);

  useEffect(() => {
    if (phase !== 'processing') return;
    const t = window.setTimeout(() => {
      const confirmation = `HN-${Math.floor(10_000_000 + Math.random() * 89_999_999)}`;
      dispatch({ type: 'paymentSucceeded', confirmation });
      setPhase('success');
    }, 1600);
    return () => window.clearTimeout(t);
  }, [phase, dispatch]);

  const close = () => dispatch({ type: 'closeOverlay' });
  const chosen = METHODS.find((m) => m.id === method)!;

  return (
    <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="HealNow secure checkout">
      <header className={styles.header}>
        {phase === 'review' ? (
          <button type="button" className={styles.cancel} onClick={close}>
            Cancel
          </button>
        ) : (
          <span />
        )}
        <span className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Heal<b>Now</b>
          </span>
        </span>
        <span className={styles.secure}>Secure</span>
      </header>
      <p className={styles.handoff}>You’re paying through HealNow on behalf of Pixel</p>

      {phase !== 'success' ? (
        <div className={styles.body}>
          <section className={styles.amount}>
            <p className={styles.caption}>Amount due</p>
            <p className={styles.total}>{amount}</p>
            <p className={styles.caption}>
              {scenario.medication.name} · Specialty copay
              <br />
              Paid to {scenario.pharmacy}
            </p>
          </section>

          <section className={styles.methods}>
            <p className={styles.sectionTitle}>Payment method</p>
            {METHODS.map((m) => (
              <label key={m.id} className={`${styles.method} ${m.id === method ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={m.id === method}
                  disabled={phase === 'processing'}
                  onChange={() => setMethod(m.id)}
                />
                <span>
                  <span className={styles.methodLabel}>{m.label}</span>
                  <span className={styles.methodDetail}>{m.detail}</span>
                </span>
              </label>
            ))}
          </section>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.pay}
              disabled={phase === 'processing'}
              onClick={() => setPhase('processing')}
            >
              {phase === 'processing' ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> Processing…
                </>
              ) : (
                `Pay ${amount}`
              )}
            </button>
            <p className={styles.legal}>Payments are processed securely by HealNow. Pixel never stores your card details.</p>
          </div>
        </div>
      ) : (
        <div className={`${styles.body} ${styles.done}`}>
          <span className={styles.check} aria-hidden="true" />
          <p className={styles.doneTitle}>Payment complete</p>
          <p className={styles.caption}>
            {amount} paid with {chosen.label}
            <br />
            Confirmation {state.paymentConfirmation}
          </p>
          <div className={styles.footer}>
            <button type="button" className={styles.pay} onClick={close}>
              Return to Pixel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
