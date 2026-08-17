import { useState, useEffect, useCallback } from 'react';
import { Course } from '../types';

const OFFLINE_COURSES_KEY = 'codemaster_offline_courses_v1';
const LAST_SYNC_KEY = 'codemaster_offline_last_sync';

// 1. Service Worker Registration Helper
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('[OfflineManager] Service Worker registered successfully with scope:', registration.scope);
        
        // Listen for updates
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[OfflineManager] New version available! Refreshing offline cache...');
              }
            };
          }
        };
        return registration;
      })
      .catch((error) => {
        console.warn('[OfflineManager] Service Worker registration failed:', error);
        return null;
      });
  } else {
    console.warn('[OfflineManager] Service Worker is not supported in this browser.');
    return Promise.resolve(null);
  }
}

// 2. Helper to send message to active Service Worker
function sendSWMessage(message: any) {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}

// 3. Save a course for offline viewing
export async function saveCourseForOffline(course: Course): Promise<boolean> {
  try {
    // A. Store metadata in localStorage index for instant synchronous retrieval
    const existingRaw = localStorage.getItem(OFFLINE_COURSES_KEY);
    let coursesMap: { [id: string]: Course } = existingRaw ? JSON.parse(existingRaw) : {};
    coursesMap[course.id] = course;
    localStorage.setItem(OFFLINE_COURSES_KEY, JSON.stringify(coursesMap));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    // B. Post message to Service Worker to cache in CacheStorage
    sendSWMessage({
      type: 'CACHE_COURSE',
      course: course
    });

    // C. Also store directly in CacheStorage via Cache API if available in window context
    if ('caches' in window) {
      const cache = await caches.open('codemaster-courses-v2');
      const response = new Response(JSON.stringify(course), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(`/offline-api/course/${course.id}`, response);
    }

    return true;
  } catch (err) {
    console.error('[OfflineManager] Error saving course for offline:', err);
    return false;
  }
}

// 4. Save ALL courses for offline access
export async function saveAllCoursesForOffline(courses: Course[]): Promise<boolean> {
  try {
    const coursesMap: { [id: string]: Course } = {};
    courses.forEach((c) => {
      coursesMap[c.id] = c;
    });
    localStorage.setItem(OFFLINE_COURSES_KEY, JSON.stringify(coursesMap));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    sendSWMessage({
      type: 'CACHE_ALL_COURSES',
      courses: courses
    });

    if ('caches' in window) {
      const cache = await caches.open('codemaster-courses-v2');
      await cache.put('/offline-api/courses', new Response(JSON.stringify(courses), {
        headers: { 'Content-Type': 'application/json' }
      }));
      for (const c of courses) {
        await cache.put(`/offline-api/course/${c.id}`, new Response(JSON.stringify(c), {
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    }

    return true;
  } catch (err) {
    console.error('[OfflineManager] Error saving all courses for offline:', err);
    return false;
  }
}

// 5. Remove course from offline cache
export async function removeOfflineCourse(courseId: string): Promise<boolean> {
  try {
    const existingRaw = localStorage.getItem(OFFLINE_COURSES_KEY);
    if (existingRaw) {
      let coursesMap: { [id: string]: Course } = JSON.parse(existingRaw);
      delete coursesMap[courseId];
      localStorage.setItem(OFFLINE_COURSES_KEY, JSON.stringify(coursesMap));
    }

    sendSWMessage({
      type: 'REMOVE_COURSE',
      courseId: courseId
    });

    if ('caches' in window) {
      const cache = await caches.open('codemaster-courses-v2');
      await cache.delete(`/offline-api/course/${courseId}`);
    }

    return true;
  } catch (err) {
    console.error('[OfflineManager] Error removing offline course:', err);
    return false;
  }
}

// 6. Retrieve stored offline courses
export function getOfflineCourses(): Course[] {
  try {
    const existingRaw = localStorage.getItem(OFFLINE_COURSES_KEY);
    if (!existingRaw) return [];
    const coursesMap: { [id: string]: Course } = JSON.parse(existingRaw);
    return Object.values(coursesMap);
  } catch (err) {
    console.error('[OfflineManager] Error reading offline courses:', err);
    return [];
  }
}

// 7. Check if specific course is saved offline
export function isCourseSavedOffline(courseId: string): boolean {
  try {
    const existingRaw = localStorage.getItem(OFFLINE_COURSES_KEY);
    if (!existingRaw) return false;
    const coursesMap: { [id: string]: Course } = JSON.parse(existingRaw);
    return !!coursesMap[courseId];
  } catch {
    return false;
  }
}

// 8. Clear all offline cached materials
export async function clearOfflineCache(): Promise<void> {
  localStorage.removeItem(OFFLINE_COURSES_KEY);
  localStorage.removeItem(LAST_SYNC_KEY);
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  }
}

// 9. Custom React Hook: useOfflineStatus()
export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [savedCourses, setSavedCourses] = useState<Course[]>(getOfflineCourses());
  const [swActive, setSwActive] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string>(localStorage.getItem(LAST_SYNC_KEY) || '');

  // Track online/offline browser state
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker status
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      setSwActive(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const refreshSavedCourses = useCallback(() => {
    setSavedCourses(getOfflineCourses());
    setLastSynced(localStorage.getItem(LAST_SYNC_KEY) || '');
  }, []);

  const saveCourse = useCallback(async (course: Course) => {
    const success = await saveCourseForOffline(course);
    if (success) {
      refreshSavedCourses();
    }
    return success;
  }, [refreshSavedCourses]);

  const removeCourse = useCallback(async (courseId: string) => {
    const success = await removeOfflineCourse(courseId);
    if (success) {
      refreshSavedCourses();
    }
    return success;
  }, [refreshSavedCourses]);

  const saveAll = useCallback(async (courses: Course[]) => {
    const success = await saveAllCoursesForOffline(courses);
    if (success) {
      refreshSavedCourses();
    }
    return success;
  }, [refreshSavedCourses]);

  const clearAll = useCallback(async () => {
    await clearOfflineCache();
    refreshSavedCourses();
  }, [refreshSavedCourses]);

  const isCourseSaved = useCallback((courseId: string) => {
    return savedCourses.some((c) => c.id === courseId);
  }, [savedCourses]);

  // Estimate total cache size in MB based on JSON string length
  const cacheSizeEstimate = (JSON.stringify(savedCourses).length / (1024 * 1024)).toFixed(2);

  return {
    isOffline,
    savedCourses,
    savedCourseIds: savedCourses.map((c) => c.id),
    saveCourse,
    removeCourse,
    saveAll,
    clearAll,
    isCourseSaved,
    cacheStats: {
      totalCourses: savedCourses.length,
      cacheSizeMB: cacheSizeEstimate,
      serviceWorkerActive: swActive,
      lastSynced
    }
  };
}
