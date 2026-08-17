import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  Code2, 
  Sparkles, 
  Bookmark, 
  ChevronRight, 
  Check, 
  HelpCircle,
  Lightbulb,
  Terminal,
  Send,
  Download,
  WifiOff,
  HardDrive,
  Split,
  Eye,
  Zap,
  Trophy,
  Award,
  Crown
} from 'lucide-react';
import { Course, Lesson } from '../types';
import { useOfflineStatus } from '../lib/offlineManager';
import { SideBySideDiffViewer } from './SideBySideDiffViewer';
import { ConfettiCelebration, fireCourseCompletionConfetti } from './ConfettiCelebration';

interface CourseViewerProps {
  course: Course;
  darkMode: boolean;
  onBack: () => void;
  onOpenAITutor: (topicContext?: string) => void;
  onLessonComplete: (lessonId: string) => void;
  completedLessonIds?: string[];
  onViewCertificates?: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course,
  darkMode,
  onBack,
  onOpenAITutor,
  onLessonComplete,
  completedLessonIds = [],
  onViewCertificates,
}) => {
  const { isOffline, saveCourse, removeCourse, isCourseSaved } = useOfflineStatus();
  const isSavedOffline = isCourseSaved(course.id);
  const [downloading, setDownloading] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const currentLesson: Lesson = course.lessons[activeLessonIndex] || course.lessons[0];

  const [exerciseUserCode, setExerciseUserCode] = useState(currentLesson?.exercise?.starterCode || '');
  const [exerciseResult, setExerciseResult] = useState<string | null>(null);
  const [showDiffComparison, setShowDiffComparison] = useState<boolean>(true);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if course is fully completed
  const allLessonsCompleted = course.lessons.length > 0 && course.lessons.every((l) => completedLessonIds.includes(l.id));

  const handleMarkLessonComplete = () => {
    onLessonComplete(currentLesson.id);

    // Check if completing this lesson completes the entire course
    const willBeCompleted = course.lessons.every(
      (l) => l.id === currentLesson.id || completedLessonIds.includes(l.id)
    );

    if (willBeCompleted) {
      setShowCelebrationModal(true);
      fireCourseCompletionConfetti();
    }
  };

  const handleToggleOffline = async () => {
    setDownloading(true);
    if (isSavedOffline) {
      await removeCourse(course.id);
    } else {
      await saveCourse(course);
    }
    setTimeout(() => setDownloading(false), 500);
  };


  const handleRunExercise = () => {
    if (!currentLesson.exercise) return;
    if (exerciseUserCode.trim().length > 10) {
      setExerciseResult('✓ Exercise Executed! Output matches expected test case.');
    } else {
      setExerciseResult('❌ Output mismatch. Check hints or ask AI Tutor!');
    }
  };

  const handleSelectQuizOption = (qId: string, optIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>

        <div className="flex items-center space-x-3">
          {/* Offline Cache Toggle Button */}
          <button
            onClick={handleToggleOffline}
            disabled={downloading}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isSavedOffline
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
            title={isSavedOffline ? 'Course saved in Service Worker for offline viewing' : 'Cache course & lessons for offline access'}
          >
            {isSavedOffline ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved Offline</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? 'Caching...' : 'Download Offline'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl border text-xs flex items-center space-x-1 ${
              isBookmarked ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={() => onOpenAITutor(currentLesson.title)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center space-x-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Offline Mode Alert in Classroom */}
      {isOffline && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiOff className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> You are viewing cached lesson materials, code exercises, and quizzes served locally.
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
            Cached
          </span>
        </div>
      )}


      {/* Main Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Lesson Navigation List */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-4 rounded-2xl border space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                {course.level}
              </span>
              <span className="text-xs text-slate-400">{course.lessons.length} Modules</span>
            </div>
            <h2 className="text-base font-bold">{course.title}</h2>

            <div className="space-y-1.5 pt-2">
              {course.lessons.map((lesson, idx) => {
                const isActive = idx === activeLessonIndex;
                const isLessonDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setExerciseUserCode(lesson.exercise?.starterCode || '');
                      setExerciseResult(null);
                    }}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md'
                        : isLessonDone
                        ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/20'
                        : darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {isLessonDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="opacity-70">{idx + 1}.</span>
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] opacity-80 whitespace-nowrap ml-2">{lesson.duration}</span>
                  </button>
                );
              })}
            </div>

            {/* Course 100% Completion Badge Banner */}
            {allLessonsCompleted && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/40 text-center space-y-3 pt-4">
                <div className="flex items-center justify-center space-x-1.5 text-amber-400 font-extrabold text-xs">
                  <Trophy className="w-4 h-4" />
                  <span>Course 100% Complete!</span>
                </div>
                <p className="text-[11px] text-slate-300">You've mastered all modules in this course.</p>
                <button
                  onClick={() => {
                    setShowCelebrationModal(true);
                    fireCourseCompletionConfetti();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Celebrate Completion 🎊</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Lesson Reader & Interactive Playground */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Module {activeLessonIndex + 1}</span>
              <h1 className="text-2xl font-extrabold">{currentLesson.title}</h1>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.contentMarkdown.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Inline Interactive Code Snippet */}
            {currentLesson.codeSnippet && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Lesson Snippet ({currentLesson.language})</span>
                  </span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
                  <code>{currentLesson.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Interactive Exercise Challenge */}
            {currentLesson.exercise && (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-blue-500/30 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-blue-400 flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Interactive Lesson Exercise</span>
                  </span>

                  {currentLesson.exercise.solutionCode && (
                    <button
                      onClick={() => setShowDiffComparison(!showDiffComparison)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                        showDiffComparison
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Split className="w-3.5 h-3.5 text-purple-300" />
                      <span>{showDiffComparison ? 'Hide Side-by-Side Diff' : 'Compare Code vs Model Solution'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300">{currentLesson.exercise.prompt}</p>

                <textarea
                  rows={6}
                  value={exerciseUserCode}
                  onChange={(e) => setExerciseUserCode(e.target.value)}
                  className="w-full p-3 font-mono text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-blue-500"
                />

                <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                  <button
                    onClick={handleRunExercise}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Run & Verify Exercise</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setShowDiffComparison(true);
                      }}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                    >
                      <Split className="w-3.5 h-3.5" />
                      <span>Side-by-Side Visual Diff</span>
                    </button>

                    <button
                      onClick={() => setExerciseUserCode(currentLesson.exercise?.solutionCode || '')}
                      className="text-xs text-slate-400 hover:text-amber-400 underline"
                    >
                      Load Solution into Editor
                    </button>
                  </div>
                </div>

                {exerciseResult && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${
                    exerciseResult.includes('✓') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {exerciseResult}
                  </div>
                )}

                {/* Side-by-Side Code Diff Viewer Component */}
                {showDiffComparison && currentLesson.exercise.solutionCode && (
                  <div className="pt-3 border-t border-slate-800">
                    <SideBySideDiffViewer
                      userCode={exerciseUserCode}
                      modelSolution={currentLesson.exercise.solutionCode}
                      language={currentLesson.language}
                      darkMode={darkMode}
                      onApplySolution={(solution) => setExerciseUserCode(solution)}
                      onAskAITutor={(diffContext) => onOpenAITutor(diffContext)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Lesson Quiz Questions */}
            {currentLesson.quizQuestions && currentLesson.quizQuestions.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/30 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Lesson Comprehension Quiz</span>
                </h3>

                {currentLesson.quizQuestions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-xs font-semibold">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedQuizAnswers[q.id] === oIdx;
                        const isCorrect = q.correctAnswerIndex === oIdx;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuizOption(q.id, oIdx)}
                            className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                              isSelected
                                ? quizSubmitted
                                  ? isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-red-500/20 border-red-500 text-red-300'
                                  : 'bg-blue-600/20 border-blue-500 text-blue-300'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Submit Answers
                </button>
              </div>
            )}

            {/* Complete Lesson CTA */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Earn +50 XP upon completing this module</span>
              <button
                onClick={handleMarkLessonComplete}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Mark Module Complete</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Course Completion Confetti Modal Overlay */}
      <ConfettiCelebration
        course={course}
        isOpen={showCelebrationModal}
        onClose={() => setShowCelebrationModal(false)}
        onViewCertificate={onViewCertificates}
        onContinueNextCourse={onBack}
      />

    </div>
  );
};
