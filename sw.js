/* Robo-Fabriek – service worker (offline spelen). Pagina: eerst netwerk (updates komen meteen), offline uit de cache. Rest: eerst cache. */
const ID = 'robofabriek';
const CORE = ID + '-core-v22';
const PAGE = new URL('./', self.registration.scope).href;
const ASSETS = ["./", "./manifest.webmanifest", "./fonts/exo2-latin.woff2", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-48.png", "./gfx/asphalt.webp", "./gfx/car1.webp", "./gfx/car2.webp", "./gfx/car3.webp", "./gfx/car4.webp", "./gfx/floor.webp", "./gfx/goal.webp", "./gfx/itembox.webp", "./gfx/robot1.webp", "./gfx/robot2.webp", "./gfx/robot3.webp", "./gfx/robot4.webp", "./gfx/v2/b_garage.webp", "./gfx/v2/b_shop.webp", "./gfx/v2/b_stadion.webp", "./gfx/v2/b_truck.webp", "./gfx/v2/belt_h.webp", "./gfx/v2/belt_side.webp", "./gfx/v2/bg_eve_l.webp", "./gfx/v2/bg_eve_p.webp", "./gfx/v2/bg_warm_l.webp", "./gfx/v2/bg_warm_p.webp", "./gfx/v2/c_baron.webp", "./gfx/v2/c_baron_v.webp", "./gfx/v2/c_bliep.webp", "./gfx/v2/c_bliep_v.webp", "./gfx/v2/c_coach.webp", "./gfx/v2/c_coach_v.webp", "./gfx/v2/floor2.webp", "./gfx/v2/i_energie.webp", "./gfx/v2/i_munt.webp", "./gfx/v2/i_ster.webp", "./gfx/v2/m_band.webp", "./gfx/v2/m_kern.webp", "./gfx/v2/m_mag.webp", "./gfx/v2/m_mont.webp", "./gfx/v2/m_sort.webp", "./gfx/v2/m_test.webp", "./gfx/v2/rb_blauw.webp", "./gfx/v2/rb_mint.webp", "./gfx/v2/rb_mis.webp", "./gfx/v2/rb_oranje.webp", "./gfx/v2/stk_b1.webp", "./gfx/v2/stk_b2.webp", "./gfx/v2/stk_b3.webp", "./gfx/v2/stk_b4.webp", "./gfx/v2/stk_b5.webp", "./gfx/v2/stk_g1.webp", "./gfx/v2/stk_g2.webp", "./gfx/v2/stk_g3.webp", "./gfx/v2/stk_g4.webp", "./gfx/v2/stk_g5.webp", "./gfx/v2/stk_r1.webp", "./gfx/v2/stk_r2.webp", "./gfx/v2/stk_r3.webp", "./gfx/v2/stk_r4.webp", "./gfx/v2/stk_r5.webp", "./gfx/v2/stk_s1.webp", "./gfx/v2/stk_s2.webp", "./gfx/v2/stk_s3.webp", "./gfx/v2/stk_s4.webp", "./gfx/v2/stk_s5.webp", "./gfx/v2/t_baron.webp", "./gfx/v2/t_bokaal.webp", "./gfx/v2/t_brons.webp", "./gfx/v2/t_goud.webp", "./gfx/v2/t_gp.webp", "./gfx/v2/t_zilver.webp"];
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
