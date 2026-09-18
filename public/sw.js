// Service Worker for Sintiens - Offline caching and performance
// Bump all version suffixes on each deploy to invalidate stale caches
const STATIC_CACHE_NAME = 'sintiens-static-v3';
const DYNAMIC_CACHE_NAME = 'sintiens-dynamic-v3';
// Límite de entradas del caché dinámico (LRU aproximada: se purgan las más antiguas).
const DYNAMIC_MAX_ITEMS = 80;

async function trimCache(cache, maxItems) {
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    return trimCache(cache, maxItems);
  }
}

// Solo se cachean respuestas que son realmente el recurso pedido.
// Un HTML servido en /assets/* (fallback SPA) NO debe entrar al caché:
// quedaría cacheado como JS/CSS y rompería la app de forma persistente.
function isCacheableAsset(response) {
  if (!response || !response.ok) return false;
  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  return !contentType.includes('text/html');
}

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/favicon-32x32-dark.png',
  '/favicon-16x16-dark.png',
  '/favicon-dark.ico',
  '/apple-touch-icon.png',
  '/apple-touch-icon-dark.png',
  '/logo-mark.svg',
  '/logo-mark-dark.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/icon-512-maskable.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(async (cache) => {
      // allSettled: si un icono cambia de nombre, el SW se instala igualmente
      const results = await Promise.allSettled(
        STATIC_ASSETS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      );
      const failed = results.filter((r) => r.status === 'rejected').length;
      if (failed > 0) {
        console.warn(`[SW] Precaché con ${failed} recurso(s) fallido(s) de ${STATIC_ASSETS.length}`);
      }
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches + enable navigation preload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      if (self.registration.navigationPreload) {
        return self.registration.navigationPreload.enable();
      }
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first for HTML, cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Never cache API requests: they must always hit the network
  if (url.pathname.startsWith('/api/')) return;

  // Never cache dev-server modules (Vite): must always be fresh
  if (
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/@vite') ||
    url.pathname.startsWith('/@react-refresh') ||
    url.pathname.startsWith('/node_modules/')
  ) {
    return;
  }

  // Skip cross-origin requests (fonts, APIs)
  if (url.origin !== location.origin) {
    // For Google Fonts, use stale-while-revalidate
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(staleWhileRevalidate(request));
    }
    return;
  }

  // HTML pages - network first with fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(event));
    return;
  }

  // Static assets (JS, CSS, images) - cache first
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default: network first
  event.respondWith(networkFirst(event));
});

// Cache first strategy - good for static assets
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    // Update cache in background
    fetch(request).then((response) => {
      if (isCacheableAsset(response)) cache.put(request, response.clone());
    }).catch(() => {});
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (isCacheableAsset(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Offline: placeholder SVG 1x1 en vez de respuesta vacía (evita <img> rota sin alt visible)
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
        { status: 200, headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' } }
      );
    }
    throw error;
  }
}

// Network first strategy - good for HTML (usa navigation preload si existe)
async function networkFirst(event) {
  const request = event.request;
  const cache = await caches.open(DYNAMIC_CACHE_NAME);

  try {
    const preloaded = await event.preloadResponse;
    const response = preloaded || (await fetch(request));
    if (response.ok) {
      cache.put(request, response.clone());
      trimCache(cache, DYNAMIC_MAX_ITEMS).catch(() => {});
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    // Return offline page for navigation requests: buscar el shell en TODOS
    // los cachés (la raíz '/' se precachea en el caché estático)
    if (request.mode === 'navigate') {
      const shell = await caches.match('/');
      if (shell) return shell;
    }
    throw error;
  }
}

// Stale while revalidate - good for fonts
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
      trimCache(cache, DYNAMIC_MAX_ITEMS).catch(() => {});
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}
