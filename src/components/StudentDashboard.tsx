import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Download, 
  Share2, 
  Play, 
  Check,
  Bell,
  Youtube,
  ExternalLink,
  TrendingUp,
  BarChart2,
  Video,
  Sparkles,
  Layers,
  Filter,
  Trophy
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { User, Certificate, Course } from '../types';
import { COURSES } from '../data/coursesData';
import { MOCK_CERTIFICATES } from '../data/mockUserData';
import { GlobalLeaderboard } from './GlobalLeaderboard';

// Weekly Learning Activity Dataset over the last 7 days
const WEEKLY_PROGRESS_DATA = [
  {
    day: 'Mon',
    fullDate: 'Jul 27',
    lessonsCompleted: 3,
    xpEarned: 150,
    skillLearned: 'Modern JavaScript ES6+ & Async/Await',
    category: 'JavaScript',
    tutorialUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
    tutorialTitle: 'JS Async/Await & Event Loop Masterclass'
  },
  {
    day: 'Tue',
    fullDate: 'Jul 28',
    lessonsCompleted: 5,
    xpEarned: 250,
    skillLearned: 'React 19 & Full-Stack Architecture',
    category: 'React & Frontend',
    tutorialUrl: 'https://youtube.com/results?search_query=React+19+Fullstack+Tutorial',
    tutorialTitle: 'React 19 Server Components & Hooks Tutorial'
  },
  {
    day: 'Wed',
    fullDate: 'Jul 29',
    lessonsCompleted: 2,
    xpEarned: 100,
    skillLearned: 'Python Data Science & FastAPI',
    category: 'Backend API',
    tutorialUrl: 'https://youtube.com/results?search_query=Python+FastAPI+REST+API+Tutorial',
    tutorialTitle: 'FastAPI Async Backend Development Guide'
  },
  {
    day: 'Thu',
    fullDate: 'Jul 30',
    lessonsCompleted: 6,
    xpEarned: 300,
    skillLearned: 'OWASP Security & Web Defense',
    category: 'Cybersecurity',
    tutorialUrl: 'https://youtube.com/results?search_query=OWASP+Top+10+Web+Security+Tutorial',
    tutorialTitle: 'OWASP Top 10 Web Vulnerability Walkthrough'
  },
  {
    day: 'Fri',
    fullDate: 'Jul 31',
    lessonsCompleted: 4,
    xpEarned: 200,
    skillLearned: 'Docker Containers & DevOps Pipelines',
    category: 'DevOps & Cloud',
    tutorialUrl: 'https://youtube.com/results?search_query=Docker+Containerization+DevOps+Tutorial',
    tutorialTitle: 'Docker & Kubernetes Containerization Tutorial'
  },
  {
    day: 'Sat',
    fullDate: 'Aug 01',
    lessonsCompleted: 7,
    xpEarned: 350,
    skillLearned: 'Gemini AI API & Server Integration',
    category: 'Artificial Intelligence',
    tutorialUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
    tutorialTitle: 'Integrating Gemini AI API in React & Express'
  },
  {
    day: 'Sun',
    fullDate: 'Aug 02',
    lessonsCompleted: 3,
    xpEarned: 150,
    skillLearned: 'Data Structures & System Design',
    category: 'Algorithms',
    tutorialUrl: 'https://youtube.com/results?search_query=System+Design+Data+Structures+Tutorial',
    tutorialTitle: 'System Design & Algorithm Problem Solving'
  }
];

const CustomTooltip = ({ active, payload, darkMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={`p-3.5 rounded-xl border shadow-2xl text-xs space-y-1.5 max-w-xs ${
        darkMode ? 'bg-slate-900/95 border-slate-700 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-800'
      }`}>
        <div className="font-bold border-b pb-1.5 border-slate-700/40 flex justify-between items-center gap-2">
          <span>{data.day} ({data.fullDate})</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-bold">
            {data.category}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs pt-0.5">
          <span className="text-slate-400">Lessons Completed:</span>
          <span className="font-extrabold text-emerald-400 text-sm">{data.lessonsCompleted} lessons</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">XP Gained:</span>
          <span className="font-extrabold text-amber-400">+{data.xpEarned} XP</span>
        </div>
        <div className="pt-1.5 text-[11px] border-t border-slate-800 text-slate-300">
          <span className="text-slate-400">Skill Practiced: </span>
          <span className="font-bold text-indigo-300">{data.skillLearned}</span>
        </div>
      </div>
    );
  }
  return null;
};

interface StudentDashboardProps {
  user: User;
  darkMode: boolean;
  onSelectCourse: (course: Course) => void;
  onViewCertificates: () => void;
  setActiveTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  darkMode,
  onSelectCourse,
  onViewCertificates,
  setActiveTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'leaderboard' | 'bookmarks' | 'assignments' | 'calendar'>('overview');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const enrolledCourses = COURSES.filter((c) => user.enrolledCourseIds.includes(c.id));
  const totalWeeklyLessons = WEEKLY_PROGRESS_DATA.reduce((acc, curr) => acc + curr.lessonsCompleted, 0);
  const totalWeeklyXP = WEEKLY_PROGRESS_DATA.reduce((acc, curr) => acc + curr.xpEarned, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Profile Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        darkMode ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800' : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-slate-200'
      }`}>
        <div className="flex items-center space-x-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-lg" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {user.subscriptionPlan.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.rank} • Joined {user.joinedDate}</p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <div>
              <div className="text-sm font-bold text-amber-500">{user.streakDays} Days</div>
              <div className="text-[10px] text-slate-400 font-semibold">Active Streak</div>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400" />
            <div>
              <div className="text-sm font-bold text-indigo-400">{user.xp} XP</div>
              <div className="text-[10px] text-slate-400 font-semibold">Earned Points</div>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-sm font-bold text-emerald-400">{MOCK_CERTIFICATES.length} Earned</div>
              <div className="text-[10px] text-slate-400 font-semibold">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
            activeSubTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Learning Overview
        </button>
        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'leaderboard' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Global Leaderboard 🏆</span>
        </button>
        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
            activeSubTab === 'bookmarks' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Bookmarked Lessons ({user.bookmarkedLessonIds.length})
        </button>
        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
            activeSubTab === 'assignments' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Project Assignments
        </button>
        <button
          onClick={() => setActiveSubTab('calendar')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
            activeSubTab === 'calendar' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Study Calendar & Reminders
        </button>
      </div>

      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Quick Global Leaderboard Banner Teaser */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/50 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Global Leaderboard Spotlight</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    Weekly & All-Time Rankings
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white mt-0.5">
                  You are ranked <strong className="text-amber-400">#4</strong> with <strong className="text-indigo-300">{user.xp} XP</strong>! Climb to top 3 for special badges.
                </h3>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('leaderboard')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
            >
              <span>View Full Rankings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Learning Progress Chart Card (Recharts) */}
          <div className={`p-6 sm:p-7 rounded-3xl border shadow-xl space-y-6 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-800/80">
              <div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-black tracking-tight">Weekly Learning Progress</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Last 7 Days
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Displays daily lessons completed and skill mastery stats over the last week.
                </p>
              </div>

              {/* Chart Controls & Quick Summary Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-3 pr-3 border-r border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Lessons</span>
                    <span className="font-extrabold text-emerald-400 text-sm">{totalWeeklyLessons}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Weekly XP</span>
                    <span className="font-extrabold text-amber-400 text-sm">+{totalWeeklyXP}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Daily Avg</span>
                    <span className="font-extrabold text-blue-400 text-sm">{(totalWeeklyLessons / 7).toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center p-1 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <button
                    onClick={() => setChartType('area')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                      chartType === 'area'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Area</span>
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                      chartType === 'bar'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Bar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recharts Render Canvas */}
            <div className="w-full h-[260px] min-h-[260px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'area' ? (
                  <AreaChart data={WEEKLY_PROGRESS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="lessonsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} opacity={0.5} />
                    <XAxis 
                      dataKey="day" 
                      stroke={darkMode ? '#94a3b8' : '#64748b'} 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke={darkMode ? '#94a3b8' : '#64748b'} 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                    <Area
                      type="monotone"
                      dataKey="lessonsCompleted"
                      name="Lessons Completed"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#lessonsGradient)"
                      activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={WEEKLY_PROGRESS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} opacity={0.5} />
                    <XAxis 
                      dataKey="day" 
                      stroke={darkMode ? '#94a3b8' : '#64748b'} 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke={darkMode ? '#94a3b8' : '#64748b'} 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                    <Bar 
                      dataKey="lessonsCompleted" 
                      name="Lessons Completed"
                      fill="#3b82f6" 
                      radius={[6, 6, 0, 0]} 
                      barSize={28}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Quick Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800/60 text-slate-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span>Lessons Completed</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span>XP Gained (+150 - +350/day)</span>
                </span>
              </div>
              <span className="text-[11px]">Hover over data points to inspect skills & topics learned</span>
            </div>

          </div>

          {/* Watch Video Tutorials for Skills Learned Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold flex items-center space-x-2">
                  <Video className="w-5 h-5 text-red-500" />
                  <span>Watch Video Tutorials for Skills Learned</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct links to full video tutorials and walkthroughs for each skill practiced over the last week.
                </p>
              </div>

              <a
                href="https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all"
              >
                <Youtube className="w-3.5 h-3.5 fill-current" />
                <span>Visit Official Channel</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WEEKLY_PROGRESS_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all hover:border-blue-500/50 hover:shadow-lg ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {item.day} • {item.lessonsCompleted} Lessons
                      </span>
                    </div>

                    <h4 className="font-bold text-xs line-clamp-2">{item.skillLearned}</h4>
                    <p className={`text-[11px] line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      📺 {item.tutorialTitle}
                    </p>
                  </div>

                  <a
                    href={item.tutorialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all border border-red-500/20 group"
                  >
                    <Youtube className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span>Watch Tutorial Video</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Main Column & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Column: Continue Learning */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Continue Learning</h2>
                <button onClick={() => setActiveTab('paths')} className="text-xs text-blue-500 hover:underline">
                  Explore Catalog
                </button>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const totalLessons = course.lessons.length || 1;
                  const completedCount = course.lessons.filter((l) => user.completedLessonIds.includes(l.id)).length;
                  const progressPct = Math.round((completedCount / totalLessons) * 100) || 35;

                  return (
                    <div
                      key={course.id}
                      className={`p-5 rounded-2xl border space-y-4 transition-all hover:border-blue-500/50 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                          {course.category}
                        </span>
                        <h3 className="text-base font-bold mt-1">{course.title}</h3>
                        <p className="text-xs text-slate-400">{course.lessons.length} Lessons • {course.duration}</p>
                      </div>

                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 self-start sm:self-center"
                      >
                        <span>Resume Lesson</span>
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                        <span>Course Progress</span>
                        <span>{progressPct}% Completed</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Column: Badges & Certificates */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Unlocked Badges */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Unlocked Achievements</span>
              </h3>

              <div className="space-y-3">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      🏆
                    </div>
                    <div>
                      <div className="text-xs font-bold">{badge.name}</div>
                      <div className="text-[10px] text-slate-400">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Certificates Callout */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">Certificates</h3>
                <button onClick={onViewCertificates} className="text-xs text-blue-400 hover:underline">
                  View All
                </button>
              </div>

              {MOCK_CERTIFICATES.slice(0, 2).map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 text-xs space-y-2">
                  <div className="font-bold text-blue-200">{cert.courseTitle}</div>
                  <div className="text-[10px] text-slate-400">Issued: {cert.issueDate} • ID: {cert.verificationId}</div>
                  <button
                    onClick={onViewCertificates}
                    className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center justify-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Share</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Official Creator Channel Subscription Widget */}
            <div className={`p-5 rounded-2xl border-2 space-y-3 relative overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-b from-red-950/40 to-slate-900 border-red-500/40' 
                : 'bg-gradient-to-b from-red-50 to-white border-red-200'
            }`}>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Victor Kipkoech"
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500"
                />
                <div>
                  <div className="text-xs font-bold flex items-center gap-1 text-red-500">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Official YouTube Channel</span>
                  </div>
                  <div className="text-sm font-black">Victor Kipkoech</div>
                </div>
              </div>
              <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Subscribe to Victor Kipkoech (@kipkoechvictor-hn2eo) for full-stack engineering tutorials, coding walkthroughs, and technical insights.
              </p>
              <a
                href="https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-red-600/20 transition-all"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>Subscribe & Comment</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>
      </div>
      )}

      {activeSubTab === 'leaderboard' && (
        <GlobalLeaderboard
          currentUser={user}
          darkMode={darkMode}
          onSelectCourse={(track) => {
            const course = COURSES.find((c) => c.title.toLowerCase().includes(track.toLowerCase()));
            if (course) onSelectCourse(course);
          }}
        />
      )}

      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Saved Lesson Bookmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.flatMap(c => c.lessons).filter(l => user.bookmarkedLessonIds.includes(l.id)).map(lesson => (
              <div key={lesson.id} className={`p-4 rounded-xl border flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <div className="font-bold text-xs">{lesson.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Duration: {lesson.duration}</div>
                </div>
                <button
                  onClick={() => {
                    const c = COURSES.find(crs => crs.id === lesson.courseId);
                    if (c) onSelectCourse(c);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
                >
                  Read Lesson
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'assignments' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Project Assignment Submissions</h2>
          <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Approved • Score 98/100</span>
                <h3 className="font-bold text-sm mt-1">Real-Time AI Code Reviewer Bot</h3>
              </div>
              <button onClick={() => setActiveTab('projects')} className="text-xs text-blue-400 hover:underline">View Spec</button>
            </div>
            <p className="text-xs text-slate-400">Feedback: Excellent server-side Gemini proxy pattern and clean markdown rendering.</p>
          </div>
        </div>
      )}

      {activeSubTab === 'calendar' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Study Calendar & Reminder Schedule</h2>
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold pb-2 border-b border-slate-800">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={`p-2 rounded-lg border ${i === 11 ? 'bg-blue-600 text-white font-bold border-blue-400' : 'bg-slate-800/40 border-slate-800'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
