// This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// Check to make sure Sync is supported.
if ('serviceWorker' in navigator && 'SyncManager' in window) {

  // Get our service worker registration.
  const registration = await navigator.serviceWorker.registration;

  try {
    // This is where we request our sync. 
    // We give it a "tag" to allow for differing sync behavior.
    await registration.sync.register('database-sync');

  } catch {
    console.log("Background Sync failed.")
  }
}

