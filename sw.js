// 網路優先，離線時退回快取（確保 offers.json 更新後立即生效）
const CACHE = "shua-v2";
const FILES = ["./", "./index.html", "./offers.json", "./manifest.json", "./icon.svg", "./cards/taishin_rose.svg"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
