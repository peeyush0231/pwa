//make sure sw are supported
if('serviceWorker' in navigator) {
    //console.log("service worker are supported");
    navigator.serviceWorker
    .register('../sw_cached_pages.js')
    .then(reg => console.log('service worker: Registered'))
    .catch(err => console.log(`Service Worker : Error: ${err}`))
} 