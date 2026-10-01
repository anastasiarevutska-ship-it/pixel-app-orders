import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { App } from './App';
import { applyBrand, brand } from './brand';

applyBrand();

// Theme CSS and fonts load first so the first paint is already branded.
void brand.load().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
