import { useState } from 'react';
import type { Address } from '../../data/patient';
import { usePrototype } from '../../state/PrototypeContext';
import { Button } from '../Button';
import { PopupDialog } from '../PopupDialog';
import { TextFieldGroup } from '../TextFieldGroup';
import styles from './AddressDialog.module.css';

const EMPTY = { line1: '', line2: '', city: '', state: '', zip: '' };

/** New delivery address, built on the Notification_PopUp + TextField_Light pattern. */
export function AddressDialog() {
  const { dispatch } = usePrototype();
  const [form, setForm] = useState(EMPTY);

  const valid =
    form.line1.trim() !== '' &&
    form.city.trim() !== '' &&
    /^[A-Za-z]{2}$/.test(form.state.trim()) &&
    /^\d{5}$/.test(form.zip.trim());

  const close = () => dispatch({ type: 'closeOverlay' });

  const save = () => {
    const address: Address = {
      line1: form.line1.trim(),
      line2: form.line2.trim() || undefined,
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      zip: form.zip.trim(),
    };
    dispatch({ type: 'submitNewAddress', address });
  };

  return (
    <PopupDialog title="Delivery Address" subtitle="Enter a new address below" onDismiss={close}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) save();
        }}
      >
        <TextFieldGroup
          onChange={(name, value) => setForm((f) => ({ ...f, [name]: value }))}
          fields={[
            { name: 'line1', placeholder: 'Street address', value: form.line1, autoComplete: 'address-line1' },
            { name: 'line2', placeholder: 'Apt, suite (optional)', value: form.line2, autoComplete: 'address-line2' },
            { name: 'city', placeholder: 'City', value: form.city, autoComplete: 'address-level2' },
            { name: 'state', placeholder: 'State (e.g. OH)', value: form.state, autoComplete: 'address-level1', maxLength: 2 },
            { name: 'zip', placeholder: 'ZIP code', value: form.zip, autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5 },
          ]}
        />
        <p className={`${styles.note} t-body-small`}>This will also become your saved delivery address.</p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={!valid}>
            Save
          </Button>
        </div>
      </form>
    </PopupDialog>
  );
}
