/* Robo-Fabriek – service worker (offline spelen). Pagina: eerst netwerk (updates komen meteen), offline uit de cache. Rest: eerst cache. */
const ID = 'robofabriek';
const CORE = ID + '-core-v6';
const PAGE = new URL('./', self.registration.scope).href;
const ASSETS = ["./", "./manifest.webmanifest", "./fonts/exo2-latin.woff2", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-48.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CORE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith(ID + '-') && k !== CORE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function networkFirst(req) {
  const cache = await caches.open(CORE);
  try {
    const res = await Promise.race([fetch(req.url, { cache: 'no-cache' }), new Promise((_, rej) => setTimeout(() => rej(new Error('traag')), 6000))]);
    if (res && res.ok && res.type === 'basic') cache.put(PAGE, res.clone());
    return res;
  } catch (err) { return (await cache.match(PAGE)) || Response.error(); }
}
async function cacheFirst(req) {
  const hit = await caches.match(req, { ignoreSearch: true }); if (hit) return hit;
  const res = await fetch(req); if (res && res.ok && res.type === 'basic') (await caches.open(CORE)).put(req, res.clone()); return res;
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !url.href.startsWith(self.registration.scope) || url.pathname.endsWith('/sw.js')) return;
  const page = req.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname);
  e.respondWith(page ? networkFirst(req) : cacheFirst(req));
});
