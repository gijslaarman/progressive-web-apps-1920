self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('pl').then(cache => {
            return cache.addAll([
                '/',
                '/standings',
                '/main.js',
                '/api/teams',
                '/style.css',
                '/manifest.json',
                '/offline'
            ])
        })
    )
})

self.addEventListener('fetch', (event) => {
    // console.log(event.request.url)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response
            }

            return fetch(event.request).then(function(response) {
                // Uncomment for 404 handling.
                // if (response.status === 404) {
                //     return caches.match('pages/404.html')
                // }
                return response
            })
        }).catch(function() {
            return caches.match('/offline')
        })
    )
})