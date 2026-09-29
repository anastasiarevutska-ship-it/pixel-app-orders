import { useState } from 'react';
import { formatAddressLines } from '../data/patient';
import { formatMoney, prescriptionScenarios, type PrescriptionType } from '../data/prescriptions';
import { entryStage, type DemoPreset, type PrototypeState } from '../state/prescriptionJourney';
import { usePrototype } from '../state/PrototypeContext';
import styles from './DemoControls.module.css';

const TYPE_LABELS = {
  specialty: 'Specialty',
  mail: 'Mail',
  retail: 'Retail',
} as const;

type PresetDef = {
  id: DemoPreset;
  label: string;
  pickupLabel?: string;
  hidden?: 'pickup' | 'noPriorAuth';
};

const PRESETS: PresetDef[] = [
  { id: 'none', label: 'No prescription' },
  // `entry` jumps to the scenario's first stage (Prior Authorization for Specialty).
  {
    id: 'entry',
    label: '1 · Prior Authorization in progress',
    hidden: 'noPriorAuth',
  },
  { id: 'coverage', label: '2 · Coverage ready — payment due' },
  { id: 'coverageDeferred', label: '2b · Payment deferred (Pay later)' },
  {
    id: 'fulfillment',
    label: '3 · Confirm delivery address',
    pickupLabel: '3 · Choose pickup pharmacy',
  },
  {
    id: 'complete',
    label: '4 · Success',
    pickupLabel: '4 · Success — ready for pickup',
  },
  {
    id: 'handedOff',
    label: '5 · Handed off to Delivery card',
    hidden: 'pickup',
  },
];

function currentPreset(state: PrototypeState): DemoPreset | undefined {
  const { stage, payment } = state;
  if (stage === 'none') return 'none';
  if (stage === 'priorAuth') return 'entry';
  if (stage === 'coverage') return payment === 'deferred' ? 'coverageDeferred' : 'coverage';
  if (stage === 'address' || stage === 'pharmacy') return 'fulfillment';
  return stage;
}

/** Prototype-only presenter controls. Rendered outside the phone; not Pixel UI. */
export function DemoControls() {
  const { state, dispatch } = usePrototype();
  const [open, setOpen] = useState(false);
  const type = state.scenario.prescriptionType;
  const zeroCopay = state.scenario.coverage.patientCost === 0;
  const isSpecialty = type === 'specialty';
  const pickup = state.scenario.fulfillment === 'pickup';
  const active = currentPreset(state);
  const presets = PRESETS.filter(
    (p) =>
      !(p.hidden === 'pickup' && pickup) && !(p.hidden === 'noPriorAuth' && entryStage(state.scenario) !== 'priorAuth'),
  );

  return (
    <div className={styles.dock}>
      {open && (
        <aside id="demo-panel" className={styles.panel} aria-label="Prototype demo controls">
          <header className={styles.header}>
            <span className={styles.badge}>Prototype</span>
            <h2>Demo controls</h2>
            <p>Not part of the Pixel app.</p>
          </header>

          <section>
            <h3>Prescription type</h3>
            <div className={`${styles.segmented} ${styles.spaced}`}>
              {(Object.keys(prescriptionScenarios) as PrescriptionType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={t === type ? styles.active : ''}
                  onClick={() =>
                    dispatch({
                      type: 'demoSetScenario',
                      scenario: prescriptionScenarios[t].copay,
                    })
                  }
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
            {isSpecialty && (
              <button
                type="button"
                className={styles.primary}
                disabled={state.stage !== 'priorAuth'}
                onClick={() => dispatch({ type: 'approvePriorAuth' })}
              >
                Simulate PA approval
              </button>
            )}
            <div className={styles.list}>
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.option} ${p.id === active ? styles.active : ''}`}
                  disabled={zeroCopay && p.id.startsWith('coverage')}
                  onClick={() => dispatch({ type: 'demoJump', preset: p.id })}
                >
                  {pickup && p.pickupLabel ? p.pickupLabel : p.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Patient cost</h3>
            <div className={styles.segmented}>
              {[prescriptionScenarios[type].copay, prescriptionScenarios[type].zeroCopay].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={s.id === state.scenario.id ? styles.active : ''}
                  onClick={() => dispatch({ type: 'demoSetScenario', scenario: s })}
                >
                  {s.coverage.patientCost === 0 ? '$0 copay' : `${formatMoney(s.coverage.patientCost)} copay`}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.readout}>
            <h3>State</h3>
            <dl>
              <dt>Stage</dt>
              <dd>{state.stage}</dd>
              <dt>Payment</dt>
              <dd>{state.payment}</dd>
              {pickup ? (
                <>
                  <dt>Search</dt>
                  <dd>
                    {state.pharmacySearch.location
                      ? `${state.pharmacySearch.location.kind === 'zip' ? state.pharmacySearch.location.zip : 'current'} · ${state.pharmacySearch.radius} mi · ${state.pharmacySearch.view}`
                      : '—'}
                  </dd>
                  <dt>Pharmacy</dt>
                  <dd>{state.pickupPharmacy?.name ?? '—'}</dd>
                </>
              ) : (
                <>
                  <dt>Saved address</dt>
                  <dd>{formatAddressLines(state.profile.deliveryAddress).join(', ')}</dd>
                </>
              )}
            </dl>
          </section>

          <button type="button" className={styles.reset} onClick={() => dispatch({ type: 'reset' })}>
            Reset journey
          </button>
        </aside>
      )}
      <button
        type="button"
        className={styles.fab}
        aria-expanded={open}
        aria-controls="demo-panel"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close demo' : 'Demo controls'}
      </button>
    </div>
  );
}
