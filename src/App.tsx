import { AddressDialog } from './components/prescription/AddressDialog';
import { HealNowCheckout } from './components/healnow/HealNowCheckout';
import { PharmacyFinder } from './components/pharmacy/PharmacyFinder';
import { PhoneFrame } from './components/PhoneFrame';
import { TabBar } from './components/TabBar';
import { DemoControls } from './demo/DemoControls';
import { HomeScreen } from './screens/HomeScreen';
import { PrototypeProvider, usePrototype } from './state/PrototypeContext';

function Modals() {
  const { state } = usePrototype();
  if (state.overlay === 'healnow') return <HealNowCheckout />;
  if (state.overlay === 'addressForm') return <AddressDialog />;
  if (state.overlay === 'pharmacyFinder') return <PharmacyFinder />;
  return null;
}

export function App() {
  return (
    <PrototypeProvider>
      <PhoneFrame overlay={<TabBar activeTab="home" />} modal={<Modals />} aside={<DemoControls />}>
        <HomeScreen />
      </PhoneFrame>
    </PrototypeProvider>
  );
}
