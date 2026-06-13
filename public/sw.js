importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js'
);

workbox.setConfig({
  debug: false,
});

const { precaching, routing, strategies } = workbox;

// Precache all app assets (injected by workbox-build)
precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Cache the manifest.json immediately
routing.registerRoute(
  /\/manifest\.json$/,
  new strategies.CacheFirst({
    cacheName: 'manifest-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);

// Cache static assets (icons, images) with CacheFirst
routing.registerRoute(
  /\/assets\/(icons|images|fonts)\//,
  new strategies.CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache Shoelace CDN assets with StaleWhileRevalidate
routing.registerRoute(
  /https:\/\/cdn\.jsdelivr\.net\/npm\/@shoelace-style\/shoelace\/.*/,
  new strategies.StaleWhileRevalidate({
    cacheName: 'shoelace-cdn',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// Cache Google Fonts
routing.registerRoute(
  /https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
  new strategies.CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
      }),
    ],
  })
);

// Cache any JS/CSS assets from CDNs with StaleWhileRevalidate
routing.registerRoute(
  /\.(?:js|css)$/,
  new strategies.StaleWhileRevalidate({
    cacheName: 'external-scripts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// SPA fallback — serve index.html for any navigation request not matching a precached route
routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new strategies.NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);

// Install event - claim clients immediately
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Activate event - claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
