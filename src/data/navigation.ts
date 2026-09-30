import type { IconName } from '../components/Icon';

export type TabId = 'home' | 'treatment' | 'messages' | 'library' | 'groups';

export type Tab = {
  id: TabId;
  label: string;
  icon: IconName;
};

/** Bottom tab bar items, in Figma order (Nav › Navbar). */
export const tabs: Tab[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'treatment', label: 'Treatment', icon: 'treatment' },
  { id: 'messages', label: 'Messages', icon: 'messages' },
  { id: 'library', label: 'Library', icon: 'library' },
  { id: 'groups', label: 'Groups', icon: 'groups' },
];
