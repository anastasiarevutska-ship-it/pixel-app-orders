import { useEffect, useState } from 'react';
import { formatAddressLines } from '../../data/patient';
import { formatDistance } from '../../data/pharmacies';
import { formatMoney } from '../../data/prescriptions';
import { entryStage, type PrototypeState } from '../../state/prescriptionJourney';
import { usePrototype } from '../../state/PrototypeContext';
import { Button, ButtonStack } from '../Button';
import { CardHeader } from '../CardHeader';
import { GlassCard } from '../GlassCard';
import { LabeledValue } from '../LabeledValue';
import { StatusLabel, type StatusTone } from '../StatusLabel';
import { CostBreakdown } from './CostBreakdown';
import styles from './PrescriptionCard.module.css';

type CardStage = 'priorAuth' | 'coverage' | 'address' | 'pharmacy' | 'complete';

const STATUS: Record<CardStage, { label: string; tone: StatusTone }> = {
  priorAuth: { label: 'Prior Authorization', tone: 'red' },
  coverage: { label: 'Coverage Approved', tone: 'yellow' },
  address: { label: 'Delivery Address', tone: 'violet' },
  pharmacy: { label: 'Choose Pharmacy', tone: 'violet' },
  complete: { label: 'Complete', tone: 'teal' },
};

function statusFor(state: PrototypeState, stage: CardStage) {
  if (stage === 'coverage' && !state.scenario.priorAuth) return { ...STATUS.coverage, label: 'Coverage Ready' };
  if (stage === 'complete' && state.scenario.fulfillment === 'pickup') return { ...STATUS.complete, label: 'Ready for Pickup' };
  return STATUS[stage];
}

function Address({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((l) => (
        <span key={l} className={styles.line}>
          {l}
        </span>
      ))}
    </>
  );
}

function statusMessage(state: PrototypeState): string {
  switch (state.stage) {
    case 'priorAuth':
      return 'This specialty medication needs Prior Authorization. We’ve already started it for you.';
    case 'coverage':
      if (state.payment === 'deferred') return 'Your payment is still pending.';
      return state.scenario.priorAuth
        ? 'Prior Authorization approved. Your coverage is ready.'
        : 'We’ve checked your benefits. Your coverage is ready.';
    case 'address':
      return state.payment === 'paid'
        ? 'Payment received. Confirm where we should deliver your medication.'
        : 'Your insurance covers the full cost. Confirm where we should deliver your medication.';
    case 'pharmacy':
      return state.payment === 'paid'
        ? 'Payment received. Choose the pharmacy where you’ll pick up your medication.'
        : 'Your insurance covers the full cost. Choose the pharmacy where you’ll pick up your medication.';
    default:
      return state.scenario.fulfillment === 'pickup'
        ? 'You’re all set. Your medication is ready for pickup.'
        : 'You’re all set. Nothing else is needed from you.';
  }
}

/**
 * Prescription journey card shared by Specialty, Mail and Retail. Composed from the card library:
 * glass card + Button_Icon header (Medications card), name + status Label
 * (Medications rows), label/value pairs (Upcoming event – open) and
 * stacked Primary/Secondary buttons (OTB / Upcoming event CTAs).
 */
export function PrescriptionCard() {
  const { state, dispatch } = usePrototype();
  const { scenario, stage } = state;
  // The "Ready for Pickup" card stays on Home as a reference, so it can collapse like the Medications card.
  const [expanded, setExpanded] = useState(true);
  useEffect(() => setExpanded(true), [stage]);
  const [showOthers, setShowOthers] = useState(false);
  useEffect(() => setShowOthers(false), [scenario.id]);
  const others = scenario.otherMedications ?? [];
  if (stage === 'none' || stage === 'handedOff') return null;

  const status = statusFor(state, stage);
  const { coverage } = scenario;
  const pickup = state.pickupPharmacy;
  const collapsible = stage === 'complete' && !!pickup;
  const collapsed = collapsible && !expanded;
  const receipt = state.payment === 'paid' && (
    <LabeledValue label="Paid with HealNow">
      {formatMoney(coverage.patientCost)} · Confirmation {state.paymentConfirmation}
    </LabeledValue>
  );
  // Mail/Retail enter at coverage or fulfillment, so that first card also shows the prescriber.
  const isEntryCard = !scenario.priorAuth && stage === entryStage(scenario) && state.payment !== 'deferred';

  return (
    <GlassCard angle={128.23550649877183}>
      <CardHeader
        icon="plusCircle"
        title="Prescription"
        titleStyle="library"
        {...(collapsible && { expanded, onToggle: () => setExpanded((e) => !e) })}
      />

      {collapsed && pickup ? (
        <div className={styles.body}>
          <div className={styles.nameRow}>
            <p className="t-body-bold">{scenario.medication.name}</p>
            <StatusLabel tone={status.tone}>{status.label}</StatusLabel>
          </div>
          <p className="t-body-bold">
            {pickup.name} | {formatDistance(pickup.distance)}
          </p>
        </div>
      ) : (
      <div className={styles.body}>
        {/* Home "MedicationDetails" pattern: bold name + regular detail, with the status Label. */}
        <div className={styles.medication}>
          <div className={styles.nameRow}>
            <div className={styles.nameGroup}>
              <p className="t-body-bold">{scenario.medication.name}</p>
              {others.length > 0 && (
                <button
                  type="button"
                  className={`${styles.moreMeds} t-label-bold pressable`}
                  aria-expanded={showOthers}
                  onClick={() => setShowOthers((v) => !v)}
                >
                  {showOthers ? 'Show less' : `+${others.length} meds`}
                </button>
              )}
            </div>
            <StatusLabel tone={status.tone}>{status.label}</StatusLabel>
          </div>
          <p className="t-body">{scenario.medication.detail}</p>
          {showOthers &&
            others.map((m) => (
              <div key={m.name} className={styles.otherMed}>
                <p className="t-body-bold">{m.name}</p>
                <p className="t-body">{m.detail}</p>
              </div>
            ))}
        </div>

        <p className="t-body">{statusMessage(state)}</p>

        {(stage === 'priorAuth' || isEntryCard) && (
          <LabeledValue label="Prescribed by">
            {scenario.prescriber.name}, {scenario.prescriber.role}
          </LabeledValue>
        )}
        {stage === 'priorAuth' && <LabeledValue label="Estimated time">{scenario.priorAuth?.estimate}</LabeledValue>}

        {stage === 'coverage' && <CostBreakdown coverage={coverage} />}

        {stage === 'address' && (
          <>
            <LabeledValue label="Deliver to" size="md">
              <Address lines={formatAddressLines(state.profile.deliveryAddress)} />
            </LabeledValue>
            {receipt}
          </>
        )}

        {stage === 'pharmacy' && (
          <>
            <LabeledValue label="Pickup" size="md">
              At a pharmacy near you
            </LabeledValue>
            {receipt}
          </>
        )}

        {stage === 'complete' && pickup && (
          <>
            <LabeledValue label="Pick up at" size="md">
              <Address lines={[pickup.name, pickup.address, pickup.cityStateZip]} />
              <a className={styles.phone} href={`tel:${pickup.phone.replace(/\D/g, '')}`}>
                {pickup.phone}
              </a>
            </LabeledValue>
            <LabeledValue label="Distance · Hours">
              {formatDistance(pickup.distance)} away · {pickup.hours}
            </LabeledValue>
            <LabeledValue label="What’s next">
              Your prescription is set up. Head to {pickup.name} to pick up your medication.
            </LabeledValue>
          </>
        )}

        {stage === 'complete' && state.orderAddress && (
          <>
            <LabeledValue label="Delivering to" size="md">
              <Address lines={formatAddressLines(state.orderAddress)} />
            </LabeledValue>
            <LabeledValue label="What’s next">
              {scenario.pharmacy} is preparing your order. We’ll notify you when there’s a delivery update.
            </LabeledValue>
          </>
        )}
      </div>
      )}

      {stage === 'coverage' && (
        <ButtonStack>
          <Button onClick={() => dispatch({ type: 'openPayment' })}>Pay {formatMoney(coverage.patientCost)}</Button>
          {scenario.allowPayLater && state.payment !== 'deferred' && (
            <Button variant="secondary" onClick={() => dispatch({ type: 'payLater' })}>
              Pay later
            </Button>
          )}
        </ButtonStack>
      )}

      {stage === 'address' && (
        <ButtonStack>
          <Button onClick={() => dispatch({ type: 'confirmAddress' })}>Confirm address</Button>
          <Button variant="secondary" onClick={() => dispatch({ type: 'openAddressForm' })}>
            Use a different address
          </Button>
        </ButtonStack>
      )}

      {stage === 'pharmacy' && <Button onClick={() => dispatch({ type: 'openPharmacyFinder' })}>Find a pharmacy</Button>}

      {stage === 'complete' && scenario.fulfillment === 'delivery' && <Button onClick={() => dispatch({ type: 'acknowledgeComplete' })}>Got it</Button>}
    </GlassCard>
  );
}
