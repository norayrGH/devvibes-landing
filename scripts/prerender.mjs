// Bakes the landing page into dist/index.html at build time.
//
// Why: the site is a client-rendered SPA, so the delivered HTML was
// <div id="root"></div> and ~1.9 kB. Google renders JS, but most AI crawlers
// and every social-card scraper read the HTML as served and saw an empty page.
// A build-time prerender is enough — no SSR runtime is needed for a page whose
// content is static.
//
// The SSR bundle is written outside dist/ and never deployed.

import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js');

const { render } = await import(pathToFileURL(ssrEntry).href);
const html = await readFile(resolve(dist, 'index.html'), 'utf8');

const markup = render();
if (!markup.includes('<h1')) {
  throw new Error('Prerender produced no <h1> — refusing to write a broken page.');
}

const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) {
  throw new Error(`Prerender could not find ${placeholder} in dist/index.html.`);
}

await writeFile(
  resolve(dist, 'index.html'),
  html.replace(placeholder, `<div id="root">${markup}</div>`),
  'utf8',
);

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });

const bytes = Buffer.byteLength(markup, 'utf8');
console.log(`prerender: injected ${bytes.toLocaleString()} bytes of markup into dist/index.html`);
