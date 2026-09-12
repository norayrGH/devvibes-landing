import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Build-time only. `scripts/prerender.mjs` calls this to bake the landing page
 * into dist/index.html so crawlers that do not execute JS — most AI crawlers,
 * and every social-card scraper — receive real content instead of an empty
 * <div id="root">.
 *
 * This output never ships: the SSR bundle is written outside dist/.
 */
export function render(): string {
  return renderToString(<App />);
}
