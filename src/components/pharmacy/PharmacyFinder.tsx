import { useCallback, useState } from 'react';
import { brand } from '../../brand';
import { findPharmacy, locationLabel, searchPharmacies, type SearchLocation } from '../../data/pharmacies';
import { usePrototype } from '../../state/PrototypeContext';
import { IconButton } from '../IconButton';
import { LabeledValue } from '../LabeledValue';
import { SecondaryButton } from '../SecondaryButton';
import { ConfirmPharmacyDialog } from './ConfirmPharmacyDialog';
import { LocationPicker } from './LocationPicker';
import { PharmacyMap } from './PharmacyMap';
import { PharmacyRow } from './PharmacyRow';
import { RadiusDropdown } from './RadiusDropdown';
import { ViewToggle } from './ViewToggle';
import styles from './PharmacyFinder.module.css';

/**
 * Retail pickup: full-screen Pixel screen for finding a pharmacy. All search
 * state (location, radius, view, focus, pending choice) lives in the
 * prototype store, so List/Map and close/reopen share one search.
 */
export function PharmacyFinder() {
  const { state, dispatch } = usePrototype();
  const { location, radius, view, focusedId, pendingId } = state.pharmacySearch;
  const [editingLocation, setEditingLocation] = useState(false);

  const results = location ? searchPharmacies(location, radius) : [];
  const focusedInResults = results.some((p) => p.id === focusedId) ? focusedId : undefined;
  const pending = location && pendingId ? findPharmacy(location, pendingId) : undefined;

  const selectLocation = useCallback(
    (loc: SearchLocation) => {
      dispatch({ type: 'setSearchLocation', location: loc });
      setEditingLocation(false);
    },
    [dispatch],
  );

  return (
    <div className={styles.screen} role="dialog" aria-modal="true" aria-label="Find a pharmacy">
      <div className={styles.scroll}>
        <img className={styles.bg} src={brand.pharmacyBg ?? brand.bgGradient} alt="" />

        <header className={styles.header}>
          <IconButton
            icon="arrowRight"
            label="Back to Home"
            className={styles.back}
            onClick={() => dispatch({ type: 'closeOverlay' })}
          />
          <h1 className="t-h3-card">Find a Pharmacy</h1>
        </header>
        <p className={`${styles.intro} t-body`}>
          Choose where you’d like to pick up {state.scenario.medication.name}.
        </p>

        {!location || editingLocation ? (
          <LocationPicker
            initialZip={location?.kind === 'zip' ? location.zip : ''}
            onSelect={selectLocation}
            onCancel={location ? () => setEditingLocation(false) : undefined}
          />
        ) : (
          <>
            <div className={styles.searchArea}>
              <LabeledValue label="Pharmacies near" size="md">
                {locationLabel(location)}
              </LabeledValue>
              <SecondaryButton onClick={() => setEditingLocation(true)}>Change</SecondaryButton>
            </div>

            <div className={styles.controls}>
              <RadiusDropdown value={radius} onChange={(r) => dispatch({ type: 'setSearchRadius', radius: r })} />
              <ViewToggle value={view} onChange={(v) => dispatch({ type: 'setResultsView', view: v })} />
            </div>

            <h2 className={`${styles.count} t-h5`}>
              {results.length} {results.length === 1 ? 'Pharmacy' : 'Pharmacies'}
            </h2>

            {results.length === 0 ? (
              <p className="t-body-small">No pharmacies within {radius} miles. Try a larger search radius.</p>
            ) : view === 'list' ? (
              <div className={styles.list}>
                {results.map((p) => (
                  <PharmacyRow
                    key={p.id}
                    pharmacy={p}
                    focused={p.id === focusedInResults}
                    onSelect={() => dispatch({ type: 'choosePharmacy', id: p.id })}
                  />
                ))}
              </div>
            ) : (
              <PharmacyMap
                pharmacies={results}
                radius={radius}
                focusedId={focusedInResults}
                onFocus={(id) => dispatch({ type: 'focusPharmacy', id })}
                onSelect={(id) => dispatch({ type: 'choosePharmacy', id })}
              />
            )}
          </>
        )}
      </div>

      {pending && (
        <ConfirmPharmacyDialog
          pharmacy={pending}
          medication={state.scenario.medication.name}
          onConfirm={() => dispatch({ type: 'confirmPharmacy' })}
          onChooseAnother={() => dispatch({ type: 'chooseAnotherPharmacy' })}
        />
      )}
    </div>
  );
}
