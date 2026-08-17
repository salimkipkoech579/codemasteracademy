import React, { useState } from 'react';
import { 
  Tv, 
  BookOpen, 
  ExternalLink, 
  Search, 
  Compass, 
  Youtube, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Code, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Cpu, 
  HelpCircle,
  Play,
  Terminal,
  Server,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Bot
} from 'lucide-react';
import { CreatorChannel, ExternalResource } from '../types';
import { CREATOR_CHANNELS, EXTERNAL_RESOURCES } from '../data/coursesData';

interface ResourcesHubProps {
  darkMode: boolean;
  onSelectChannel?: (channel: CreatorChannel) => void;
  onNavigateToVisualGuides?: () => void;
}

export const ResourcesHub: React.FC<ResourcesHubProps> = ({ darkMode, onNavigateToVisualGuides }) => {
  const [activeTab, setActiveTab] = useState<'creators' | 'docs' | 'curriculum_map'>('creators');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlaylistModal, setSelectedPlaylistModal] = useState<{
    channelName: string;
    playlist: { title: string; url: string; level: string };
  } | null>(null);

  const categories = [
    'All',
    '1. Programming Fundamentals',
    '2. HTML & CSS',
    '3. JavaScript',
    '4. React & Frontend',
    '5. Backend Development',
    '6. Databases',
    '7. Git & GitHub',
    '8. Full-Stack Development',
    '9. Cybersecurity',
    '10. Docker & DevOps',
    '11. Cloud & Deployment',
    '12. Mobile Development',
    '13. UI/UX Design',
    '14. AI & Machine Learning',
    '15. Interview Preparation',
  ];

  const filteredChannels = CREATOR_CHANNELS.filter((ch) => {
    const matchesCat = selectedCategory === 'All' || ch.category.includes(selectedCategory.split('.')[1]?.trim() || selectedCategory);
    const matchesSearch = 
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredDocs = EXTERNAL_RESOURCES.filter((res) => {
    return (
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Curriculum Subject Topics map
  const domainRoadmaps = [
    {
      title: '1. Programming Fundamentals',
      icon: Code,
      creators: 'CS50, freeCodeCamp, Mosh',
      topics: ['Logic & Algorithms', 'Data Types & Variables', 'Control Flow & Loops', 'Functions & Scope', 'Arrays & Hash Maps', 'OOP Concepts']
    },
    {
      title: '2. HTML & CSS',
      icon: Palette,
      creators: 'Kevin Powell, Traversy Media, Net Ninja',
      topics: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Responsive Layouts', 'CSS Animations', 'Tailwind CSS', 'Container Queries']
    },
    {
      title: '3. JavaScript',
      icon: Terminal,
      creators: 'Web Dev Simplified, freeCodeCamp, Traversy Media',
      topics: ['ES6+ Modern Syntax', 'Async/Await & Promises', 'DOM Manipulation', 'Event Loop & Closures', 'Fetch API & Axios', 'Modules & Bundlers']
    },
    {
      title: '4. React & Frontend Frameworks',
      icon: Layers,
      creators: 'The Net Ninja, Academind, Codevolution',
      topics: ['JSX & Components', 'State & Props', 'React Hooks (useEffect, useMemo)', 'Next.js App Router', 'Tailwind & Styling', 'Zustand / Redux']
    },
    {
      title: '5. Backend Development',
      icon: Server,
      creators: 'Traversy Media, Dave Gray, Net Ninja',
      topics: ['Node.js & Express.js', 'NestJS Modular Backend', 'Django (Python)', 'Laravel (PHP)', 'Spring Boot (Java)', 'FastAPI (Python)']
    },
    {
      title: '6. Databases',
      icon: Database,
      creators: 'freeCodeCamp.org, Traversy Media',
      topics: ['MySQL Relational Schemas', 'PostgreSQL & Complex Queries', 'MongoDB Document Stores', 'Firebase Firestore Realtime', 'Redis Caching & In-Memory']
    },
    {
      title: '7. Git & GitHub',
      icon: Terminal,
      creators: 'Traversy Media, freeCodeCamp.org',
      topics: ['Version Control Basics', 'Branching & Merging', 'Git Rebase & Stash', 'Pull Requests & Code Reviews', 'GitHub Actions CI/CD']
    },
    {
      title: '8. Full-Stack Development',
      icon: Cpu,
      creators: 'freeCodeCamp, Traversy Media, Academind',
      topics: ['MERN Stack', 'PERN Stack', 'Next.js Full-Stack Architecture', 'REST & GraphQL APIs', 'Deployment Pipelines']
    },
    {
      title: '9. Cybersecurity',
      icon: ShieldCheck,
      creators: 'HackerSploit, John Hammond, NetworkChuck',
      topics: ['Secure Coding Practices', 'JWT & OAuth Authentication', 'HTTPS & SSL/TLS Encryption', 'SQL Injection Prevention', 'XSS & CSRF Vulnerabilities', 'API Gateway Security']
    },
    {
      title: '10. Docker & DevOps',
      icon: Layers,
      creators: 'TechWorld with Nana, Traversy Media',
      topics: ['Docker Containers & Images', 'Docker Compose Orchestration', 'Kubernetes Clusters', 'CI/CD Pipelines (GitHub Actions)', 'Infrastructure as Code (Terraform)']
    },
    {
      title: '11. Cloud & Deployment',
      icon: Cloud,
      creators: 'AWS, Google Cloud Tech, Microsoft Azure',
      topics: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Vercel & Netlify Edge', 'Nginx Reverse Proxies & SSL']
    },
    {
      title: '12. Mobile Development',
      icon: Smartphone,
      creators: 'Flutter, React Native Channels',
      topics: ['Flutter & Dart SDK', 'React Native & Expo', 'Mobile UI Components', 'Native API Integration', 'App Store & Play Store Deployment']
    },
    {
      title: '13. UI/UX Design',
      icon: Palette,
      creators: 'DesignCourse, Figma Community',
      topics: ['Figma Prototyping', 'Design Systems & Tokens', 'Color Theory & Typography', 'Accessibility (WCAG 2.1)', 'Micro-Interactions']
    },
    {
      title: '14. AI & Machine Learning',
      icon: Bot,
      creators: 'DeepLearningAI, freeCodeCamp.org',
      topics: ['Python for AI (NumPy, Pandas)', 'Machine Learning Models', 'Deep Learning & Neural Networks', 'LLMs & Prompt Engineering', 'LangChain & GenAI APIs']
    },
    {
      title: '15. Interview Preparation',
      icon: GraduationCap,
      creators: 'NeetCode, Abdul Bari',
      topics: ['Data Structures & Algorithms', 'LeetCode 150 Patterns', 'System Design Architecture', 'Coding Interview Whiteboarding', 'Behavioral STAR Method']
    }
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Banner */}
        <div className={`p-8 rounded-2xl border relative overflow-hidden transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Learning Ecosystem</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Top Software Engineering Creators & Developer Resources
            </h1>
            
            <p className={`text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Master full-stack programming, cybersecurity, DevOps, and algorithms with hand-picked YouTube educators, official documentation hubs, and structured domain roadmaps.
            </p>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 pt-2">
              {onNavigateToVisualGuides && (
                <button
                  onClick={onNavigateToVisualGuides}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Visual Language Guides 🎨</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('creators')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'creators'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : darkMode ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Featured Creators ({CREATOR_CHANNELS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('docs')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'docs'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : darkMode ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Official Developer Docs & Tools</span>
              </button>

              <button
                onClick={() => setActiveTab('curriculum_map')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'curriculum_map'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : darkMode ? 'bg-slate-700/60 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>15 Domain Roadmaps</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Founder Channel Card Callout */}
        <div className={`p-6 sm:p-8 rounded-2xl border-2 relative overflow-hidden shadow-lg transition-all ${
          darkMode 
            ? 'bg-gradient-to-r from-red-950/40 via-slate-800 to-red-900/30 border-red-500/50' 
            : 'bg-gradient-to-r from-red-50 via-white to-amber-50 border-red-300'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Victor Kipkoech Channel"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-red-500/40 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-white p-1 rounded-full text-xs">
                  <Youtube className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                  <span>★ Official Founder Channel</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Victor Kipkoech (@kipkoechvictor-hn2eo)</h2>
                <p className={`text-xs sm:text-sm max-w-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Follow & subscribe to Victor Kipkoech's YouTube channel for software engineering tutorials, full-stack code walkthroughs, project guides, and tech discussions. Leave your comments and questions!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Youtube className="w-5 h-5 fill-current" />
                <span>Subscribe & Comment</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center justify-between ${
          darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search creators, topics, or documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>

          {activeTab === 'creators' && (
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Filter Domain:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Creator Channels */}
        {activeTab === 'creators' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                    channel.isOfficialChannel
                      ? darkMode
                        ? 'bg-gradient-to-b from-red-950/40 to-slate-800 border-red-500/60 ring-2 ring-red-500/30'
                        : 'bg-gradient-to-b from-red-50 to-white border-red-300 ring-2 ring-red-400/30 shadow-md'
                      : darkMode ? 'bg-slate-800 border-slate-700/80 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header with Avatar & Subscribers */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={channel.avatarUrl}
                          alt={channel.name}
                          className={`w-12 h-12 rounded-xl object-cover ring-2 ${
                            channel.isOfficialChannel ? 'ring-red-500' : 'ring-blue-500/30'
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h3 className="font-bold text-base line-clamp-1">{channel.name}</h3>
                          </div>
                          <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <Youtube className="w-3.5 h-3.5 inline" /> {channel.subscribers}
                          </span>
                        </div>
                      </div>
                      {channel.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                          {channel.badge}
                        </span>
                      )}
                    </div>

                    <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {channel.description}
                    </p>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {channel.topics.map((topic) => (
                        <span
                          key={topic}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                            darkMode ? 'bg-slate-700/60 text-slate-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Recommended Playlists */}
                    {channel.recommendedPlaylists.length > 0 && (
                      <div className={`p-3 rounded-xl border text-xs space-y-2 ${
                        darkMode ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider">Top Playlists</div>
                        {channel.recommendedPlaylists.map((pl, idx) => (
                          <div key={idx} className="flex items-center justify-between group cursor-pointer" onClick={() => setSelectedPlaylistModal({ channelName: channel.name, playlist: pl })}>
                            <span className="truncate pr-2 group-hover:text-blue-500 transition-colors">{pl.title}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold whitespace-nowrap">{pl.level}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* External Channel Action */}
                  <div className="pt-4 mt-4 border-t border-slate-700/20 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">{channel.category}</span>
                    <a
                      href={channel.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors ${
                        channel.isOfficialChannel 
                          ? 'bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/30 font-bold' 
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>{channel.isOfficialChannel ? 'Subscribe & Comment' : 'Visit Channel'}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredChannels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No channels found matching your search query.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Official Developer Docs & Tools */}
        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  darkMode ? 'bg-slate-800 border-slate-700/80 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">{doc.name}</h3>
                        <span className="text-xs text-slate-400">{doc.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {doc.badge}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-700/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{doc.type}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: 15 Domain Curriculum Roadmaps */}
        {activeTab === 'curriculum_map' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainRoadmaps.map((domain, index) => {
              const IconComp = domain.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border p-6 space-y-4 transition-all ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{domain.title}</h3>
                      <p className="text-xs text-blue-500 font-medium">Recommended: {domain.creators}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Core Syllabus Topics</div>
                    <div className="space-y-1.5">
                      {domain.topics.map((t, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Playlist Preview Modal */}
      {selectedPlaylistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                {selectedPlaylistModal.channelName}
              </h3>
              <button
                onClick={() => setSelectedPlaylistModal(null)}
                className="text-slate-400 hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400 uppercase font-semibold">Playlist Title</div>
              <p className="font-medium text-sm">{selectedPlaylistModal.playlist.title}</p>
              <div className="inline-block px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-500 font-semibold">
                Level: {selectedPlaylistModal.playlist.level}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPlaylistModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700 text-slate-200"
              >
                Cancel
              </button>
              <a
                href={selectedPlaylistModal.playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
