import { renderToString } from 'react-dom/server';
import App from './App';
import { DICT, setLangForRender, type Lang } from './lib/i18n';

/**
 * Build-time only. `scripts/prerender.mjs` calls this once per locale to bake
 * each page into dist/ so crawlers that do not execute JS — most AI crawlers,
 * and every social-card scraper — receive real content instead of an empty
 * <div id="root">.
 *
 * This output never ships: the SSR bundle is written outside dist/.
 */
export function render(lang: Lang): { html: string; meta: { title: string; description: string } } {
  setLangForRender(lang);
  return { html: renderToString(<App />), meta: DICT[lang].meta };
}
