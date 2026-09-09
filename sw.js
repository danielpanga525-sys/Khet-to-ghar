// FarmConnect service worker — runtime caching for offline support.
// Strategy: network-first, falling back to cache when offline. This means
// the app always loads the freshest version when online, but still works
// (from the last successfully cached version) with no internet connection.
//
// Note: this only affects same-origin requests (the app's own HTML/JS/CSS).
// It deliberately does NOT try to cache the OpenStreetMap live-tracking
// tiles — those are a different origin and genuinely require internet;
// the app already shows a graceful "map needs internet" message for that.

const CACHE_NAME = "farmconnect-cache-v1";
const PRECACHE_URLS = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only manage GET requests for our own origin — leave everything else
  // (cross-origin map tiles, fonts, etc.) to the browser's normal handling.
  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("/")))
  );
});
