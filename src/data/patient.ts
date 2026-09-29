/** Mock patient profile used by the prescription journeys. */
export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export type PatientProfile = {
  deliveryAddress: Address;
};

export const initialPatientProfile: PatientProfile = {
  deliveryAddress: {
    line1: '1482 Hawthorne Ave',
    line2: 'Apt 3B',
    city: 'Columbus',
    state: 'OH',
    zip: '43215',
  },
};

export function formatAddressLines(a: Address): string[] {
  return [a.line2 ? `${a.line1}, ${a.line2}` : a.line1, `${a.city}, ${a.state} ${a.zip}`];
}
