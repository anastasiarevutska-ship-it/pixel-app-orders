import { usePrototype } from '../../state/PrototypeContext';
import { DeliveryCard } from '../DeliveryCard';
import { PrescriptionCard } from './PrescriptionCard';
import styles from './FulfillmentFeedItem.module.css';

/**
 * Home feed slot for fulfillment. While the prescription journey is active it
 * shows the Prescription card; once complete, the existing Delivery card
 * takes over the order.
 */
export function FulfillmentFeedItem() {
  const { state } = usePrototype();
  if (state.stage === 'none') return null;
  return (
    <div key={state.stage === 'handedOff' ? 'delivery' : 'prescription'} className={styles.enter}>
      {state.stage === 'handedOff' && state.scenario.delivery ? (
        <DeliveryCard when={state.scenario.delivery.estimate} summary={state.scenario.delivery.summary} />
      ) : (
        <PrescriptionCard />
      )}
    </div>
  );
}
