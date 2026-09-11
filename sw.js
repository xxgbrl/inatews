// Nama cache — ganti versinya (v1 -> v2, dst) tiap kali mau paksa browser
// ambil ulang app shell yang baru (misal setelah update besar).
const CACHE_NAME = "inatews-shell-v1";

// "App shell": file inti biar situs tetap kebuka meski offline/sinyal jelek.
// Sengaja TIDAK memasukkan data BMKG di sini karena harus selalu realtime.
const APP_SHELL = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png"
];

// Domain data realtime BMKG & sejenisnya -> JANGAN pernah di-cache,
// harus selalu fresh dari network.
const NEVER_CACHE_HOSTS = [
  "data.bmkg.go.id",
  "bmkg-content-inatews.storage.googleapis.com",
  "api.allorigins.win"
];

// ---- INSTALL: unduh & simpan app shell ke cache ----
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting(); // langsung aktif tanpa nunggu tab lama ditutup
});

// ---- ACTIVATE: bersihkan cache versi lama ----
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ---- FETCH: strategi beda-beda tergantung jenis request ----
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1) Data gempa/tsunami BMKG -> selalu ke network, tidak disentuh sama sekali.
  if (NEVER_CACHE_HOSTS.some((host) => url.hostname.includes(host))) {
    return; // biarkan browser fetch normal, service worker tidak ikut campur
  }

  // 2) Halaman utama (navigasi) -> coba network dulu (biar selalu versi terbaru),
  //    kalau offline/gagal baru fallback ke cache.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 3) Aset statis lain (icon, manifest, library CDN) -> cache dulu (cepat),
  //    sambil diam-diam update cache di background (stale-while-revalidate).
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
