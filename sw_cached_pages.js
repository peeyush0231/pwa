const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'js/main.js'
]
//Call install event
//attache event listener to actual service worker
self.addEventListener('install', (e) => {
    console.log('service worker installed')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: caching files')
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
})

// Activated Event
self.addEventListener('activate', (e) => {
    console.log('service worker activate')
    //Remove unwanted caches 
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: clearing Old Cache')
                        caches.delete(cache)
                    }
                })
            )
        })
    )
});

//Call fetch Event
self.addEventListener('fetch', e => {
    console.log('Service worker : fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})
