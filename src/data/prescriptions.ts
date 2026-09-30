/**
 * Mock prescription scenarios. Journey state lives in src/state; this file
 * only describes the prescription itself, so scenarios can be swapped easily.
 */
export type PrescriptionType = 'specialty' | 'mail' | 'retail';

/** How the patient receives the medication once paid for. */
export type Fulfillment = 'delivery' | 'pickup';

export type Coverage = {
  medicationCost: number;
  insuranceCovers: number;
  /** Patient responsibility. 0 skips the payment step. */
  patientCost: number;
};

export type Medication = { name: string; detail: string };

export type PrescriptionScenario = {
  id: string;
  /** Determines where the patient enters the shared journey (Specialty starts at Prior Authorization). */
  prescriptionType: PrescriptionType;
  /** Determines the fulfillment branch after coverage/payment. */
  fulfillment: Fulfillment;
  medication: Medication;
  /** Other medications on the same prescription (shown via "+N meds" on the card). */
  otherMedications?: Medication[];
  /** Phone is a fictional 555-01xx number. */
  prescriber: { name: string; role: string; phone: string };
  /** Only Specialty prescriptions need Prior Authorization. */
  priorAuth?: { estimate: string };
  pharmacy: string;
  coverage: Coverage;
  /** Whether the patient may defer the copay ("Pay later"). Only Retail allows it. */
  allowPayLater?: boolean;
  /** First Delivery-card state after a delivery journey completes (not used for pickup). */
  delivery?: { estimate: string; summary: string };
};

const specialtyBase: Omit<PrescriptionScenario, 'id' | 'coverage'> = {
  prescriptionType: 'specialty',
  fulfillment: 'delivery',
  medication: { name: 'Gonal-f RFF Redi-ject', detail: '900 IU · 1 pen' },
  otherMedications: [
    { name: 'Menopur', detail: '75 IU · 10 vials' },
    { name: 'Cetrotide', detail: '0.25mg · 5 syringes' },
    { name: 'Novarel', detail: '10,000 IU · 1 vial' },
  ],
  prescriber: { name: 'Dr. Emily Chen', role: 'Reproductive Endocrinologist', phone: '(614) 555-0127' },
  priorAuth: { estimate: 'Usually 2–3 days' },
  pharmacy: 'Pixel Specialty Pharmacy',
  delivery: { estimate: 'Friday, Sept. 29 | By 8:00pm', summary: '4 medication(s) are being prepared.' },
};

const mailBase: Omit<PrescriptionScenario, 'id' | 'coverage'> = {
  prescriptionType: 'mail',
  fulfillment: 'delivery',
  medication: { name: 'Progesterone', detail: '200mg · 30 capsules' },
  otherMedications: [
    { name: 'Estradiol', detail: '2mg · 30 tablets' },
    { name: 'Prenatal vitamin', detail: '1 tablet · 30 tablets' },
    { name: 'Aspirin', detail: '81mg · 30 tablets' },
  ],
  prescriber: { name: 'Dr. Emily Chen', role: 'Reproductive Endocrinologist', phone: '(614) 555-0127' },
  pharmacy: 'Pixel Mail Pharmacy',
  delivery: { estimate: 'Saturday, Sept. 30 | By 8:00pm', summary: '4 medication(s) are being prepared.' },
};

const retailBase: Omit<PrescriptionScenario, 'id' | 'coverage'> = {
  prescriptionType: 'retail',
  fulfillment: 'pickup',
  allowPayLater: true,
  medication: { name: 'Letrozole', detail: '2.5mg · 5 tablets' },
  otherMedications: [
    { name: 'Doxycycline', detail: '100mg · 10 capsules' },
    { name: 'Methylprednisolone', detail: '16mg · 4 tablets' },
    { name: 'Ondansetron', detail: '4mg · 6 tablets' },
  ],
  prescriber: { name: 'Dr. Emily Chen', role: 'Reproductive Endocrinologist', phone: '(614) 555-0127' },
  pharmacy: 'your pharmacy',
};

export const prescriptionScenarios = {
  specialty: {
    copay: { ...specialtyBase, id: 'specialty-copay', coverage: { medicationCost: 2184, insuranceCovers: 2109, patientCost: 75 } },
    zeroCopay: { ...specialtyBase, id: 'specialty-zero-copay', coverage: { medicationCost: 2184, insuranceCovers: 2184, patientCost: 0 } },
  },
  mail: {
    copay: { ...mailBase, id: 'mail-copay', coverage: { medicationCost: 96.4, insuranceCovers: 71.4, patientCost: 25 } },
    zeroCopay: { ...mailBase, id: 'mail-zero-copay', coverage: { medicationCost: 96.4, insuranceCovers: 96.4, patientCost: 0 } },
  },
  retail: {
    copay: { ...retailBase, id: 'retail-copay', coverage: { medicationCost: 38.2, insuranceCovers: 28.2, patientCost: 10 } },
    zeroCopay: { ...retailBase, id: 'retail-zero-copay', coverage: { medicationCost: 38.2, insuranceCovers: 38.2, patientCost: 0 } },
  },
} satisfies Record<PrescriptionType, Record<'copay' | 'zeroCopay', PrescriptionScenario>>;

export function formatMoney(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
