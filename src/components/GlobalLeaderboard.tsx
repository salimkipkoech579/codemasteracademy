import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Flame,
  Zap,
  TrendingUp,
  Search,
  Filter,
  Medal,
  Award,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Info,
  Calendar,
  Globe,
  Star,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ThumbsUp,
  Clock
} from 'lucide-react';
import { User } from '../types';

export interface LeaderboardStudent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  weeklyXP: number;
  allTimeXP: number;
  streakDays: number;
  rankTitle: string;
  country: string;
  flag: string;
  favoriteTrack: string;
  isCurrentUser?: boolean;
  weeklyRankChange: number; // positive = gained positions, negative = dropped
  badgesCount: number;
  xpBreakdown: {
    lessons: number;
    exercises: number;
    quizzes: number;
    streakBonus: number;
  };
}

const MOCK_LEADERBOARD_STUDENTS: LeaderboardStudent[] = [
  {
    id: 'student-1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    role: 'Full-Stack Developer',
    weeklyXP: 2850,
    allTimeXP: 18450,
    streakDays: 42,
    rankTitle: 'Grandmaster Architect',
    country: 'United States',
    flag: '🇺🇸',
    favoriteTrack: 'JavaScript & React',
    weeklyRankChange: 2,
    badgesCount: 18,
    xpBreakdown: { lessons: 900, exercises: 1200, quizzes: 450, streakBonus: 300 }
  },
  {
    id: 'student-2',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'AI & Systems Specialist',
    weeklyXP: 2620,
    allTimeXP: 16900,
    streakDays: 38,
    rankTitle: 'Master Engineer',
    country: 'Canada',
    flag: '🇨🇦',
    favoriteTrack: 'AI & Machine Learning',
    weeklyRankChange: 1,
    badgesCount: 15,
    xpBreakdown: { lessons: 850, exercises: 1100, quizzes: 420, streakBonus: 250 }
  },
  {
    id: 'student-3',
    name: 'Kipkoech Victor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'Lead Full-Stack Instructor',
    weeklyXP: 2410,
    allTimeXP: 15800,
    streakDays: 29,
    rankTitle: 'Senior Code Ninja',
    country: 'Kenya',
    flag: '🇰🇪',
    favoriteTrack: 'Python',
    weeklyRankChange: 3,
    badgesCount: 22,
    xpBreakdown: { lessons: 750, exercises: 1050, quizzes: 380, streakBonus: 230 }
  },
  {
    id: 'student-4',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    role: 'DevOps & Cloud Engineer',
    weeklyXP: 2150,
    allTimeXP: 14200,
    streakDays: 24,
    rankTitle: 'Cloud Architect',
    country: 'Germany',
    flag: '🇩🇪',
    favoriteTrack: 'DevOps & Cloud',
    weeklyRankChange: -1,
    badgesCount: 12,
    xpBreakdown: { lessons: 700, exercises: 900, quizzes: 350, streakBonus: 200 }
  },
  {
    id: 'student-5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Backend Systems Engineer',
    weeklyXP: 1980,
    allTimeXP: 12850,
    streakDays: 19,
    rankTitle: 'Systems Specialist',
    country: 'South Korea',
    flag: '🇰🇷',
    favoriteTrack: 'Rust & Systems',
    weeklyRankChange: 4,
    badgesCount: 11,
    xpBreakdown: { lessons: 600, exercises: 850, quizzes: 330, streakBonus: 200 }
  },
  {
    id: 'student-6',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'Frontend UI/UX Coder',
    weeklyXP: 1820,
    allTimeXP: 11400,
    streakDays: 16,
    rankTitle: 'UI Architecture Master',
    country: 'India',
    flag: '🇮🇳',
    favoriteTrack: 'JavaScript & React',
    weeklyRankChange: 0,
    badgesCount: 14,
    xpBreakdown: { lessons: 550, exercises: 800, quizzes: 320, streakBonus: 150 }
  },
  {
    id: 'student-7',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    role: 'Cybersecurity Student',
    weeklyXP: 1650,
    allTimeXP: 9800,
    streakDays: 14,
    rankTitle: 'Security Specialist',
    country: 'United Kingdom',
    flag: '🇬🇧',
    favoriteTrack: 'Python',
    weeklyRankChange: -2,
    badgesCount: 9,
    xpBreakdown: { lessons: 500, exercises: 700, quizzes: 300, streakBonus: 150 }
  },
  {
    id: 'student-8',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    role: 'Machine Learning Student',
    weeklyXP: 1420,
    allTimeXP: 8750,
    streakDays: 11,
    rankTitle: 'Data Wizard',
    country: 'Japan',
    flag: '🇯🇵',
    favoriteTrack: 'AI & Machine Learning',
    weeklyRankChange: 1,
    badgesCount: 8,
    xpBreakdown: { lessons: 450, exercises: 600, quizzes: 250, streakBonus: 120 }
  }
];

interface GlobalLeaderboardProps {
  currentUser?: User;
  darkMode: boolean;
  onSelectCourse?: (track: string) => void;
}

export const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  currentUser,
  darkMode,
  onSelectCourse,
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'all_time'>('weekly');
  const [trackFilter, setTrackFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cheeredStudentId, setCheeredStudentId] = useState<string | null>(null);
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);

  const tracks = ['All', 'Python', 'JavaScript & React', 'DevOps & Cloud', 'AI & Machine Learning', 'Rust & Systems'];

  // Combine currentUser into leaderboard if not present
  const allStudents = React.useMemo(() => {
    let list = [...MOCK_LEADERBOARD_STUDENTS];
    if (currentUser) {
      const exists = list.some((s) => s.id === currentUser.id || s.name.toLowerCase() === currentUser.name.toLowerCase());
      if (!exists) {
        list.push({
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
          role: 'Active Student',
          weeklyXP: 1450,
          allTimeXP: currentUser.xp || 4200,
          streakDays: currentUser.streakDays || 7,
          rankTitle: currentUser.rank || 'Code Scholar',
          country: 'Global',
          flag: '🌐',
          favoriteTrack: 'JavaScript & React',
          isCurrentUser: true,
          weeklyRankChange: 2,
          badgesCount: currentUser.badges?.length || 5,
          xpBreakdown: { lessons: 450, exercises: 600, quizzes: 250, streakBonus: 150 }
        });
      }
    }
    return list;
  }, [currentUser]);

  // Sort by selected timeframe (weekly or allTime)
  const sortedStudents = React.useMemo(() => {
    return [...allStudents]
      .filter((student) => {
        const matchesTrack = trackFilter === 'All' || student.favoriteTrack === trackFilter;
        const matchesSearch =
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.country.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTrack && matchesSearch;
      })
      .sort((a, b) => {
        if (timeframe === 'weekly') {
          return b.weeklyXP - a.weeklyXP;
        }
        return b.allTimeXP - a.allTimeXP;
      });
  }, [allStudents, timeframe, trackFilter, searchQuery]);

  const topThree = sortedStudents.slice(0, 3);
  const remainingStudents = sortedStudents.slice(3);

  // Find user's position
  const currentUserIndex = sortedStudents.findIndex((s) => s.isCurrentUser || (currentUser && s.name === currentUser.name));
  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : 4;
  const currentStudentObj = currentUserIndex !== -1 ? sortedStudents[currentUserIndex] : null;

  const handleCheer = (studentId: string) => {
    setCheeredStudentId(studentId);
    setTimeout(() => setCheeredStudentId(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Banner for Cheering */}
      {cheeredStudentId && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-amber-500/50 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>🙌 Sent high-five encouragement to top student!</span>
        </div>
      )}

      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Global Student Leaderboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Top Coders & XP Honor Roll
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Compete with students worldwide by completing lessons, passing quizzes, and solving coding exercises. Earn XP points and climb the rankings!
            </p>
          </div>

          {/* Timeframe Filter Buttons & Countdown Timer */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 ${
                  timeframe === 'weekly'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Weekly Ranking</span>
              </button>

              <button
                onClick={() => setTimeframe('all_time')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 ${
                  timeframe === 'all_time'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>All-Time Honor Roll</span>
              </button>
            </div>

            {timeframe === 'weekly' && (
              <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Weekly Reset in: <strong className="text-amber-400 font-bold">2d 14h 32m</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current User Rank Spotlight Banner */}
      {currentStudentObj && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentStudentObj.avatar}
                alt={currentStudentObj.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-indigo-600 text-white text-[10px] font-extrabold">
                #{currentUserRank}
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Your Standing</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Top 5% Student
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span>{currentStudentObj.name}</span>
                <span className="text-xs text-slate-400">({currentStudentObj.rankTitle})</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="text-center sm:text-right">
              <span className="text-slate-400 text-[10px] block font-bold">CURRENT XP SCORE</span>
              <span className="text-base font-extrabold text-amber-400">
                {timeframe === 'weekly' ? currentStudentObj.weeklyXP : currentStudentObj.allTimeXP} XP
              </span>
            </div>

            <div className="text-center sm:text-right border-l border-slate-800 pl-4">
              <span className="text-slate-400 text-[10px] block font-bold">STREAK</span>
              <span className="text-base font-extrabold text-amber-500 flex items-center justify-center sm:justify-end gap-1">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>{currentStudentObj.streakDays} Days</span>
              </span>
            </div>

            {currentUserRank > 1 && sortedStudents[currentUserRank - 2] && (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <span>Gap to #{currentUserRank - 1}: </span>
                <strong className="text-indigo-400 font-extrabold">
                  +{(timeframe === 'weekly' ? sortedStudents[currentUserRank - 2].weeklyXP - currentStudentObj.weeklyXP : sortedStudents[currentUserRank - 2].allTimeXP - currentStudentObj.allTimeXP) + 10} XP
                </strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* 2nd Place - Silver */}
          <div className={`p-6 rounded-3xl border shadow-xl relative flex flex-col justify-between space-y-4 order-2 md:order-1 ${
            darkMode ? 'bg-slate-900/80 border-slate-700/80' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black bg-slate-400/20 text-slate-300 border border-slate-400/30 flex items-center space-x-1">
              <Medal className="w-3.5 h-3.5 text-slate-300" />
              <span>2ND PLACE</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="relative">
                <img
                  src={topThree[1].avatar}
                  alt={topThree[1].name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-400 shadow-xl"
                />
                <span className="absolute -bottom-2 right-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-slate-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-slate-900">
                  2
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base flex items-center justify-center space-x-1">
                  <span>{topThree[1].name}</span>
                  <span className="text-sm">{topThree[1].flag}</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">{topThree[1].rankTitle}</p>
                <p className="text-[10px] text-slate-500">{topThree[1].favoriteTrack}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
              <div className="text-xl font-black text-slate-200">
                {timeframe === 'weekly' ? topThree[1].weeklyXP : topThree[1].allTimeXP} <span className="text-xs text-slate-400">XP</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Flame className="w-3 h-3 fill-amber-500" /> {topThree[1].streakDays}d
                </span>
                <span>•</span>
                <span className="text-slate-300 font-semibold">{topThree[1].badgesCount} Badges</span>
              </div>
            </div>

            <button
              onClick={() => handleCheer(topThree[1].id)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
              <span>High-Five</span>
            </button>
          </div>

          {/* 1st Place - Gold Champion */}
          <div className={`p-6 rounded-3xl border-2 shadow-2xl relative flex flex-col justify-between space-y-4 order-1 md:order-2 transform md:-translate-y-4 ${
            darkMode ? 'bg-slate-900 border-amber-500/80 ring-2 ring-amber-500/20' : 'bg-amber-50/50 border-amber-400'
          }`}>
            <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-lg flex items-center space-x-1 animate-pulse">
              <Crown className="w-4 h-4 fill-current" />
              <span>1ST CHAMPION</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="relative">
                <img
                  src={topThree[0].avatar}
                  alt={topThree[0].name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-400 shadow-2xl"
                />
                <span className="absolute -bottom-2 right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  1
                </span>
              </div>

              <div>
                <h3 className="font-black text-lg text-amber-400 flex items-center justify-center space-x-1">
                  <span>{topThree[0].name}</span>
                  <span className="text-base">{topThree[0].flag}</span>
                </h3>
                <p className="text-xs text-amber-300/80 font-bold">{topThree[0].rankTitle}</p>
                <p className="text-[11px] text-slate-400">{topThree[0].favoriteTrack}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-1">
              <div className="text-2xl font-black text-amber-400">
                {timeframe === 'weekly' ? topThree[0].weeklyXP : topThree[0].allTimeXP} <span className="text-xs text-amber-300/70">XP</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-extrabold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> {topThree[0].streakDays} Day Streak
                </span>
                <span>•</span>
                <span className="text-amber-200 font-bold">{topThree[0].badgesCount} Badges</span>
              </div>
            </div>

            <button
              onClick={() => handleCheer(topThree[0].id)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-amber-500/20"
            >
              <Crown className="w-4 h-4 fill-current" />
              <span>Salute Champion</span>
            </button>
          </div>

          {/* 3rd Place - Bronze */}
          <div className={`p-6 rounded-3xl border shadow-xl relative flex flex-col justify-between space-y-4 order-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-700/80' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black bg-amber-700/20 text-amber-500 border border-amber-700/30 flex items-center space-x-1">
              <Medal className="w-3.5 h-3.5 text-amber-600" />
              <span>3RD PLACE</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="relative">
                <img
                  src={topThree[2].avatar}
                  alt={topThree[2].name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-700 shadow-xl"
                />
                <span className="absolute -bottom-2 right-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center border-2 border-slate-900">
                  3
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base flex items-center justify-center space-x-1">
                  <span>{topThree[2].name}</span>
                  <span className="text-sm">{topThree[2].flag}</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">{topThree[2].rankTitle}</p>
                <p className="text-[10px] text-slate-500">{topThree[2].favoriteTrack}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
              <div className="text-xl font-black text-slate-200">
                {timeframe === 'weekly' ? topThree[2].weeklyXP : topThree[2].allTimeXP} <span className="text-xs text-slate-400">XP</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Flame className="w-3 h-3 fill-amber-500" /> {topThree[2].streakDays}d
                </span>
                <span>•</span>
                <span className="text-slate-300 font-semibold">{topThree[2].badgesCount} Badges</span>
              </div>
            </div>

            <button
              onClick={() => handleCheer(topThree[2].id)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
              <span>High-Five</span>
            </button>
          </div>

        </div>
      )}

      {/* Track Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
          {tracks.map((tr) => (
            <button
              key={tr}
              onClick={() => setTrackFilter(tr)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                trackFilter === tr
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or country..."
            className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Leaderboard Table List (Positions 4+) */}
      <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs font-extrabold text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="w-8 text-center">RANK</span>
            <span>STUDENT DETAILS</span>
          </div>
          <div className="flex items-center space-x-8 pr-2">
            <span className="hidden sm:inline">STREAK</span>
            <span className="w-24 text-right">EARNED XP</span>
            <span className="w-8"></span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {sortedStudents.map((student, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            const xpVal = timeframe === 'weekly' ? student.weeklyXP : student.allTimeXP;
            const topXP = timeframe === 'weekly' ? sortedStudents[0].weeklyXP : sortedStudents[0].allTimeXP;
            const progressPercent = Math.min(100, Math.round((xpVal / (topXP || 1)) * 100));
            const isExpanded = expandedBreakdownId === student.id;

            return (
              <React.Fragment key={student.id}>
                <div
                  className={`p-4 flex items-center justify-between text-xs transition-all ${
                    student.isCurrentUser
                      ? 'bg-indigo-950/40 border-l-4 border-l-indigo-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Rank & Student Info */}
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-8 text-center font-black text-sm">
                      {rank === 1 ? (
                        <span className="text-amber-400">🥇</span>
                      ) : rank === 2 ? (
                        <span className="text-slate-300">🥈</span>
                      ) : rank === 3 ? (
                        <span className="text-amber-600">🥉</span>
                      ) : (
                        <span className="text-slate-500">#{rank}</span>
                      )}
                    </div>

                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                    />

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-slate-100 flex items-center gap-1">
                          <span>{student.name}</span>
                          <span>{student.flag}</span>
                        </span>
                        {student.isCurrentUser && (
                          <span className="px-2 py-0.2 rounded text-[10px] font-black bg-indigo-500 text-white">
                            YOU
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                        <span>{student.role}</span>
                        <span>•</span>
                        <span className="text-indigo-400 font-semibold">{student.favoriteTrack}</span>
                      </div>
                    </div>
                  </div>

                  {/* XP Bar & Stats */}
                  <div className="flex items-center space-x-6">
                    {/* Weekly Rank Shift */}
                    <div className="hidden md:flex items-center space-x-1 text-[11px]">
                      {student.weeklyRankChange > 0 ? (
                        <span className="text-emerald-400 font-bold flex items-center">
                          <ChevronUp className="w-3.5 h-3.5" /> +{student.weeklyRankChange}
                        </span>
                      ) : student.weeklyRankChange < 0 ? (
                        <span className="text-rose-400 font-bold flex items-center">
                          <ChevronDown className="w-3.5 h-3.5" /> {student.weeklyRankChange}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold">—</span>
                      )}
                    </div>

                    {/* Streak Days */}
                    <div className="hidden sm:flex items-center space-x-1 text-amber-500 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{student.streakDays}d</span>
                    </div>

                    {/* XP Progress Bar & Total */}
                    <div className="w-28 text-right space-y-1">
                      <div className="font-black text-sm text-amber-400">
                        {xpVal} <span className="text-[10px] text-slate-500">XP</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Expand XP Breakdown Toggle */}
                    <button
                      onClick={() => setExpandedBreakdownId(isExpanded ? null : student.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                      title="View XP Source Breakdown"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded XP Breakdown Details */}
                {isExpanded && (
                  <div className="p-4 bg-slate-950/80 border-t border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">LESSON COMPLETIONS</span>
                      <strong className="text-emerald-400 text-sm">+{student.xpBreakdown.lessons} XP</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">CODING EXERCISES</span>
                      <strong className="text-indigo-400 text-sm">+{student.xpBreakdown.exercises} XP</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">QUIZZES & TESTS</span>
                      <strong className="text-amber-400 text-sm">+{student.xpBreakdown.quizzes} XP</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">STREAK BONUS</span>
                      <strong className="text-purple-400 text-sm">+{student.xpBreakdown.streakBonus} XP</strong>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Footer Info Box: How XP is Earned */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs space-y-3">
        <h4 className="font-extrabold text-slate-200 text-sm flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>How to Earn XP & Rise Up the Ranks:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Complete Lessons & Code</span>
            </div>
            <p className="text-[11px]">Earn +50 XP for reading lessons and +100 XP for passing interactive coding exercises.</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Maintain Daily Streaks</span>
            </div>
            <p className="text-[11px]">Log in daily to stack streak multipliers! 7-day streak grants a +200 XP bonus boost.</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Earn Certificates</span>
            </div>
            <p className="text-[11px]">Finish complete course learning paths to claim verified certificates and +500 XP rewards.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
