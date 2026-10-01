export type Brand = {
  id: 'pixel' | 'judi';
  /** Product name used in copy ("Return to Pixel"). */
  appName: string;
  /** Browser tab title. */
  title: string;
  themeColor: string;
  /** Pharmacy names shown in prescription journeys. */
  pharmacies: { specialty: string; mail: string };
  /** CSS custom property overrides on top of styles/tokens.css, e.g. { '--color-navy': '#000' }. */
  cssVars: Record<string, string>;
};
