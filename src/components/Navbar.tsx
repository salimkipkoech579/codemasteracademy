import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  User as UserIcon, 
  BookOpen, 
  Terminal, 
  Award, 
  MessageSquare, 
  Layers, 
  ShieldAlert, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  Menu,
  X,
  Shield,
  GraduationCap,
  Compass,
  WifiOff,
  HardDrive,
  Tv
} from 'lucide-react';
import { User, UserRole } from '../types';
import { useOfflineStatus } from '../lib/offlineManager';

interface NavbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onRoleChange: (role: UserRole) => void;
  onOpenAITutor: () => void;
  onOpenOfflineModal?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenAuth,
  onRoleChange,
  onOpenAITutor,
  onOpenOfflineModal,
  searchQuery,
  setSearchQuery,
}) => {
  const { isOffline, cacheStats } = useOfflineStatus();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Certificate Available!', time: '2 hours ago', read: false },
    { id: 2, title: 'Instructor replied to your post', time: '5 hours ago', read: false },
    { id: 3, title: 'Streak milestone: 12 Days 🔥', time: '1 day ago', read: true },
  ];

  const navItems = [
    { id: 'landing', label: 'Explore', icon: BookOpen },
    { id: 'visual_guides', label: 'Visual Guides 🎨', icon: Sparkles },
    { id: 'video_library', label: 'Video Library 📹', icon: Tv },
    { id: 'paths', label: 'Learning Paths', icon: Layers },
    { id: 'resources', label: 'Resources & Docs', icon: Compass },
    { id: 'playground', label: 'Playground', icon: Terminal },
    { id: 'practice', label: 'Challenges', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'forum', label: 'Community', icon: MessageSquare },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      darkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CodeMaster
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest block text-slate-500 -mt-1">
                Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? darkMode 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                      : darkMode
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative w-64">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, JS, Python..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-all ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center space-x-2.5">
            
            {/* Offline Mode / Service Worker Cache Button */}
            {onOpenOfflineModal && (
              <button
                onClick={onOpenOfflineModal}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isOffline
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse'
                    : cacheStats.totalCourses > 0
                    ? darkMode ? 'bg-blue-900/30 border-blue-500/40 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                    : darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
                title={isOffline ? 'Offline Mode Active' : `Offline Cache: ${cacheStats.totalCourses} courses saved`}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Offline</span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Offline ({cacheStats.totalCourses})</span>
                  </>
                )}
              </button>
            )}

            {/* AI Tutor Quick Access Button */}
            <button
              onClick={onOpenAITutor}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:opacity-90 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>


            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-all ${
                darkMode ? 'border-slate-800 hover:bg-slate-800 text-yellow-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-lg border relative transition-all ${
                  darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border p-3 z-50 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] text-blue-500 hover:underline cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-2 rounded-lg text-xs ${n.read ? 'opacity-60' : darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <div className="font-medium">{n.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Dashboard Switcher */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg border border-slate-700/40 hover:bg-slate-800/50 transition-all"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-blue-500" />
                  <span className="hidden sm:inline text-xs font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border p-3 z-50 ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <div className="p-2 border-b border-slate-700/50 mb-2">
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                      <div className="mt-1 flex items-center space-x-2 text-[10px] text-amber-400 font-medium">
                        <span>🔥 {user.streakDays} Day Streak</span>
                        <span>•</span>
                        <span>⭐ {user.xp} XP</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => { setActiveTab('dashboard'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-blue-600/10 hover:text-blue-400"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Student Dashboard</span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('instructor'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-blue-600/10 hover:text-blue-400"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Instructor Portal</span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('admin'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-blue-600/10 hover:text-blue-400"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>

                      {/* Quick Role Switcher */}
                      <div className="pt-2 border-t border-slate-700/50 mt-2">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Active Role</div>
                        <div className="grid grid-cols-3 gap-1">
                          {(['student', 'instructor', 'admin'] as UserRole[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => { onRoleChange(r); setUserDropdownOpen(false); }}
                              className={`py-1 text-[10px] rounded capitalize font-medium ${
                                user.role === r
                                  ? 'bg-blue-600 text-white'
                                  : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenAuth('login')}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 rounded text-red-400 hover:bg-red-500/10 mt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Switch Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 hover:bg-slate-800"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t p-4 space-y-2 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600/10"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white"
          >
            <UserIcon className="w-4 h-4" />
            <span>Student Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
