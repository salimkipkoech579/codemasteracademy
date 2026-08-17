import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Eye, 
  Code2, 
  Maximize2, 
  Sparkles, 
  Download,
  Settings
} from 'lucide-react';

interface PlaygroundProps {
  darkMode: boolean;
  onOpenAITutor: (codeContext?: string) => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ darkMode, onOpenAITutor }) => {
  const [language, setLanguage] = useState<'html' | 'javascript' | 'python' | 'sql' | 'cpp'>('html');
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; text-align: center; }
    .card { background: #1e293b; padding: 24px; border-radius: 16px; border: 1px solid #334155; }
    button { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 CodeMaster Academy Playground</h1>
    <p>Live interactive web engine rendered directly in real time!</p>
    <button onclick="alert('Hello from CodeMaster Academy!')">Click Me</button>
  </div>
</body>
</html>`);

  const [output, setOutput] = useState<string>('Console output will appear here...');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'preview' | 'console'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  const starterTemplates = {
    html: `<!DOCTYPE html>\n<html>\n<head>\n  <style>body { font-family: system-ui; padding: 20px; background: #0f172a; color: white; }</style>\n</head>\n<body>\n  <h2>CodeMaster Live Preview</h2>\n  <button onclick="alert('Success!')">Test Button</button>\n</body>\n</html>`,
    javascript: `// JavaScript Playground\nfunction calculateFibonacci(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    console.log("Fib(" + i + "): " + a);\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n}\n\ncalculateFibonacci(8);`,
    python: `# Python Data Processing\ndef calculate_student_grades(scores):\n    passing = [s for s in scores if s >= 70]\n    average = sum(passing) / len(passing) if passing else 0\n    return len(passing), round(average, 2)\n\npassed, avg = calculate_student_grades([88, 92, 54, 76, 95])\nprint(f"Students Passed: {passed}, Average: {avg}")`,
    sql: `-- Interactive SQL Query Engine\nSELECT \n  courses.title, \n  COUNT(enrollments.student_id) AS total_students\nFROM courses\nJOIN enrollments ON courses.id = enrollments.course_id\nGROUP BY courses.id, courses.title;`,
    cpp: `// C++ System Code\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "CodeMaster Academy C++ Engine 1.0" << endl;\n    return 0;\n}`,
  };

  const handleLanguageSelect = (lang: 'html' | 'javascript' | 'python' | 'sql' | 'cpp') => {
    setLanguage(lang);
    setCode(starterTemplates[lang]);
    if (lang === 'html') setActiveView('preview');
    else setActiveView('console');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing code...');

    try {
      const res = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setOutput(data.output || 'Code executed successfully.');
      if (language !== 'html') setActiveView('console');
    } catch (err) {
      setOutput('Execution failed. Server error.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      
      {/* Playground Toolbar */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Language Selector Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          {(['html', 'javascript', 'python', 'sql', 'cpp'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                language === lang
                  ? 'bg-blue-600 text-white shadow-sm'
                  : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {lang === 'html' ? 'HTML / CSS' : lang === 'javascript' ? 'JavaScript' : lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenAITutor(`Code snippet:\n${code}`)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Review</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setCode(starterTemplates[language])}
            className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300"
            title="Reset Template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 shadow-md"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>

      </div>

      {/* Main Split Screen: Code Editor vs Output View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
        
        {/* Left Pane: Code Editor */}
        <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Editor ({language.toUpperCase()})</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">UTF-8 • Line Wrap</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-slate-200 outline-none resize-none border-none"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>

        {/* Right Pane: Live Output Preview / Console */}
        <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {language === 'html' && (
                <button
                  onClick={() => setActiveView('preview')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                    activeView === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Web Preview</span>
                </button>
              )}

              <button
                onClick={() => setActiveView('console')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                  activeView === 'console' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console Output</span>
              </button>
            </div>

            <button
              onClick={() => setOutput('Console cleared.')}
              className="text-[10px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 w-full h-full p-2">
            {activeView === 'preview' && language === 'html' ? (
              <iframe
                title="playground-output"
                srcDoc={code}
                className="w-full h-full rounded-xl bg-white border-none"
                sandbox="allow-scripts"
              />
            ) : (
              <pre className="w-full h-full p-4 font-mono text-xs leading-relaxed text-emerald-400 bg-slate-950 overflow-auto">
                <code>{output}</code>
              </pre>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
