import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { createInitialState, prototypeReducer, type PrototypeAction, type PrototypeState } from './prescriptionJourney';

type PrototypeContextValue = { state: PrototypeState; dispatch: Dispatch<PrototypeAction> };

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

/** In-memory prototype state (no persistence — reload resets the demo). */
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(prototypeReducer, undefined, () => createInitialState());
  return <PrototypeContext.Provider value={{ state, dispatch }}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) throw new Error('usePrototype must be used inside <PrototypeProvider>');
  return ctx;
}
