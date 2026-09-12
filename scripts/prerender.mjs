// Bakes each locale into its own page at build time.
//
//   dist/index.html     → English,  canonical https://devvibes.dev/
//   dist/hy/index.html  → Armenian, canonical https://devvibes.dev/hy/
//
// Why prerender at all: the site is a client-rendered SPA, so the delivered
// HTML was <div id="root"></div> and ~1.9 kB. Google renders JS, but most AI
// crawlers and every social-card scraper read the HTML as served and saw an
// empty page. No SSR runtime is needed for content this static.
//
// Why two pages: one URL cannot honestly serve two languages. The language now
// comes from the path, each page declares its own lang/canonical/og:locale, and
// both carry the same hreflang set.
//
// The SSR bundle is written outside dist/ and never deployed.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ORIGIN = 'https://devvibes.dev';

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

const LOCALES = [
  {
    lang: 'en',
    outDir: dist,
    url: `${ORIGIN}/`,
    ogLocale: 'en_US',
    ogAlternate: 'hy_AM',
    image: `${ORIGIN}/og-image.jpg`,
  },
  {
    lang: 'hy',
    outDir: resolve(dist, 'hy'),
    url: `${ORIGIN}/hy/`,
    ogLocale: 'hy_AM',
    ogAlternate: 'en_US',
    image: `${ORIGIN}/og-image-hy.jpg`,
  },
];

/**
 * Replace the `content` of a meta tag identified by its property/name.
 * Matches the whole tag first, so it survives multi-line formatting and any
 * attribute order — Vite reformats index.html and the tags are not all written
 * the same way by hand.
 */
function setMeta(html, attr, key, value) {
  const tag = new RegExp(`<meta\\b[^>]*\\b${attr}="${key}"[^>]*>`);
  const found = html.match(tag);
  if (!found) throw new Error(`prerender: no <meta ${attr}="${key}"> in template`);

  // Check the attribute exists rather than that the value changed — for the
  // English page most of these already hold the right value, and a no-op
  // replacement is correct, not a failure.
  if (!/\bcontent="[^"]*"/.test(found[0])) {
    throw new Error(`prerender: <meta ${attr}="${key}"> has no content attribute`);
  }

  const replaced = found[0].replace(/\bcontent="[^"]*"/, () => `content="${escapeAttr(value)}"`);
  return html.replace(found[0], () => replaced);
}

function escapeAttr(v) {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: could not find ${placeholder} in dist/index.html`);
}

for (const locale of LOCALES) {
  const { html: markup, meta } = render(locale.lang);

  if (!markup.includes('<h1')) {
    throw new Error(`prerender: ${locale.lang} produced no <h1> — refusing to write a broken page.`);
  }

  let page = template;
  page = page.replace('<html lang="en">', `<html lang="${locale.lang}">`);
  page = page.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  page = page.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${locale.url}$2`,
  );

  page = setMeta(page, 'name', 'description', meta.description);
  page = setMeta(page, 'property', 'og:url', locale.url);
  page = setMeta(page, 'property', 'og:locale', locale.ogLocale);
  page = setMeta(page, 'property', 'og:locale:alternate', locale.ogAlternate);
  page = setMeta(page, 'property', 'og:title', meta.title);
  page = setMeta(page, 'property', 'og:description', meta.description);
  page = setMeta(page, 'property', 'og:image', locale.image);
  page = setMeta(page, 'name', 'twitter:title', meta.title);
  page = setMeta(page, 'name', 'twitter:description', meta.description);
  page = setMeta(page, 'name', 'twitter:image', locale.image);

  page = page.replace(placeholder, `<div id="root">${markup}</div>`);

  await mkdir(locale.outDir, { recursive: true });
  await writeFile(resolve(locale.outDir, 'index.html'), page, 'utf8');

  const kb = (Buffer.byteLength(page, 'utf8') / 1024).toFixed(1);
  console.log(`prerender: ${locale.lang} → ${locale.url}  (${kb} kB)`);
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
