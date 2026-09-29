import { formatDistance, type Pharmacy } from '../../data/pharmacies';
import { Button, ButtonStack } from '../Button';
import { LabeledValue } from '../LabeledValue';
import { PopupDialog } from '../PopupDialog';
import styles from './ConfirmPharmacyDialog.module.css';

type ConfirmPharmacyDialogProps = {
  pharmacy: Pharmacy;
  medication: string;
  onConfirm: () => void;
  onChooseAnother: () => void;
};

/** Pickup confirmation on the Notification_PopUp pattern. */
export function ConfirmPharmacyDialog({ pharmacy, medication, onConfirm, onChooseAnother }: ConfirmPharmacyDialogProps) {
  return (
    <PopupDialog title="Confirm Pharmacy" subtitle={`Pick up ${medication} here?`} onDismiss={onChooseAnother}>
      <div className={styles.details}>
        <LabeledValue label="Pharmacy" size="md">
          {pharmacy.name}
        </LabeledValue>
        <LabeledValue label="Address">
          {pharmacy.address}, {pharmacy.cityStateZip}
        </LabeledValue>
        <LabeledValue label="Distance · Hours">
          {formatDistance(pharmacy.distance)} away · {pharmacy.hours}
        </LabeledValue>
      </div>
      <ButtonStack>
        <Button onClick={onConfirm}>Confirm pharmacy</Button>
        <Button variant="secondary" onClick={onChooseAnother}>
          Choose another pharmacy
        </Button>
      </ButtonStack>
    </PopupDialog>
  );
}
