// Service Worker for CodeMaster Academy - Offline Course & Lesson Content Caching

const CACHE_VERSION = 'codemaster-v2';
const STATIC_CACHE_NAME = `codemaster-static-${CACHE_VERSION}`;
const COURSE_CACHE_NAME = `codemaster-courses-${CACHE_VERSION}`;
const MEDIA_CACHE_NAME = `codemaster-media-${CACHE_VERSION}`;

// Static shell files to pre-cache during installation
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/favicon.ico'
];

// 1. Service Worker Installation
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching App Shell & Core Assets');
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn(`[ServiceWorker] Could not pre-cache ${url}:`, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Service Worker Activation & Old Cache Cleanup
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating Service Worker...');
  const currentCaches = [STATIC_CACHE_NAME, COURSE_CACHE_NAME, MEDIA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log(`[ServiceWorker] Deleting obsolete cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event Interception & Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests or browser extension requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // A. AI Endpoints (/api/ai/*): Network-only with graceful offline JSON fallback
  if (url.pathname.startsWith('/api/ai/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            reply: '⚡ You are currently offline. AI Tutor features require an active internet connection. However, your saved course lessons, code exercises, and study notes remain fully available!',
            explanation: '⚡ Offline Mode: Connect to the internet to generate live AI code explanations.',
            debugResult: '⚡ Offline Mode: Connect to the internet to use AI debugging.',
            isOfflineFallback: true
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // B. Offline API Mock Routes (/offline-api/*): Cache-first
  if (url.pathname.startsWith('/offline-api/')) {
    event.respondWith(
      caches.open(COURSE_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // C. HTML Navigation Requests: Network-first, fall back to cached index.html
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const indexFallback = await caches.match('/index.html');
          if (indexFallback) return indexFallback;
          return new Response(
            `<!DOCTYPE html><html><head><title>Offline Mode - CodeMaster</title></head><body><h1>CodeMaster Academy - Offline Mode</h1><p>You are viewing cached offline content.</p></body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // D. Static Assets (JS, CSS, fonts, images): Stale-while-revalidate / Cache-first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            const targetCache = url.pathname.match(/\.(png|jpg|jpeg|svg|webp|mp4)$/i)
              ? MEDIA_CACHE_NAME
              : STATIC_CACHE_NAME;
            caches.open(targetCache).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch((err) => {
          console.warn(`[ServiceWorker] Network fetch failed for ${request.url}, using cache if available.`, err);
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Custom Message Handling from React Client
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.type) return;

  if (data.type === 'CACHE_COURSE') {
    const course = data.course;
    if (course && course.id) {
      caches.open(COURSE_CACHE_NAME).then((cache) => {
        const courseUrl = `/offline-api/course/${course.id}`;
        const response = new Response(JSON.stringify(course), {
          headers: { 'Content-Type': 'application/json' }
        });
        cache.put(courseUrl, response);
        console.log(`[ServiceWorker] Successfully cached course ${course.id} (${course.title}) for offline access`);

        if (event.source && event.source.postMessage) {
          event.source.postMessage({
            type: 'COURSE_CACHED_SUCCESS',
            courseId: course.id,
            title: course.title
          });
        }
      });
    }
  }

  if (data.type === 'REMOVE_COURSE') {
    const courseId = data.courseId;
    if (courseId) {
      caches.open(COURSE_CACHE_NAME).then((cache) => {
        cache.delete(`/offline-api/course/${courseId}`);
        console.log(`[ServiceWorker] Removed course ${courseId} from offline cache`);
      });
    }
  }

  if (data.type === 'CACHE_ALL_COURSES') {
    const courses = data.courses;
    if (Array.isArray(courses)) {
      caches.open(COURSE_CACHE_NAME).then((cache) => {
        const response = new Response(JSON.stringify(courses), {
          headers: { 'Content-Type': 'application/json' }
        });
        cache.put('/offline-api/courses', response);
        
        courses.forEach((c) => {
          cache.put(`/offline-api/course/${c.id}`, new Response(JSON.stringify(c), {
            headers: { 'Content-Type': 'application/json' }
          }));
        });
        console.log(`[ServiceWorker] Successfully pre-cached all ${courses.length} courses for offline access`);
      });
    }
  }

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
