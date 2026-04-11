// A unique name for this version of the cache
const CACHE_NAME = 'gallop-v2-media';

// The list of critical assets that must be cached for offline support.
// PDFs and JPEGs are included here.
// Inside the ASSETS array in service-worker.js
const ASSETS = [
    '/Gallop/',
    '/Gallop/index.html',
    '/Gallop/style.css',
    '/Gallop/manifest.json',
    '/Gallop/icons/icon-192.png',
    '/Gallop/icons/icon-512.png',
    '/Gallop/icons/gallop_logo.png', // Updated from .pdf to .png
    '/Gallop/icons/about_photo.jpg'
];

// Install Event: Caches the core application assets.
self.addEventListener('install', (e) => {
    // Perform install steps
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            // 'addAll' is atomic; if any file fails to fetch, the installation fails.
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Event: Cleans up old caches.
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event: Handles offline requests by serving cached files.
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Cache hit - return the response from the cached version.
            if (response) {
                return response;
            }
            // Not in cache - fetch from the network.
            return fetch(e.request);
        })
    );
});
