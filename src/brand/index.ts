import { judi } from './judi';
import { pixel } from './pixel';
import type { Brand } from './types';

const brands = { pixel, judi } as const;

/** Chosen at build time: VITE_BRAND=judi npm run build. Defaults to Pixel. */
export const brand: Brand = brands[import.meta.env.VITE_BRAND as keyof typeof brands] ?? pixel;

export function applyBrand() {
  const root = document.documentElement;
  root.dataset.brand = brand.id;
  for (const [name, value] of Object.entries(brand.cssVars)) root.style.setProperty(name, value);
  document.title = brand.title;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', brand.themeColor);
}
