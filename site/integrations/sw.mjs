/**
 * Writes a service worker after each build with a precache manifest of every
 * emitted file, so the whole site works offline once it has been visited.
 * No dependency; ~60 lines.
 */
import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

export default function serviceWorker() {
  let base = '/';
  return {
    name: 'present:service-worker',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.endsWith('/') ? config.base : config.base + '/';
      },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await walk(root))
          .map((f) => relative(root, f).split(sep).join('/'))
          .filter((f) => f !== 'sw.js' && !f.endsWith('.map'));
        const urls = files.map((f) => {
          if (f.endsWith('/index.html')) return base + f.slice(0, -'index.html'.length);
          if (f === 'index.html') return base;
          return base + f;
        });
        const version = createHash('sha1').update(urls.join('\n')).digest('hex').slice(0, 12);
        const sw = `/* present service worker — generated at build */
const VERSION = ${JSON.stringify(version)};
const CACHE = 'present-' + VERSION;
const PRECACHE = ${JSON.stringify(urls)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('present-') && k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Pages: network first so updates arrive, cache as the offline fallback.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(${JSON.stringify(base)})))
    );
    return;
  }

  // Everything else (hashed assets, fonts, data): cache first.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
`;
        await writeFile(join(root, 'sw.js'), sw);
        logger.info(`service worker written with ${urls.length} precached URLs (v${version})`);
      },
    },
  };
}
