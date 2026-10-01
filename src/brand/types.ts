export type Brand = {
  id: 'pixel' | 'judi';
  /** Product name used in copy ("Return to Pixel"). */
  appName: string;
  /** Browser tab title. */
  title: string;
  themeColor: string;
  /** Pharmacy names shown in prescription journeys. */
  pharmacies: { specialty: string; mail: string };
  /** Wordmark shown in the Home header. Omitted for brands that show none. */
  logo?: string;
  /** Home / Pharmacy Finder backdrop image. */
  bgGradient: string;
  /** Backdrop for the Find a Pharmacy screen; falls back to bgGradient. */
  pharmacyBg?: string;
  /** True when bgGradient is a tall image stretched over the whole scroll height (no repeat / mirroring). */
  bgFull?: boolean;
  /** Recolored icon files that replace the default (Pixel) ones, keyed by icon name. */
  icons: Partial<Record<'home' | 'chevronDown' | 'chevronUpLight' | 'progressFirst' | 'progressMiddle' | 'progressLast', string>>;
  /** Loads this brand's fonts and theme CSS. Awaited before first render. */
  load: () => Promise<unknown>;
};
