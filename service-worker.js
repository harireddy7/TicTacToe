
function preload() {
    console.log('Installing web app');
    return caches.open('offline').then(cache => {
        console.log('caching index and important routes');
        return cache.addAll("/", "/offline.html");
    });
}

self.addEventListener('install', event => event.waitUntil(preload()));

function checkResponse (request) {
    return new Promise((resolve, reject) => {
        fetch(request).then(response => {
            if (response.status !== 404) {
                resolve(response);
            } else {
                reject();
            }
        }, reject);
    });
}

function addToCache(request) {
    return caches.open('offline').then(cache => {
        return fetch(request).then(response => {
            console.log(`${response.url} was cached!`);
            return cache.put(request, response);
        })
    });
}

function returnFromCache(request) {
    return caches.open('offline').then(cache => {
        return cache.match(request).then(matchedResponse => {
            if (!matchedResponse || matchedResponse.status === 404) {
                return cache.match('offline.html');
            }
            return matchedResponse;
        });
    });
}

self.addEventListener('fetch', event => {
    event.respondWith(checkResponse(event.request).catch(() => returnFromCache(event.request)));
    event.waitUntil(addToCache(event.request));
});