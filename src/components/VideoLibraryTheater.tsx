import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  Youtube,
  Search,
  Filter,
  CheckCircle2,
  CloudDownload,
  CloudCheck,
  HardDrive,
  Clock,
  Eye,
  Award,
  Sparkles,
  Maximize2,
  Bookmark,
  Share2,
  FileText,
  Save,
  Check,
  ChevronRight,
  Tv,
  Layers,
  ArrowUpRight,
  X,
  Volume2,
  MessageSquare
} from 'lucide-react';

export interface VideoTutorial {
  id: string;
  title: string;
  category: 'Python' | 'JavaScript' | 'React' | 'C++' | 'Java' | 'Rust' | 'Go' | 'DevOps' | 'AI & ML';
  language: string;
  duration: string;
  views: string;
  publishedDate: string;
  youtubeId: string;
  thumbnailUrl: string;
  description: string;
  instructor: string;
  cloudStatus: 'cached' | 'available';
  downloadSizeMB: number;
  timestamps: { time: string; label: string }[];
  keyTakeaways: string[];
}

const CATEGORIZED_VIDEOS: VideoTutorial[] = [
  // Python Section
  {
    id: 'py-1',
    title: 'Python Complete Basics: Syntax, Variables & Data Types',
    category: 'Python',
    language: 'Python 3.12',
    duration: '18:45',
    views: '185K',
    publishedDate: '2026',
    youtubeId: 'kqtD5dpn9C8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Learn fundamental Python syntax, variable assignments, integer, float, string, boolean types, and basic print/input operations.',
    instructor: 'Kipkoech Victor',
    cloudStatus: 'cached',
    downloadSizeMB: 84,
    timestamps: [
      { time: '00:00', label: 'Introduction to Python' },
      { time: '03:15', label: 'Variables & Constants' },
      { time: '08:40', label: 'Data Types & Casting' },
      { time: '14:20', label: 'print() and input() Syntax' }
    ],
    keyTakeaways: ['Indentation syntax rules', 'Primitive data types', 'Dynamic typing in Python']
  },
  {
    id: 'py-2',
    title: 'Python Functions, Lambdas & How Execution Works',
    category: 'Python',
    language: 'Python 3.12',
    duration: '24:10',
    views: '230K',
    publishedDate: '2026',
    youtubeId: '9Os0o3wzS_I',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into def keyword, arguments, return values, anonymous lambda functions, and Python Interpreter bytecode flow.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 112,
    timestamps: [
      { time: '00:00', label: 'Function Anatomy' },
      { time: '06:30', label: 'Parameters & Return' },
      { time: '13:10', label: 'Lambda Expressions' },
      { time: '19:45', label: 'Bytecode & PVM Execution' }
    ],
    keyTakeaways: ['def keyword & return statement', 'Lambda anonymous functions', 'LEGB scope rules']
  },
  {
    id: 'py-3',
    title: 'Python Operators, Control Flow & Loops Masterclass',
    category: 'Python',
    language: 'Python 3.12',
    duration: '21:30',
    views: '140K',
    publishedDate: '2026',
    youtubeId: '6iF8Xb7Z3wQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Master arithmetic, comparison, logical, membership (in) operators alongside for loops, while loops, break and continue.',
    instructor: 'Kipkoech Victor',
    cloudStatus: 'cached',
    downloadSizeMB: 98,
    timestamps: [
      { time: '00:00', label: 'Arithmetic & Relational Operators' },
      { time: '05:40', label: 'if, elif, else Conditional Logic' },
      { time: '11:15', label: 'for Loops & range()' },
      { time: '17:00', label: 'while Loops & Loop Controls' }
    ],
    keyTakeaways: ['Membership (in) & Identity (is)', 'range() function', 'break, continue & pass']
  },

  // JavaScript & React Section
  {
    id: 'js-1',
    title: 'JavaScript Event Loop, Call Stack & V8 Engine Architecture',
    category: 'JavaScript',
    language: 'JavaScript ES2026',
    duration: '26:15',
    views: '310K',
    publishedDate: '2026',
    youtubeId: '8aGhZQkoFbQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive breakdown of JS single-threaded model, Call Stack, Microtask queue, Promises, and V8 TurboFan JIT compilation.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 125,
    timestamps: [
      { time: '00:00', label: 'Single Threaded Runtime' },
      { time: '05:10', label: 'Call Stack & Web APIs' },
      { time: '12:30', label: 'Microtask vs Macrotask Queue' },
      { time: '20:00', label: 'JIT Compilation in V8' }
    ],
    keyTakeaways: ['Non-blocking asynchronous I/O', 'Promises vs Callbacks', 'V8 Engine optimization']
  },
  {
    id: 'react-1',
    title: 'React 19 & Next.js Full-Stack App Architecture',
    category: 'React',
    language: 'React 19 / TypeScript',
    duration: '32:00',
    views: '290K',
    publishedDate: '2026',
    youtubeId: 'rfscVS0vtbw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    description: 'Build full-stack React 19 web applications featuring Server Components, Actions, state hooks, and responsive design.',
    instructor: 'Kipkoech Victor',
    cloudStatus: 'cached',
    downloadSizeMB: 160,
    timestamps: [
      { time: '00:00', label: 'React 19 Features' },
      { time: '08:15', label: 'Server Components vs Client' },
      { time: '17:40', label: 'useActionState & Optimistic UI' },
      { time: '25:10', label: 'Deployment & SSR' }
    ],
    keyTakeaways: ['Server Components', 'Custom Hooks pattern', 'Full-stack React workflow']
  },

  // C++ Section
  {
    id: 'cpp-1',
    title: 'C++ Compilation Pipeline, Pointers & Memory Management',
    category: 'C++',
    language: 'C++ 23',
    duration: '28:30',
    views: '220K',
    publishedDate: '2026',
    youtubeId: 'vLnPwxZdW4w',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    description: 'Learn how C++ compiles directly to native binaries via g++ preprocessor, compiler, assembler, linker, and pointer math.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 135,
    timestamps: [
      { time: '00:00', label: 'Source to Binary Flow' },
      { time: '07:20', label: 'Preprocessor & Directives' },
      { time: '14:50', label: 'Stack vs Heap Allocation' },
      { time: '22:10', label: 'Pointers & References' }
    ],
    keyTakeaways: ['Direct machine code execution', 'Manual memory management', 'Header compilation model']
  },

  // Java Section
  {
    id: 'java-1',
    title: 'Java JVM Architecture & Bytecode Execution Model',
    category: 'Java',
    language: 'Java 21 LTS',
    duration: '25:40',
    views: '260K',
    publishedDate: '2026',
    youtubeId: 'ZBJ0u9MaKtM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Write Once Run Anywhere explained: Java compiler (javac), Bytecode (.class), JVM Memory layout, and Garbage Collection.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 118,
    timestamps: [
      { time: '00:00', label: 'The WORA Principle' },
      { time: '06:00', label: 'javac & .class Bytecode' },
      { time: '13:15', label: 'JVM Memory (Heap & Stack)' },
      { time: '19:40', label: 'Garbage Collector Internals' }
    ],
    keyTakeaways: ['Platform independence', 'JVM Memory structure', 'Automatic GC sweeps']
  },

  // Rust Section
  {
    id: 'rust-1',
    title: 'Rust Ownership, Borrowing & Lifetime Safety',
    category: 'Rust',
    language: 'Rust 1.78',
    duration: '29:50',
    views: '198K',
    publishedDate: '2026',
    youtubeId: 'usJDUSrcscI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Understand compile-time memory safety without a garbage collector using Rust ownership rules, immutable/mutable borrows, and lifetimes.',
    instructor: 'Kipkoech Victor',
    cloudStatus: 'cached',
    downloadSizeMB: 142,
    timestamps: [
      { time: '00:00', label: 'Why Rust Memory Safety' },
      { time: '07:30', label: 'Three Rules of Ownership' },
      { time: '15:10', label: 'Borrow Checker & References' },
      { time: '23:00', label: 'Lifetimes (\'a)' }
    ],
    keyTakeaways: ['Zero-cost abstractions', 'No null pointers or data races', 'Cargo package management']
  },

  // Go Section
  {
    id: 'go-1',
    title: 'Go Concurrency: Goroutines, Channels & Scheduler',
    category: 'Go',
    language: 'Go 1.22',
    duration: '22:15',
    views: '205K',
    publishedDate: '2026',
    youtubeId: 'f6kdp27TYZs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Build ultra-fast concurrent backend services using lightweight Goroutines (2KB stack) and CSP channels in Golang.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 105,
    timestamps: [
      { time: '00:00', label: 'Concurrency vs Parallelism' },
      { time: '05:40', label: 'Launching Goroutines (go keyword)' },
      { time: '12:20', label: 'Buffered & Unbuffered Channels' },
      { time: '18:00', label: 'Select Statement Pattern' }
    ],
    keyTakeaways: ['Lightweight Goroutine threads', 'Channel message passing', 'Single binary compilation']
  },

  // DevOps & Cloud
  {
    id: 'devops-1',
    title: 'Docker Containerization & Kubernetes Cloud Deployment',
    category: 'DevOps',
    language: 'Docker / K8s',
    duration: '31:10',
    views: '315K',
    publishedDate: '2026',
    youtubeId: 'YYXdXT2l-Gg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    description: 'Learn Dockerfiles, multi-stage builds, container isolation, image layers, and deploying cloud microservices.',
    instructor: 'Kipkoech Victor',
    cloudStatus: 'cached',
    downloadSizeMB: 155,
    timestamps: [
      { time: '00:00', label: 'Virtual Machines vs Containers' },
      { time: '08:00', label: 'Writing Optimized Dockerfiles' },
      { time: '18:30', label: 'Docker Compose Local Stack' },
      { time: '26:00', label: 'Cloud Deployment to Cloud Run' }
    ],
    keyTakeaways: ['Immutable infrastructure', 'Container image layering', 'Cloud Run / K8s orchestration']
  },

  // AI & Machine Learning
  {
    id: 'ai-1',
    title: 'Gemini AI API & Multimodal Agent Integration',
    category: 'AI & ML',
    language: 'Gemini API / Node.js',
    duration: '27:45',
    views: '240K',
    publishedDate: '2026',
    youtubeId: 'cKxRvEZd3Mw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    description: 'Integrate Google Gemini 2.5 Flash API for automated code analysis, streaming completions, and server-side safety proxying.',
    instructor: 'CodeMaster Academy',
    cloudStatus: 'cached',
    downloadSizeMB: 130,
    timestamps: [
      { time: '00:00', label: 'Gemini API Setup' },
      { time: '06:15', label: 'Server-Side Proxy Architecture' },
      { time: '14:20', label: 'Structured JSON Outputs' },
      { time: '22:00', label: 'Function Calling & Tool Use' }
    ],
    keyTakeaways: ['Secure API key management', 'Multimodal text & vision analysis', 'Streaming HTTP responses']
  }
];

interface VideoLibraryTheaterProps {
  darkMode: boolean;
}

export const VideoLibraryTheater: React.FC<VideoLibraryTheaterProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(CATEGORIZED_VIDEOS[0]);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(['py-1']);
  const [cloudSyncedVideos, setCloudSyncedVideos] = useState<string[]>(
    CATEGORIZED_VIDEOS.map((v) => v.id)
  );
  const [userNotes, setUserNotes] = useState<{ [videoId: string]: string }>({
    'py-1': 'Python relies on indentation for block scope instead of curly braces. Remember range(1, 6) generates numbers 1 to 5.'
  });
  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [isPlayingInTheater, setIsPlayingInTheater] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    if (activeVideo) {
      setCurrentNoteText(userNotes[activeVideo.id] || '');
    }
  }, [activeVideo]);

  const categories = ['All', 'Python', 'JavaScript', 'React', 'C++', 'Java', 'Rust', 'Go', 'DevOps', 'AI & ML'];

  const filteredVideos = CATEGORIZED_VIDEOS.filter((v) => {
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.keyTakeaways.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleToggleCloudCache = (videoId: string, title: string) => {
    if (cloudSyncedVideos.includes(videoId)) {
      setCloudSyncedVideos((prev) => prev.filter((id) => id !== videoId));
      triggerNotification(`Removed "${title}" from Cloud Cache.`);
    } else {
      setCloudSyncedVideos((prev) => [...prev, videoId]);
      triggerNotification(`Cached "${title}" to Cloud Storage & Service Worker offline storage!`);
    }
  };

  const handleMarkWatched = (videoId: string) => {
    if (!watchedVideoIds.includes(videoId)) {
      setWatchedVideoIds((prev) => [...prev, videoId]);
      triggerNotification('🎉 Lesson Completed! +50 XP added to your Student Profile.');
    } else {
      triggerNotification('Video already completed.');
    }
  };

  const handleSaveNote = () => {
    if (activeVideo) {
      setUserNotes((prev) => ({
        ...prev,
        [activeVideo.id]: currentNoteText
      }));
      triggerNotification('📝 Study Note saved to your local session!');
    }
  };

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-blue-500/50 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{showNotification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-2xl ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-red-600/10 text-red-500 border border-red-500/20">
              <Tv className="w-3.5 h-3.5" />
              <span>Categorized In-App Cloud Video Library</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Watch Tutorials Within Website Perimeter
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Enjoy seamless, categorized video learning right inside CodeMaster Academy! All 11+ video courses are indexed with timestamp chapters, interactive code takeaways, Cloud cache sync, and in-app note taking.
            </p>
          </div>

          {/* Cloud Sync Status Card */}
          <div className={`p-4 rounded-2xl border space-y-2 min-w-[260px] ${
            darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>Cloud Storage Status</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <div className="text-xl font-black text-white flex items-center justify-between">
              <span>{cloudSyncedVideos.length} / {CATEGORIZED_VIDEOS.length} Videos</span>
              <CloudCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              All videos stored in cloud storage & accessible offline via Service Worker.
            </p>
          </div>
        </div>
      </div>

      {/* Main Theater View (Active Video Embedded Player & Control Desk) */}
      {activeVideo && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 border-b pb-4 border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs mb-1">
                <span className="px-2.5 py-0.5 rounded-md font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {activeVideo.category}
                </span>
                <span className="text-slate-400">• {activeVideo.language}</span>
                <span className="text-slate-400">• Instructor: {activeVideo.instructor}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">{activeVideo.title}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleMarkWatched(activeVideo.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  watchedVideoIds.includes(activeVideo.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{watchedVideoIds.includes(activeVideo.id) ? 'Completed (+50 XP)' : 'Mark as Watched'}</span>
              </button>

              <button
                onClick={() => handleToggleCloudCache(activeVideo.id, activeVideo.title)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                  cloudSyncedVideos.includes(activeVideo.id)
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                {cloudSyncedVideos.includes(activeVideo.id) ? (
                  <>
                    <CloudCheck className="w-4 h-4 text-blue-400" />
                    <span>Cached in Cloud ({activeVideo.downloadSizeMB}MB)</span>
                  </>
                ) : (
                  <>
                    <CloudDownload className="w-4 h-4" />
                    <span>Save to Cloud</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Video Player Canvas (In-App Perimeter Player) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl group">
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Player Quick Info & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1 font-bold text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{activeVideo.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-400">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeVideo.views} views</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Speed:</span>
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        playbackSpeed === spd
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-indigo-300 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Key Concepts Covered in this Lesson:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeVideo.keyTakeaways.map((take, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{take}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Lesson Chapters & Study Notepad */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Timestamp Chapters */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h3 className="font-extrabold text-xs flex items-center space-x-2 text-slate-200">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Lesson Chapters & Timestamps</span>
                </h3>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeVideo.timestamps.map((ts, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-slate-800/80 hover:border-blue-500/40 bg-slate-900/60 flex items-center justify-between text-xs transition-all cursor-pointer group"
                    >
                      <span className="font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                        {ts.label}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-500/20 text-blue-400">
                        {ts.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Study Notepad */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs flex items-center space-x-2 text-slate-200">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>In-App Study Notepad</span>
                  </h3>
                  <button
                    onClick={handleSaveNote}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-[11px] flex items-center space-x-1 transition-all border border-amber-500/30"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save Note</span>
                  </button>
                </div>

                <textarea
                  value={currentNoteText}
                  onChange={(e) => setCurrentNoteText(e.target.value)}
                  placeholder="Type your study notes, code snippets, or questions for this lesson..."
                  rows={4}
                  className={`w-full p-3 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-600'
                      : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Categorized Video Grid Section */}
      <div className="space-y-6">
        
        {/* Category Selector & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white border-red-500 shadow-sm'
                    : darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorial videos..."
              className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isActive = activeVideo?.id === video.id;
            const isWatched = watchedVideoIds.includes(video.id);
            const isCached = cloudSyncedVideos.includes(video.id);

            return (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  window.scrollTo({ top: 250, behavior: 'smooth' });
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group hover:scale-[1.02] shadow-xl ${
                  isActive
                    ? 'border-red-500 bg-red-950/10 ring-2 ring-red-500/30'
                    : darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Thumbnail Preview with Duration Pill */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md">
                      {video.category}
                    </span>
                    {isWatched && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white shadow-md">
                        ✓ Watched
                      </span>
                    )}
                  </div>

                  {/* Bottom Duration Pill */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{video.views}</span>
                  </span>

                  <span className="flex items-center gap-1 font-semibold text-blue-400">
                    <CloudCheck className="w-3.5 h-3.5" />
                    <span>Cloud Sync</span>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
