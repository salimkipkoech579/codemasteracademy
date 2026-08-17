import React, { useState, useMemo } from 'react';
import * as Diff from 'diff';
import {
  Code,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Split,
  Maximize2,
  Copy,
  Check,
  TrendingUp,
  AlertCircle,
  Zap,
  HelpCircle,
  FileCode,
  Eye,
  RefreshCw
} from 'lucide-react';

interface SideBySideDiffViewerProps {
  userCode: string;
  modelSolution: string;
  language?: string;
  darkMode: boolean;
  onApplySolution?: (solution: string) => void;
  onAskAITutor?: (diffContext: string) => void;
}

interface LineDiffResult {
  leftLineNum?: number;
  rightLineNum?: number;
  leftText: string;
  rightText: string;
  type: 'same' | 'added' | 'removed' | 'modified';
}

export const SideBySideDiffViewer: React.FC<SideBySideDiffViewerProps> = ({
  userCode,
  modelSolution,
  language = 'python',
  darkMode,
  onApplySolution,
  onAskAITutor,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [onlyShowChanges, setOnlyShowChanges] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute structured line diffs
  const { lineDiffs, stats } = useMemo(() => {
    const rawDiffs = Diff.diffLines(userCode, modelSolution, { newlineIsToken: false });
    
    let leftLineCounter = 1;
    let rightLineCounter = 1;
    let addedCount = 0;
    let removedCount = 0;
    let unchangedCount = 0;

    const diffRows: LineDiffResult[] = [];

    // Temporary storage to align removals and additions side-by-side
    let pendingRemovals: string[] = [];

    rawDiffs.forEach((part) => {
      const lines = part.value.replace(/\n$/, '').split('\n');

      if (part.added) {
        addedCount += lines.length;
        // Match with pending removals if present
        lines.forEach((addedLine) => {
          if (pendingRemovals.length > 0) {
            const removedLine = pendingRemovals.shift()!;
            diffRows.push({
              leftLineNum: leftLineCounter++,
              rightLineNum: rightLineCounter++,
              leftText: removedLine,
              rightText: addedLine,
              type: 'modified'
            });
          } else {
            diffRows.push({
              rightLineNum: rightLineCounter++,
              leftText: '',
              rightText: addedLine,
              type: 'added'
            });
          }
        });
      } else if (part.removed) {
        removedCount += lines.length;
        lines.forEach((removedLine) => {
          pendingRemovals.push(removedLine);
        });
      } else {
        // Unchanged
        // Flush remaining pending removals first
        while (pendingRemovals.length > 0) {
          const removedLine = pendingRemovals.shift()!;
          diffRows.push({
            leftLineNum: leftLineCounter++,
            leftText: removedLine,
            rightText: '',
            type: 'removed'
          });
        }

        unchangedCount += lines.length;
        lines.forEach((line) => {
          diffRows.push({
            leftLineNum: leftLineCounter++,
            rightLineNum: rightLineCounter++,
            leftText: line,
            rightText: line,
            type: 'same'
          });
        });
      }
    });

    // Flush any leftover pending removals
    while (pendingRemovals.length > 0) {
      const removedLine = pendingRemovals.shift()!;
      diffRows.push({
        leftLineNum: leftLineCounter++,
        leftText: removedLine,
        rightText: '',
        type: 'removed'
      });
    }

    return {
      lineDiffs: diffRows,
      stats: {
        added: addedCount,
        removed: removedCount,
        unchanged: unchangedCount,
        total: diffRows.length,
        similarityPercentage: Math.max(
          0,
          Math.min(100, Math.round((unchangedCount / (diffRows.length || 1)) * 100))
        )
      }
    };
  }, [userCode, modelSolution]);

  const displayedRows = useMemo(() => {
    if (!onlyShowChanges) return lineDiffs;
    return lineDiffs.filter((row) => row.type !== 'same');
  }, [lineDiffs, onlyShowChanges]);

  const handleCopySolution = () => {
    navigator.clipboard.writeText(modelSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateDiffSummaryForAI = () => {
    const changes = lineDiffs
      .filter((r) => r.type !== 'same')
      .map((r) => `[Line ${r.leftLineNum || 'New'} -> ${r.rightLineNum || 'New'}] User: "${r.leftText}" | Solution: "${r.rightText}"`)
      .join('\n');
    
    return `Can you explain the differences between my code and the model solution for this ${language} challenge?\n\nUSER CODE:\n${userCode}\n\nMODEL SOLUTION:\n${modelSolution}\n\nDIFF BREAKDOWN:\n${changes}`;
  };

  return (
    <div className={`p-5 rounded-3xl border shadow-2xl space-y-4 ${
      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Side-by-Side Visual Diff
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Similarity: <strong className="text-emerald-400">{stats.similarityPercentage}%</strong>
            </span>
          </div>
          <h3 className="text-base font-black text-white flex items-center space-x-2">
            <Split className="w-4 h-4 text-purple-400" />
            <span>Code Comparison & Optimization Highlights</span>
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'split' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'unified' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Unified View
            </button>
          </div>

          {/* Only Show Differences Toggle */}
          <button
            onClick={() => setOnlyShowChanges(!onlyShowChanges)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
              onlyShowChanges
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{onlyShowChanges ? 'Show All Lines' : 'Only Changes'}</span>
          </button>

          {/* Ask AI Tutor */}
          {onAskAITutor && (
            <button
              onClick={() => onAskAITutor(generateDiffSummaryForAI())}
              className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:scale-105 transition-all flex items-center space-x-1 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explain Diff with AI</span>
            </button>
          )}

          {/* Apply Solution */}
          {onApplySolution && (
            <button
              onClick={() => onApplySolution(modelSolution)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center space-x-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Model Solution</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Quick Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="text-slate-400 block text-[10px] font-bold">OPTIMIZATIONS ADDED</span>
          <span className="text-base font-extrabold text-emerald-400">+{stats.added} lines</span>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
          <span className="text-slate-400 block text-[10px] font-bold">REMOVED / REPLACED</span>
          <span className="text-base font-extrabold text-rose-400">-{stats.removed} lines</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 block text-[10px] font-bold">MATCHING LOGIC</span>
          <span className="text-base font-extrabold text-slate-300">{stats.unchanged} lines</span>
        </div>

        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
          <span className="text-slate-400 block text-[10px] font-bold">CODE EFFICIENCY SCORE</span>
          <span className="text-base font-extrabold text-purple-300">
            {stats.added < stats.removed ? '⚡ Concise (+15%)' : '✨ Refactored'}
          </span>
        </div>
      </div>

      {/* Diff Code Display Canvas */}
      {viewMode === 'split' ? (
        /* Split Side-by-Side View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
          
          {/* Left Column: User Code */}
          <div className="border-r border-slate-800/80">
            <div className="p-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[11px] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Your Submission Code</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500">Left Pane</span>
            </div>

            <div className="divide-y divide-slate-900/40">
              {displayedRows.map((row, idx) => {
                const isRemoved = row.type === 'removed' || row.type === 'modified';
                const isAdded = row.type === 'added';

                return (
                  <div
                    key={idx}
                    className={`flex items-start px-2 py-1 transition-colors ${
                      isRemoved
                        ? 'bg-rose-950/40 text-rose-200 font-medium'
                        : isAdded
                        ? 'bg-slate-950/20 opacity-40'
                        : 'text-slate-300'
                    }`}
                  >
                    <span className="w-8 text-right pr-2 text-[10px] select-none text-slate-600 font-bold">
                      {row.leftLineNum || ''}
                    </span>
                    <span className="w-5 text-center select-none font-bold text-rose-400">
                      {isRemoved ? '-' : ''}
                    </span>
                    <pre className="flex-1 whitespace-pre-wrap break-all pl-1">
                      {row.leftText || (isAdded ? <span className="italic text-slate-600">// Line added in solution</span> : '')}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Model Solution */}
          <div>
            <div className="p-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[11px] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Model Solution (Optimal)</span>
              </span>
              <button
                onClick={handleCopySolution}
                className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-900/40">
              {displayedRows.map((row, idx) => {
                const isAdded = row.type === 'added' || row.type === 'modified';
                const isRemoved = row.type === 'removed';

                return (
                  <div
                    key={idx}
                    className={`flex items-start px-2 py-1 transition-colors ${
                      isAdded
                        ? 'bg-emerald-950/40 text-emerald-200 font-medium'
                        : isRemoved
                        ? 'bg-slate-950/20 opacity-40'
                        : 'text-slate-300'
                    }`}
                  >
                    <span className="w-8 text-right pr-2 text-[10px] select-none text-slate-600 font-bold">
                      {row.rightLineNum || ''}
                    </span>
                    <span className="w-5 text-center select-none font-bold text-emerald-400">
                      {isAdded ? '+' : ''}
                    </span>
                    <pre className="flex-1 whitespace-pre-wrap break-all pl-1">
                      {row.rightText || (isRemoved ? <span className="italic text-slate-600">// Removed line</span> : '')}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Unified Inline Diff View */
        <div className="font-mono text-xs overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950 divide-y divide-slate-900">
          <div className="p-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[11px]">
            Unified Code Diff Stream
          </div>

          {displayedRows.map((row, idx) => {
            if (row.type === 'same') {
              return (
                <div key={idx} className="flex items-center px-3 py-1 text-slate-300 hover:bg-slate-900/50">
                  <span className="w-8 text-right pr-2 text-[10px] text-slate-600 select-none font-bold">{row.leftLineNum}</span>
                  <span className="w-8 text-right pr-2 text-[10px] text-slate-600 select-none font-bold">{row.rightLineNum}</span>
                  <span className="w-5 text-center text-slate-600 select-none font-bold"> </span>
                  <pre className="flex-1 whitespace-pre-wrap break-all pl-2">{row.leftText}</pre>
                </div>
              );
            }

            return (
              <React.Fragment key={idx}>
                {row.leftText && (
                  <div className="flex items-center px-3 py-1 bg-rose-950/40 text-rose-200 font-medium">
                    <span className="w-8 text-right pr-2 text-[10px] text-rose-500/70 select-none font-bold">{row.leftLineNum || ''}</span>
                    <span className="w-8 text-right pr-2 text-[10px] text-slate-700 select-none font-bold">-</span>
                    <span className="w-5 text-center text-rose-400 select-none font-bold">-</span>
                    <pre className="flex-1 whitespace-pre-wrap break-all pl-2">{row.leftText}</pre>
                  </div>
                )}
                {row.rightText && (
                  <div className="flex items-center px-3 py-1 bg-emerald-950/40 text-emerald-200 font-medium">
                    <span className="w-8 text-right pr-2 text-[10px] text-slate-700 select-none font-bold">-</span>
                    <span className="w-8 text-right pr-2 text-[10px] text-emerald-500/70 select-none font-bold">{row.rightLineNum || ''}</span>
                    <span className="w-5 text-center text-emerald-400 select-none font-bold">+</span>
                    <pre className="flex-1 whitespace-pre-wrap break-all pl-2">{row.rightText}</pre>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Code Improvement Highlights Box */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-xs space-y-2">
        <h4 className="font-extrabold text-purple-300 flex items-center space-x-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Key Improvements in Model Solution:</span>
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 list-disc list-inside">
          <li><strong>Optimized Complexity:</strong> Reduces unnecessary loops & redundant variable assignments.</li>
          <li><strong>Idiomatic Conventions:</strong> Uses standard language built-in utilities and clear function names.</li>
          <li><strong>Edge Case Handling:</strong> Gracefully checks boundary inputs (empty arrays, zero division, type casting).</li>
          <li><strong>Clean Readability:</strong> Consistent indentation and clear docstring comments.</li>
        </ul>
      </div>

    </div>
  );
};
