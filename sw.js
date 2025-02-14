const VERSION = "2";
const CACHE_NAME = `epaile-bertsio-${VERSION}`;
const APP_STATIC_RESOURCES = [
  "/epaile/icons/putxera.jpg",
  "/epaile/icons/putxera.png",
  "/epaile/css/style.css",
  "/epaile/index.html",
  "/epaile/index.html?",
  "/epaile/html/epaitu.html",
  "/epaile/html/epaitu.html?",
  "/epaile/js/epaile.js",
  "/epaile/js/app.js",
  "/epaile/js/ebaluazioa.js",
  "/epaile/js/epaimahaikidea.js",
  "/epaile/js/fasea.js",
  "/epaile/js/konstanteak.js",
  "/epaile/js/taldea.js",
  "/epaile/js/user.js",
  "/epaile/pwa/manifest.json",
  "/epaile/sw.js",
  "/epaile/pics/atzera.svg",
  "/epaile/pics/berria.svg",
  "/epaile/pics/birkargatu.svg",
  "/epaile/pics/chef.svg",
  "/epaile/pics/debekatuta.svg",
  "/epaile/pics/epaitu.svg",
  "/epaile/pics/ezarpenak.svg",
  "/epaile/pics/historia.svg",
  "/epaile/pics/itxaron.svg",
  "/epaile/pics/mahaia.svg",
  "/epaile/pics/menu.svg",
  "/epaile/pics/podium.svg",
  "icons/putxera.jpg",
  "icons/putxera.png",
 
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        APP_STATIC_RESOURCES.map((resource) =>
          cache.add(resource).catch((error) => console.error(`❌ Error cacheando ${resource}:`, error))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            console.log(`Deleting old cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("Interceptando petición:", event.request.url);
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Sirviendo desde caché:", event.request.url);
        return cachedResponse;
      }
      console.log("No está en caché, intentamos obtener de la red:", event.request.url);
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || event.request.method !== "GET") {
            return networkResponse;
          }
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          console.error("⚠️ Sin conexión y recurso no cacheado:", event.request.url);
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return caches.match(event.request).then((fallbackResponse) => {
            if (fallbackResponse) {
              return fallbackResponse;
            }
            return new Response("⚠️ Offline: El recurso no está en caché.", { status: 404 });
          });
        });
    })
  );
});