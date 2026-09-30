import { useEffect, useState } from 'react';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import { formatMoney } from '../../data/prescriptions';
import { usePrototype } from '../../state/PrototypeContext';
import styles from './HealNowCheckout.module.css';

type Phase = 'form' | 'processing' | 'success';

const digits = (v: string, max: number) => v.replace(/\D/g, '').slice(0, max);
const formatCard = (v: string) => digits(v, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExpiry = (v: string) => {
  const d = digits(v, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M3 5h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h10.6a1.5 1.5 0 0 0 1.5-1.1L24 9H7.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="23" r="1.6" fill="currentColor" />
      <circle cx="20" cy="23" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h22M15 13h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Simulated HealNow checkout, modelled on the real HealNow payment page and
 * opened in an in-app browser sheet over Pixel. No real payment API; any
 * input (or none) succeeds.
 */
export function HealNowCheckout() {
  const { state, dispatch } = usePrototype();
  const [phase, setPhase] = useState<Phase>('form');
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '', zip: '', phone: '' });
  const [saveCard, setSaveCard] = useState(true);
  const amount = formatMoney(state.scenario.coverage.patientCost);

  useEffect(() => {
    if (phase !== 'processing') return;
    const t = window.setTimeout(() => {
      const confirmation = `HN-${Math.floor(10_000_000 + Math.random() * 89_999_999)}`;
      dispatch({ type: 'paymentSucceeded', confirmation });
      setPhase('success');
    }, 1600);
    return () => window.clearTimeout(t);
  }, [phase, dispatch]);

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const close = () => dispatch({ type: 'closeOverlay' });

  return (
    <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="HealNow secure checkout">
      {/* In-app browser chrome: HealNow opens outside Pixel's own UI. */}
      <div className={styles.browserBar}>
        <button type="button" className={styles.done} onClick={close}>
          {phase === 'success' ? 'Done' : 'Cancel'}
        </button>
        <span className={styles.site}>HealNow · Secure checkout</span>
        <span />
      </div>

      <div className={styles.page}>
        <div className={styles.topRow}>
          <span className={styles.cart}>
            <CartIcon />
            <span className={styles.badge}>1</span>
          </span>
        </div>

        {phase === 'success' ? (
          <div className={styles.success}>
            <span className={styles.check} aria-hidden="true" />
            <h2>Payment successful</h2>
            <p>
              {amount} paid · Confirmation {state.paymentConfirmation}
            </p>
            <button type="button" className={styles.pay} onClick={close}>
              Return to Pixel
            </button>
          </div>
        ) : (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              setPhase('processing');
            }}
          >
            <p className={styles.caption}>Enter your card information</p>
            <div className={styles.cardGroup}>
              <label className={`${styles.cell} ${styles.floating}`}>
                <span>Cardholder Name</span>
                <input
                  value={form.name}
                  autoComplete="cc-name"
                  onChange={(e) => set('name', e.target.value)}
                />
              </label>
              <label className={`${styles.cell} ${styles.withIcon}`}>
                <input
                  placeholder="Card Number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.card}
                  onChange={(e) => set('card', formatCard(e.target.value))}
                />
                <CardIcon />
              </label>
              <div className={styles.row}>
                <input
                  className={styles.cell}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={form.expiry}
                  onChange={(e) => set('expiry', formatExpiry(e.target.value))}
                />
                <input
                  className={styles.cell}
                  placeholder="CVV"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={form.cvv}
                  onChange={(e) => set('cvv', digits(e.target.value, 4))}
                />
                <input
                  className={styles.cell}
                  placeholder="ZIP"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(e) => set('zip', digits(e.target.value, 5))}
                />
              </div>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
              <span>Save card for future use</span>
            </label>

            <label className={styles.caption} htmlFor="hn-phone">
              Mobile phone
            </label>
            <div className={styles.field}>
              <span className={styles.prefix}>+1</span>
              <input
                id="hn-phone"
                inputMode="tel"
                autoComplete="tel-national"
                value={form.phone}
                onChange={(e) => set('phone', digits(e.target.value, 10))}
              />
            </div>

            <label className={styles.caption} htmlFor="hn-email">
              Email
            </label>
            <div className={styles.field}>
              <input id="hn-email" className={styles.filled} defaultValue={state.profile.email} autoComplete="email" />
            </div>

            <button type="submit" className={styles.pay} disabled={phase === 'processing'}>
              {phase === 'processing' ? <span className={styles.spinner} aria-label="Processing" /> : `Pay ${amount}`}
            </button>

            <hr className={styles.divider} />
            <p className={styles.note}>Please pay for your medication.</p>
          </form>
        )}
      </div>
    </div>
  );
}
