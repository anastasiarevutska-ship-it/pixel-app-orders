import type { OtbCall } from '../data/home';
import { CardHeader } from './CardHeader';
import { GlassCard } from './GlassCard';
import { MedicationDetails } from './MedicationDetails';

/** Figma frame "OTB". */
export function OtbCallCard({ call }: { call: OtbCall }) {
  return (
    <GlassCard angle={165.4585705800812}>
      <CardHeader icon="otbLogo" title={call.title} actionLabel="Show call details" />
      <MedicationDetails name={`${call.time} | ${call.provider}`} />
    </GlassCard>
  );
}
