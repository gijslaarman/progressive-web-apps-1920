self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('pl').then(cache => {
            return cache.addAll([
                '/',
                '/standings',
                '/style.css',
                '/manifest.json'
            ])
        })
    )
})

self.addEventListener('fetch', (event) => {
    // console.log(event.request.url)
    event.respondWith(
        caches.open('pl').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        })
    )
})