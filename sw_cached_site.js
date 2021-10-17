const cacheName = 'v2';

//Call install event
//attache event listener to actual service worker
self.addEventListener('install', (e) => {
    console.log('service worker installed')
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
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
        })
        .catch(() => caches.match(e.request)).then(res => res)
    )
})
