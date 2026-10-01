# Pixel Patient App — interactive prototype

High-fidelity web recreation of the Pixel mobile Home screen
(Figma: ⭐️ NEW Patient App › `Homescreem`, node `16940:94628`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
```

- `VITE_BRAND=pixel|judi` picks the brand (`src/brand/`); `npm run dev:judi`, `build:judi`. Deployed as two Netlify sites from this repo, each with its own `VITE_BRAND`.
- `src/screens/` — screens (`HomeScreen`)
- `src/components/` — reusable UI (cards, tab bar, phone frame, icons)
- `src/data/` — mock product data shown on the screens
- `src/styles/` — design tokens from Figma, typography, globals
- `src/assets/figma/` — images and icons exported from Figma
