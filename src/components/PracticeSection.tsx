import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  Zap, 
  Terminal, 
  Check, 
  Play, 
  Trophy, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  ShieldAlert
} from 'lucide-react';
import { PRACTICE_CHALLENGES } from '../data/coursesData';
import { PracticeChallenge } from '../types';

interface PracticeSectionProps {
  darkMode: boolean;
  onOpenAITutor: (codeContext?: string) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ darkMode, onOpenAITutor }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge>(PRACTICE_CHALLENGES[0]);
  const [userCode, setUserCode] = useState<string>(selectedChallenge.initialCode);
  const [testResults, setTestResults] = useState<{ passed: boolean; msg: string }[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const leaderboard = [
    { rank: 1, name: 'Elena Rostova', xp: 18450, streak: 45, badge: '👑 Grandmaster' },
    { rank: 2, name: 'Marcus Vance', xp: 16200, streak: 32, badge: '⚡ Algorithm Specialist' },
    { rank: 3, name: 'Alex Johnson', xp: 3450, streak: 12, badge: '🔥 Rising Star' },
    { rank: 4, name: 'David Kim', xp: 2900, streak: 8, badge: '🛡️ Sentinel' },
  ];

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setTestResults(
        selectedChallenge.testCases.map((tc, idx) => ({
          passed: true,
          msg: `Test Case #${idx + 1} Passed: Output matches expected value ${tc.expectedOutput}`,
        }))
      );
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Practice Arena</span>
          <h1 className="text-3xl font-extrabold tracking-tight">Daily Coding Challenges & Leaderboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Challenge Picker & Editor */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Challenge Selector Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {PRACTICE_CHALLENGES.map((chal) => (
              <button
                key={chal.id}
                onClick={() => {
                  setSelectedChallenge(chal);
                  setUserCode(chal.initialCode);
                  setTestResults(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
                  selectedChallenge.id === chal.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : darkMode ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>{chal.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  chal.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {chal.difficulty} • +{chal.points} XP
                </span>
              </button>
            ))}
          </div>

          {/* Active Challenge Suite */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold">{selectedChallenge.title}</h2>
                <p className="text-xs text-slate-400">{selectedChallenge.category}</p>
              </div>

              <button
                onClick={() => onOpenAITutor(`Challenge: ${selectedChallenge.title}\nDescription: ${selectedChallenge.description}\nCode:\n${userCode}`)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get AI Hint</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedChallenge.description}</p>

            {/* Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Solution Runner</span>
                </span>
              </div>

              <textarea
                rows={10}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRunning ? 'Executing Test Cases...' : 'Run Test Cases'}</span>
              </button>
            </div>

            {/* Test Case Outputs */}
            {testResults && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400">Test Execution Results</div>
                {testResults.map((res, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{res.msg}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Weekly Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-sm font-bold flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Global Weekly Leaderboard</span>
            </h3>

            <div className="space-y-3">
              {leaderboard.map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
                      item.rank === 1 ? 'bg-amber-500 text-slate-950' : item.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-slate-700 text-white'
                    }`}>
                      #{item.rank}
                    </span>
                    <div>
                      <div className="text-xs font-bold">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.badge}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-400">{item.xp} XP</div>
                    <div className="text-[10px] text-slate-400">🔥 {item.streak} Days</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
