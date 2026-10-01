import bgGradient from '../assets/figma/bg-gradient.png';
import type { Brand } from './types';

export const pixel: Brand = {
  id: 'pixel',
  appName: 'Pixel',
  title: 'Pixel Patient App',
  themeColor: '#ffffff',
  pharmacies: { specialty: 'Pixel Specialty Pharmacy', mail: 'Pixel Mail Pharmacy' },
  bgGradient,
  icons: {},
  load: () =>
    Promise.all([
      import('@fontsource/space-grotesk/400.css'),
      import('@fontsource/space-grotesk/500.css'),
      import('@fontsource/space-grotesk/700.css'),
    ]),
};
