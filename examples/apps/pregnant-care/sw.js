var GHPATH = '/js-spare-code/examples/apps/pregnant-care/';
var APP_PREFIX = 'gppwa_';
var VERSION = 'version_009';
var URLS = [
  `/js-spare-code/examples/apps/pregnant-care/main.html`,
  `/js-spare-code/examples/apps/pregnant-care/main.css`,
  `/js-spare-code/examples/apps/pregnant-care/data.js`,
  `/js-spare-code/examples/apps/pregnant-care/static/vendors/bootstrap/bootstrap.min.css`,
  `/js-spare-code/examples/apps/pregnant-care/static/vendors/bootstrap/bootstrap.min.js`,
  `/js-spare-code/examples/apps/pregnant-care/static/vendors/jquery-3.6.0.min.js`,
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      console.log('Adding urls...', URLS)
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})