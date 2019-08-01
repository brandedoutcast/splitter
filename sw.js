const cacheName = "splitter-cache-v1.1",
    assets = [
        "./",
        "index.html",
        "logo.png"
    ]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assets))
    )
})

self.addEventListener("activate", event =>
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== cacheName) {
                    return caches.delete(key)
                }
            }))
        )
    )
)

self.addEventListener("fetch", event => {
    let request = event.request
    event.respondWith(caches.match(request).then(cacheResponse => cacheResponse || fetch(request)))
})