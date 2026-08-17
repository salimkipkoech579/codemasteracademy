import React, { useState } from 'react';
import { 
  PlusCircle, 
  BookOpen, 
  Users, 
  BarChart2, 
  CheckCircle2, 
  GraduationCap, 
  Upload, 
  FileText, 
  Send
} from 'lucide-react';
import { COURSES } from '../data/coursesData';

interface InstructorDashboardProps {
  darkMode: boolean;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'builder' | 'grading'>('courses');
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [description, setDescription] = useState('');
  const [createdMsg, setCreatedMsg] = useState('');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;
    setCreatedMsg('✓ New course published successfully to CodeMaster Academy catalog!');
    setTimeout(() => {
      setCreatedMsg('');
      setActiveTab('courses');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Instructor Portal</span>
          <h1 className="text-3xl font-extrabold tracking-tight">Course Authoring & Student Analytics</h1>
        </div>

        <button
          onClick={() => setActiveTab('builder')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 text-xs font-bold border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('courses')}
          className={activeTab === 'courses' ? 'text-blue-500 border-b-2 border-blue-500 pb-3' : 'text-slate-400'}
        >
          My Courses ({COURSES.length})
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={activeTab === 'builder' ? 'text-blue-500 border-b-2 border-blue-500 pb-3' : 'text-slate-400'}
        >
          Course Creator Studio
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          className={activeTab === 'grading' ? 'text-blue-500 border-b-2 border-blue-500 pb-3' : 'text-slate-400'}
        >
          Assignment Submissions Grading
        </button>
      </div>

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div key={course.id} className={`p-5 rounded-2xl border space-y-3 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">{course.category}</span>
                <span className="text-xs text-amber-400 font-bold">★ {course.rating}</span>
              </div>
              <h3 className="font-bold text-sm">{course.title}</h3>
              <p className="text-xs text-slate-400">{course.studentCount} Students Enrolled • {course.lessons.length} Lessons</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'builder' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 max-w-3xl ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h2 className="text-xl font-bold">Publish New Interactive Course</h2>

          {createdMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              {createdMsg}
            </div>
          )}

          <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 mb-1">Course Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Next.js 15 Server Actions & App Router Mastery"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Difficulty Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">Course Overview Description</label>
              <textarea
                rows={4}
                required
                placeholder="Detailed course description, learning outcomes, and pre-requisites..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Publish Course to Platform
            </button>
          </form>
        </div>
      )}

      {activeTab === 'grading' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h2 className="text-lg font-bold">Pending Student Assignment Submissions</h2>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between font-bold">
              <span>Student: Alex Johnson</span>
              <span className="text-amber-400">Needs Review</span>
            </div>
            <div>Project: Real-Time AI Code Reviewer Bot</div>
            <div className="text-slate-400 font-mono">Repo: https://github.com/alexjohnson/ai-reviewer-bot</div>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] mt-2">
              Grade 100/100 & Approve
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
