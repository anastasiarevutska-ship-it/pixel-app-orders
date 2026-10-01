import logo from '../assets/judi/logo-color.svg';
import bgGradient from '../assets/judi/bg-gradient.svg';
import chevronDown from '../assets/judi/chevron-down-small.svg';
import chevronUpLight from '../assets/judi/chevron-up-small.svg';
import home from '../assets/judi/icon-home.svg';
import progressFirst from '../assets/judi/progress-first.svg';
import progressLast from '../assets/judi/progress-last.svg';
import progressMiddle from '../assets/judi/progress-middle.svg';
import type { Brand } from './types';

// White label: visuals only (see judi.css). Copy is deliberately identical to Pixel for now.
export const judi: Brand = {
  id: 'judi',
  appName: 'Pixel',
  title: 'Pixel Patient App',
  themeColor: '#ffffff',
  pharmacies: { specialty: 'Pixel Specialty Pharmacy', mail: 'Pixel Mail Pharmacy' },
  logo,
  bgGradient,
  icons: { home, chevronDown, chevronUpLight, progressFirst, progressMiddle, progressLast },
  load: () =>
    Promise.all([
      import('@fontsource/rubik/300.css'),
      import('@fontsource/source-sans-3/400.css'),
      import('@fontsource/source-sans-3/600.css'),
      import('./judi.css'),
    ]),
};
