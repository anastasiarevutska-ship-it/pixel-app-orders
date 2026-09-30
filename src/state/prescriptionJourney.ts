import { initialPatientProfile, type Address, type PatientProfile } from '../data/patient';
import {
  DEFAULT_RADIUS,
  findPharmacy,
  searchPharmacies,
  type Pharmacy,
  type Radius,
  type SearchLocation,
} from '../data/pharmacies';
import { prescriptionScenarios, type PrescriptionScenario } from '../data/prescriptions';

/**
 * Shared prescription journey (happy path). The prescription type decides the
 * entry point; its fulfillment decides the branch after coverage/payment:
 *
 *   Specialty: priorAuth → coverage* → address  → complete → handedOff (Delivery card)
 *              priorAuth → priorAuthDenied (patient is asked to contact the prescriber)
 *   Mail:                  coverage* → address  → complete → handedOff (Delivery card)
 *   Retail:                coverage* → pharmacy → complete (ready for pickup)
 *
 *   * coverage (payment) is skipped when patientCost is $0.
 */
export type PrescriptionStage =
  | 'none'
  | 'priorAuth'
  | 'priorAuthDenied'
  | 'coverage'
  | 'address'
  | 'pharmacy'
  | 'complete'
  | 'handedOff';

/** `deferred` = Retail "Pay later": the copay is paid at the pharmacy on pickup. */
export type PaymentStatus = 'notRequired' | 'unpaid' | 'deferred' | 'paid';

export type Overlay = 'none' | 'healnow' | 'addressForm' | 'pharmacyFinder';

export type ResultsView = 'list' | 'map';

/** Pharmacy Finder search, kept in state so it survives closing/reopening and List ↔ Map. */
export type PharmacySearch = {
  location?: SearchLocation;
  radius: Radius;
  view: ResultsView;
  /** Pharmacy highlighted in the list / map (map pin sheet). */
  focusedId?: string;
  /** Pharmacy awaiting confirmation (confirmation pop-up is open). */
  pendingId?: string;
};

export type PrototypeState = {
  scenario: PrescriptionScenario;
  stage: PrescriptionStage;
  payment: PaymentStatus;
  paymentConfirmation?: string;
  /** Delivery: address used for this order (set when the patient confirms/enters one). */
  orderAddress?: Address;
  /** Pickup: pharmacy confirmed for this order. */
  pickupPharmacy?: Pharmacy;
  pharmacySearch: PharmacySearch;
  profile: PatientProfile;
  overlay: Overlay;
};

/** Stage shortcuts for the prototype demo controls. */
export type DemoPreset =
  | 'none'
  | 'entry'
  | 'paDenied'
  | 'coverage'
  | 'fulfillment'
  | 'payAtPickup'
  | 'complete'
  | 'handedOff';

export type PrototypeAction =
  | { type: 'approvePriorAuth' }
  | { type: 'denyPriorAuth' }
  | { type: 'openPayment' }
  | { type: 'paymentSucceeded'; confirmation: string }
  | { type: 'payLater' }
  | { type: 'confirmAddress' }
  | { type: 'openAddressForm' }
  | { type: 'submitNewAddress'; address: Address }
  | { type: 'openPharmacyFinder' }
  | { type: 'setSearchLocation'; location: SearchLocation }
  | { type: 'setSearchRadius'; radius: Radius }
  | { type: 'setResultsView'; view: ResultsView }
  | { type: 'focusPharmacy'; id?: string }
  | { type: 'choosePharmacy'; id: string }
  | { type: 'chooseAnotherPharmacy' }
  | { type: 'confirmPharmacy' }
  | { type: 'acknowledgeComplete' }
  | { type: 'closeOverlay' }
  | { type: 'demoJump'; preset: DemoPreset }
  | { type: 'demoSetScenario'; scenario: PrescriptionScenario }
  | { type: 'reset' };

const requiresPayment = (s: PrototypeState) => s.scenario.coverage.patientCost > 0;

const initialSearch: PharmacySearch = { radius: DEFAULT_RADIUS, view: 'list' };

function initialPayment(scenario: PrescriptionScenario): PaymentStatus {
  return scenario.coverage.patientCost > 0 ? 'unpaid' : 'notRequired';
}

/** Fulfillment step after coverage/payment: delivery address or pickup pharmacy. */
export function fulfillmentStage(scenario: PrescriptionScenario): PrescriptionStage {
  return scenario.fulfillment === 'pickup' ? 'pharmacy' : 'address';
}

/** First stage the patient sees once Pixel detects the prescription. */
export function entryStage(scenario: PrescriptionScenario): PrescriptionStage {
  if (scenario.priorAuth) return 'priorAuth';
  return scenario.coverage.patientCost > 0 ? 'coverage' : fulfillmentStage(scenario);
}

export function createInitialState(
  scenario: PrescriptionScenario = prescriptionScenarios.specialty.copay,
  profile: PatientProfile = initialPatientProfile,
): PrototypeState {
  return {
    scenario,
    stage: entryStage(scenario),
    payment: initialPayment(scenario),
    pharmacySearch: initialSearch,
    profile,
    overlay: 'none',
  };
}

function jump(state: PrototypeState, preset: DemoPreset): PrototypeState {
  const base: PrototypeState = {
    ...state,
    overlay: 'none',
    payment: initialPayment(state.scenario),
    paymentConfirmation: undefined,
    orderAddress: undefined,
    pickupPharmacy: undefined,
    pharmacySearch: { ...state.pharmacySearch, pendingId: undefined },
  };
  const paid = requiresPayment(state)
    ? { payment: 'paid' as const, paymentConfirmation: 'HN-48213907' }
    : { payment: 'notRequired' as const };
  switch (preset) {
    case 'none':
      return { ...base, stage: 'none' };
    case 'entry':
      return { ...base, stage: entryStage(state.scenario) };
    case 'paDenied':
      return state.scenario.priorAuth ? { ...base, stage: 'priorAuthDenied' } : jump(state, 'entry');
    case 'coverage':
      if (!requiresPayment(state)) return { ...base, stage: fulfillmentStage(state.scenario) };
      return { ...base, stage: 'coverage', payment: 'unpaid' };
    case 'fulfillment':
      return { ...base, ...paid, stage: fulfillmentStage(state.scenario) };
    case 'payAtPickup':
      if (!requiresPayment(state) || !state.scenario.allowPayLater) return jump(state, 'fulfillment');
      return { ...base, stage: fulfillmentStage(state.scenario), payment: 'deferred' };
    case 'complete':
    case 'handedOff': {
      if (state.scenario.fulfillment === 'pickup') {
        // Pickup ends at "complete"; default to the nearest pharmacy for the current location.
        const location = state.pharmacySearch.location ?? { kind: 'current' as const };
        const [nearest] = searchPharmacies(location, state.pharmacySearch.radius);
        return { ...base, ...paid, stage: 'complete', pickupPharmacy: nearest };
      }
      return { ...base, ...paid, stage: preset, orderAddress: state.profile.deliveryAddress };
    }
  }
}

export function prototypeReducer(state: PrototypeState, action: PrototypeAction): PrototypeState {
  switch (action.type) {
    case 'approvePriorAuth':
      if (state.stage !== 'priorAuth') return state;
      // $0 copay skips the payment step entirely.
      return { ...state, stage: requiresPayment(state) ? 'coverage' : fulfillmentStage(state.scenario) };

    case 'denyPriorAuth':
      return state.stage === 'priorAuth' ? { ...state, stage: 'priorAuthDenied' } : state;

    case 'openPayment':
      return state.stage === 'coverage' ? { ...state, overlay: 'healnow' } : state;

    case 'paymentSucceeded':
      // The HealNow overlay stays open on its success screen until "Return to Pixel".
      return {
        ...state,
        payment: 'paid',
        paymentConfirmation: action.confirmation,
        stage: fulfillmentStage(state.scenario),
      };

    case 'payLater':
      // Retail: skip online payment and go straight to choosing a pharmacy; pay there on pickup.
      if (!state.scenario.allowPayLater || state.stage !== 'coverage') return state;
      return { ...state, payment: 'deferred', stage: fulfillmentStage(state.scenario), overlay: 'none' };

    // Delivery fulfillment (Specialty / Mail)
    case 'confirmAddress':
      return { ...state, orderAddress: state.profile.deliveryAddress, stage: 'complete' };

    case 'openAddressForm':
      return { ...state, overlay: 'addressForm' };

    case 'submitNewAddress':
      // Use it for this order and make it the saved profile address.
      return {
        ...state,
        profile: { ...state.profile, deliveryAddress: action.address },
        orderAddress: action.address,
        stage: 'complete',
        overlay: 'none',
      };

    // Pickup fulfillment (Retail)
    case 'openPharmacyFinder':
      return state.stage === 'pharmacy' ? { ...state, overlay: 'pharmacyFinder' } : state;

    case 'setSearchLocation':
      return {
        ...state,
        pharmacySearch: { ...state.pharmacySearch, location: action.location, focusedId: undefined, pendingId: undefined },
      };

    case 'setSearchRadius':
      return { ...state, pharmacySearch: { ...state.pharmacySearch, radius: action.radius } };

    case 'setResultsView':
      return { ...state, pharmacySearch: { ...state.pharmacySearch, view: action.view } };

    case 'focusPharmacy':
      return { ...state, pharmacySearch: { ...state.pharmacySearch, focusedId: action.id } };

    case 'choosePharmacy':
      return { ...state, pharmacySearch: { ...state.pharmacySearch, focusedId: action.id, pendingId: action.id } };

    case 'chooseAnotherPharmacy':
      return { ...state, pharmacySearch: { ...state.pharmacySearch, pendingId: undefined } };

    case 'confirmPharmacy': {
      const { location, pendingId } = state.pharmacySearch;
      const pharmacy = location && pendingId ? findPharmacy(location, pendingId) : undefined;
      if (!pharmacy) return state;
      return {
        ...state,
        pickupPharmacy: pharmacy,
        stage: 'complete',
        overlay: 'none',
        pharmacySearch: { ...state.pharmacySearch, pendingId: undefined },
      };
    }

    case 'acknowledgeComplete':
      return state.stage === 'complete' && state.scenario.fulfillment === 'delivery'
        ? { ...state, stage: 'handedOff' }
        : state;

    case 'closeOverlay':
      return { ...state, overlay: 'none', pharmacySearch: { ...state.pharmacySearch, pendingId: undefined } };

    case 'demoJump':
      return jump(state, action.preset);

    case 'demoSetScenario':
      // Picking a scenario (type or copay) restarts the journey at its entry point.
      return createInitialState(action.scenario, state.profile);

    case 'reset':
      return createInitialState(state.scenario);
  }
}
