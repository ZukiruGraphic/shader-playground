const CACHE_NAME = 'shader-play-v1';

// Daftar aset inti dan pustaka eksternal yang wajib di-cache agar bisa offline
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.2/jszip.min.js'
];

// Saat Service Worker diinstal, simpan semua file inti ke dalam cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Membersihkan cache lama jika ada pembaruan versi Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Strategi Fetch: Ambil dari cache dulu, jika tidak ada ambil dari jaringan, lalu simpan ke cache secara dinamis
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Jangan cache jika respons tidak valid (misal error atau dari ekstensi browser)
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && !networkResponse.url.startsWith('http')) {
                    return networkResponse;
                }
                
                // Salin respons jaringan untuk dimasukkan ke cache secara dinamis (seperti file shader atau tekstur)
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Fallback kustom bisa ditaruh di sini jika koneksi putus dan file tidak ada di cache
            });
        })
    );
});
