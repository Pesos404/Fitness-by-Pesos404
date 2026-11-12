const V = 'bilanz-v6';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  // cache:'reload' umgeht den HTTP-Cache, damit immer die frischen Dateien gespeichert werden
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.hostname.endsWith('openfoodfacts.org')) return;
  if (u.origin === location.origin) {
    // Eigene Dateien: erst das Netz (immer aktuell), offline der Zwischenspeicher
    e.respondWith(
      fetch(new Request(e.request.url, { cache: 'no-cache' })).then(r => {
        if (r.ok) { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); }
        return r;
      }).catch(() => caches.match(e.request).then(h => h || caches.match('./index.html')))
    );
  } else {
    // Fremde Scanner-Bibliotheken: erst Zwischenspeicher
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok && ['unpkg.com', 'fastly.jsdelivr.net', 'cdn.jsdelivr.net'].includes(u.hostname)) { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); }
      return r;
    })));
  }
});
