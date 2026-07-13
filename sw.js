const CACHE = 'swim-or-skip-v1';
const SHELL = ['./', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Live conditions (Open-Meteo, NOAA) must never be served stale — let them
  // hit the network untouched.
  if (new URL(req.url).origin !== self.location.origin) return;

  // Navigations: network first (so pushes show up immediately), cache fallback offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put('./', copy));
          return r;
        })
        .catch(() => caches.match('./'))
    );
    return;
  }

  // Same-origin assets (icons, manifest): cache first, then network + cache
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return r;
    }))
  );
});
