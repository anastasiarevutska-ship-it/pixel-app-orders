import { CardHeader } from './CardHeader';
import { GlassCard } from './GlassCard';
import { MedicationDetails } from './MedicationDetails';

type DeliveryCardProps = { when: string; summary: string };

/** Existing Pixel "Delivery" card (card library node 16948:94857), unchanged. */
export function DeliveryCard({ when, summary }: DeliveryCardProps) {
  return (
    <GlassCard angle={161.79559775870828}>
      <CardHeader icon="truck" title="Delivery" titleStyle="library" />
      <MedicationDetails name={when} detail={summary} gap={6} />
    </GlassCard>
  );
}
