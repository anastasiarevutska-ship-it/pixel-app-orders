import arrowRightSmall from '../assets/figma/arrow-right-small.svg';
import chevronDownSmall from '../assets/figma/chevron-down-small.svg';
import chevronUp from '../assets/figma/chevron-up.svg';
import chevronUpSmall from '../assets/figma/chevron-up-small.svg';
import chart from '../assets/figma/icon-chart.svg';
import groups from '../assets/figma/icon-groups.svg';
import home from '../assets/figma/icon-home.svg';
import library from '../assets/figma/icon-library.svg';
import messages from '../assets/figma/icon-messages.svg';
import treatment from '../assets/figma/icon-treatment.svg';
import otbLogo from '../assets/figma/otb-logo.svg';
import plusCircle from '../assets/figma/icon-plus-circle.svg';
import truck from '../assets/figma/icon-truck.svg';
import play from '../assets/figma/play.svg';
import styles from './Icon.module.css';

/**
 * Figma icon components are 24×24 frames with the exported vector placed at
 * a fixed offset inside. `x`/`y` reproduce those offsets (derived from the
 * Figma insets); the SVG keeps its own intrinsic width/height.
 */
const ICONS = {
  home: { src: home, x: 2.5, y: 2 }, // Iconly/Bold/Home, inset 8.33% 10.42%
  treatment: { src: treatment, x: 0, y: 0 }, // Assignment
  messages: { src: messages, x: 2, y: 2 }, // Iconly/Bold/Chat, inset 8.33%
  library: { src: library, x: 4, y: 3 }, // Book, inset 12.5% 15.58% 14.58% 16.67%
  groups: { src: groups, x: 1, y: 4 }, // Iconly/Bold/3-User, inset 16.67% 4.17%
  chart: { src: chart, x: 2, y: 2 }, // Iconly/Bold/Chart
  otbLogo: { src: otbLogo, x: 0, y: 0 }, // OTB Logo
  chevronDown: { src: chevronDownSmall, x: 7.25, y: 9.75 }, // Chevron_Down_Small
  chevronUp: { src: chevronUp, x: 6.25, y: 8.25 }, // Chevron_Up (TextField_Light dropdown)
  chevronUpLight: { src: chevronUpSmall, x: 6.25, y: 8.25 }, // Chevron_Up in the navy ButtonIcon (Medications card)
  arrowRight: { src: arrowRightSmall, x: 7.25, y: 8.05 }, // Arrow_Right_SmallDark
  play: { src: play, x: 8, y: 7 }, // VideoIcon_SmallDark
  truck: { src: truck, x: 0, y: 0 }, // Truck (Delivery card)
  plusCircle: { src: plusCircle, x: 0, y: 0 }, // react-icons/fa/FaPlusCircle (Medications card)
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name }: { name: IconName }) {
  const { src, x, y } = ICONS[name];
  return (
    <span className={styles.icon} aria-hidden="true">
      <img src={src} alt="" style={{ left: x, top: y }} />
    </span>
  );
}
