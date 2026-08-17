import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Crown,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Share2,
  Volume2,
  VolumeX,
  X,
  Zap,
  Star,
  Flame
} from 'lucide-react';
import { Course } from '../types';

interface ConfettiCelebrationProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onViewCertificate?: () => void;
  onContinueNextCourse?: () => void;
}

export const fireCourseCompletionConfetti = () => {
  // 1. Initial side cannons
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-burst sequence
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#3b82f6', '#8b5cf6']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#10b981', '#ec4899', '#f59e0b']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#eab308', '#6366f1', '#06b6d4']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // Secondary delayed stars fireworks burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f59e0b', '#10b981', '#8b5cf6']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#3b82f6', '#ec4899', '#eab308']
    });
  }, 400);
};

// Web Audio API Victory Chime
const playVictoryChime = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.45);
    });
  } catch (err) {
    // Audio Context blocked or unavailable
  }
};

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  course,
  isOpen,
  onClose,
  onViewCertificate,
  onContinueNextCourse,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fireCourseCompletionConfetti();
      if (soundEnabled) {
        playVictoryChime();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefireConfetti = () => {
    fireCourseCompletionConfetti();
    if (soundEnabled) {
      playVictoryChime();
    }
  };

  const handleShare = () => {
    const text = `🎉 I just completed the "${course.title}" course on CodeMaster Academy! Earned +500 XP and unlocked my verified completion certificate! 🚀`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Celebration Modal Container */}
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/80 shadow-2xl text-white space-y-6 overflow-hidden">
        
        {/* Shimmering Top Background Glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls: Sound & Close */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1.5 transition-all"
            title={soundEnabled ? 'Mute victory chime' : 'Enable victory chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="text-[11px] font-semibold">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trophy Header Icon Banner */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/40 ring-4 ring-amber-400/30 animate-bounce">
              <Trophy className="w-12 h-12 fill-slate-950" />
            </div>
            <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-indigo-600 text-white shadow-lg animate-pulse">
              <Crown className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Course Completed!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white pt-1">
              Congratulations! 🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              You've successfully finished all modules and masterclass exercises in <strong className="text-amber-400">{course.title}</strong>!
            </p>
          </div>
        </div>

        {/* Rewards Earned Showcase Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <div className="p-2.5 space-y-0.5">
            <Zap className="w-5 h-5 text-amber-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-bold block">XP BONUS</span>
            <strong className="text-sm font-black text-amber-400">+500 XP</strong>
          </div>

          <div className="p-2.5 space-y-0.5 border-x border-slate-800">
            <Award className="w-5 h-5 text-indigo-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-bold block">CERTIFICATE</span>
            <strong className="text-xs font-black text-emerald-400">UNLOCKED</strong>
          </div>

          <div className="p-2.5 space-y-0.5">
            <Flame className="w-5 h-5 text-rose-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-bold block">STREAK</span>
            <strong className="text-sm font-black text-rose-400">+1 DAY</strong>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="relative z-10 space-y-2.5 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRefireConfetti}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold text-xs flex items-center justify-center space-x-1.5 border border-amber-500/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Fire Confetti 🎊</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>{copiedShare ? 'Copied Share!' : 'Share Status'}</span>
            </button>
          </div>

          {onViewCertificate && (
            <button
              onClick={() => {
                onClose();
                onViewCertificate();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Award className="w-4 h-4 fill-current" />
              <span>View & Claim Verified Certificate</span>
            </button>
          )}

          {onContinueNextCourse && (
            <button
              onClick={() => {
                onClose();
                onContinueNextCourse();
              }}
              className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-white flex items-center justify-center space-x-1 transition-all"
            >
              <span>Explore More Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
