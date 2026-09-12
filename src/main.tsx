import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build ships a prerendered body (see scripts/prerender.mjs), so
// hydrate it rather than throwing it away and re-rendering. `vite dev` serves an
// empty root, so fall back to a fresh render there.
if (container.firstChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
