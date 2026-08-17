import React, { useState } from 'react';
import { 
  Code2, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Upload, 
  Sparkles, 
  Send,
  FileCode,
  Layers
} from 'lucide-react';
import { PROJECT_ASSIGNMENTS } from '../data/coursesData';
import { ProjectAssignment } from '../types';

interface ProjectsShowcaseProps {
  darkMode: boolean;
  onOpenAITutor: (codeContext?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ darkMode, onOpenAITutor }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectAssignment>(PROJECT_ASSIGNMENTS[0]);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState('');

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;
    setSubmittedMsg('✓ Project repository submitted for instructor evaluation!');
    setTimeout(() => setSubmittedMsg(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Portfolio Builders</span>
          <h1 className="text-3xl font-extrabold tracking-tight">Real-World Software Engineering Projects</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Project List */}
        <div className="lg:col-span-4 space-y-3">
          {PROJECT_ASSIGNMENTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedProject.id === proj.id
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                  : darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                  {proj.category}
                </span>
                <span className="text-[10px] text-slate-400">{proj.difficulty}</span>
              </div>
              <h3 className="text-sm font-bold">{proj.title}</h3>
            </div>
          ))}
        </div>

        {/* Project Detailed Specifications & Submission */}
        <div className="lg:col-span-8">
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-500">{selectedProject.category}</span>
                <h2 className="text-2xl font-extrabold mt-1">{selectedProject.title}</h2>
              </div>

              <button
                onClick={() => onOpenAITutor(`Project: ${selectedProject.title}\nDescription: ${selectedProject.description}`)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architecture Guide</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedProject.description}</p>

            {/* Core Features To Build */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Features & Specifications</h3>
              <ul className="space-y-2">
                {selectedProject.featuresToBuild.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Starter Code Snippet */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Code Template</h3>
              <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
                <code>{selectedProject.starterCode}</code>
              </pre>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleProjectSubmit} className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Submit Project GitHub / Demo Link</h3>
              
              {submittedMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  {submittedMsg}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project-repo"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
