import React from 'react';
import { 
  WifiOff, 
  Wifi, 
  HardDrive, 
  Download, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  BookOpen, 
  Sparkles,
  RefreshCw,
  Layers
} from 'lucide-react';
import { useOfflineStatus } from '../lib/offlineManager';
import { COURSES } from '../data/coursesData';

interface OfflineManagerModalProps {
  isOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onSelectCourse?: (courseId: string) => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOpen,
  darkMode,
  onClose,
  onSelectCourse
}) => {
  const {
    isOffline,
    savedCourses,
    saveCourse,
    removeCourse,
    saveAll,
    clearAll,
    isCourseSaved,
    cacheStats
  } = useOfflineStatus();

  const [downloadingAll, setDownloadingAll] = React.useState(false);
  const [downloadMessage, setDownloadMessage] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCacheAll = async () => {
    setDownloadingAll(true);
    setDownloadMessage('Caching all courses and lesson content for offline access...');
    await saveAll(COURSES);
    setTimeout(() => {
      setDownloadingAll(false);
      setDownloadMessage('✓ All courses successfully cached in Service Worker!');
      setTimeout(() => setDownloadMessage(null), 3000);
    }, 800);
  };

  const handleToggleCourse = async (course: typeof COURSES[0]) => {
    if (isCourseSaved(course.id)) {
      await removeCourse(course.id);
    } else {
      await saveCourse(course);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          darkMode ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              isOffline ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'
            }`}>
              {isOffline ? <WifiOff className="w-5 h-5" /> : <HardDrive className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                Offline Course & Lesson Manager
              </h3>
              <p className="text-xs text-slate-400">
                Service Worker caches lesson materials, exercises, and quizzes for offline study.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Status & Service Worker Health Card */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOffline ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Network: {isOffline ? 'Offline Mode Active' : 'Connected to Internet'}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-400">Service Worker:</span>
                <span className="font-semibold text-emerald-400">
                  {cacheStats.serviceWorkerActive ? 'Active & Protecting Cache' : 'Registered'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className={`p-2.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-slate-400 text-[10px]">Saved Courses</div>
                <div className="text-sm font-black">{cacheStats.totalCourses} / {COURSES.length}</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-slate-400 text-[10px]">Estimated Storage</div>
                <div className="text-sm font-black">{cacheStats.cacheSizeMB} MB</div>
              </div>
              <div className={`col-span-2 sm:col-span-1 p-2.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-slate-400 text-[10px]">Offline Mode</div>
                <div className="text-sm font-black text-emerald-500">100% Ready</div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleCacheAll}
              disabled={downloadingAll}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingAll ? 'Caching All Materials...' : 'Cache All Courses for Offline Use'}</span>
            </button>

            {savedCourses.length > 0 && (
              <button
                onClick={clearAll}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Cache</span>
              </button>
            )}
          </div>

          {downloadMessage && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>{downloadMessage}</span>
            </div>
          )}

          {/* Course List with Individual Download/Remove Controls */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Select Courses to Save Offline</span>
              <span>{COURSES.length} Courses Available</span>
            </div>

            <div className="space-y-2">
              {COURSES.map((course) => {
                const saved = isCourseSaved(course.id);
                return (
                  <div
                    key={course.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      saved
                        ? darkMode ? 'bg-slate-800/90 border-blue-500/40' : 'bg-blue-50/60 border-blue-300'
                        : darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate pr-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-xs truncate">{course.title}</div>
                        <div className="text-[10px] text-slate-400">{course.lessons.length} Modules • {course.level}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {onSelectCourse && (
                        <button
                          onClick={() => {
                            onSelectCourse(course.id);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-blue-400 hover:bg-blue-500/10 border border-blue-500/20"
                        >
                          View
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleCourse(course)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                          saved
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        }`}
                      >
                        {saved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Saved Offline</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          darkMode ? 'bg-slate-800/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <span>Service Worker: Scope "/"</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
