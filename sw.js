const PREFIX='entreno-pwa:'+new URL(self.registration.scope).pathname+':';
const CACHE=PREFIX+'__BUILD_ID__';
const FILES=['./','./index.html','./style.css','./app.js','./core.js','./storage.js','./catalog.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./LICENSE-exercises.txt','./FUENTES.md','./INSTALAR-ANDROID.md'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(event.request);if(cached)return cached;
  try{return await fetch(event.request)}catch(error){if(event.request.mode==='navigate')return (await cache.match(new URL('index.html',scope).href))||Response.error();return Response.error()}
 }));
});
