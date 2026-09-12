// Routing in front of the static assets.
//
// The assets config previously used `not_found_handling = "single-page-application"`,
// which serves index.html with HTTP 200 for every unmatched path. Two problems
// followed from that:
//
//   1. /robots.txt, /sitemap.xml and /llms.txt "existed" — 200, HTML body. A
//      false positive is worse than a 404, because nothing ever alerts anyone.
//   2. A missing or renamed /assets/*.js was served an HTML page, so the browser
//      reported a MIME-type parse error instead of a clean 404.
//
// Assets are matched before this Worker runs, so anything reaching here is a
// genuine miss. Real files (including robots.txt and friends) never get this
// far.

const ASSET_PREFIXES = ['/assets/', '/work/', '/brand/'];

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // Static directories must fail as static files, never as a page.
    if (ASSET_PREFIXES.some((p) => pathname.startsWith(p))) {
      return new Response('Not Found\n', {
        status: 404,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
        },
      });
    }

    // Everything else gets the styled 404 — with a 404 status, so crawlers do
    // not index it as a real page.
    const page = await env.ASSETS.fetch(new URL('/404.html', request.url));
    return new Response(page.body, {
      status: 404,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  },
};
