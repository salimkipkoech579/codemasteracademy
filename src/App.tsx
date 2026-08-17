import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CourseViewer } from './components/CourseViewer';
import { Playground } from './components/Playground';
import { AITutorWidget } from './components/AITutorWidget';
import { PracticeSection } from './components/PracticeSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CertificatesView } from './components/CertificatesView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CommunityForum } from './components/CommunityForum';
import { ResourcesHub } from './components/ResourcesHub';
import { VisualGuidesHub } from './components/VisualGuidesHub';
import { VideoLibraryTheater } from './components/VideoLibraryTheater';
import { AuthModal } from './components/AuthModal';
import { OfflineBanner } from './components/OfflineBanner';
import { OfflineManagerModal } from './components/OfflineManagerModal';

import { INITIAL_MOCK_USER } from './data/mockUserData';
import { COURSES, LEARNING_PATHS } from './data/coursesData';
import { User, Course, UserRole } from './types';

export default function App() {
  const [user, setUser] = useState<User>(INITIAL_MOCK_USER);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [offlineModalOpen, setOfflineModalOpen] = useState<boolean>(false);

  const [aiTutorOpen, setAiTutorOpen] = useState<boolean>(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string>('');
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('classroom');
  };

  const handleSelectCourseById = (courseId: string) => {
    const found = COURSES.find((c) => c.id === courseId);
    if (found) {
      handleSelectCourse(found);
    }
  };


  const handleSuccessLogin = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
    }));
  };

  const handleRoleChange = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
    if (role === 'instructor') setActiveTab('instructor');
    else if (role === 'admin') setActiveTab('admin');
    else setActiveTab('dashboard');
  };

  const handleOpenAITutorWithTopic = (topicContext?: string) => {
    if (topicContext) setAiTutorTopic(topicContext);
    setAiTutorOpen(true);
  };

  const handleLessonComplete = (lessonId: string) => {

    setUser((prev) => {
      const already = prev.completedLessonIds.includes(lessonId);
      if (already) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        xp: prev.xp + 50,
      };
    });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedCourse(null);
          setActiveTab(tab);
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAuth={handleOpenAuth}
        onRoleChange={handleRoleChange}
        onOpenAITutor={() => setAiTutorOpen(true)}
        onOpenOfflineModal={() => setOfflineModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Offline Status Banner */}
      <OfflineBanner onOpenOfflineModal={() => setOfflineModalOpen(true)} />

      {/* Main Content Router */}

      <main className="flex-1">
        
        {activeTab === 'landing' && (
          <LandingPage
            darkMode={darkMode}
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
            onOpenAuth={handleOpenAuth}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'paths' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Structured Curriculums</span>
              <h1 className="text-3xl font-extrabold tracking-tight">Software Engineering Learning Paths</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEARNING_PATHS.map((path) => (
                <div key={path.id} className={`p-6 rounded-3xl border space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500">{path.category}</span>
                    <span className="text-xs text-slate-400 font-medium">{path.duration}</span>
                  </div>
                  <h2 className="text-xl font-bold">{path.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{path.description}</p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{path.totalCourses} Master Courses</span>
                    <button
                      onClick={() => {
                        const firstCourse = COURSES.find((c) => c.pathId === path.id) || COURSES[0];
                        handleSelectCourse(firstCourse);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
                    >
                      Start Path
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            user={user}
            darkMode={darkMode}
            onSelectCourse={handleSelectCourse}
            onViewCertificates={() => setActiveTab('certificates')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'classroom' && selectedCourse && (
          <CourseViewer
            course={selectedCourse}
            darkMode={darkMode}
            onBack={() => setActiveTab('landing')}
            onOpenAITutor={handleOpenAITutorWithTopic}
            onLessonComplete={handleLessonComplete}
            completedLessonIds={user.completedLessonIds}
            onViewCertificates={() => setActiveTab('certificates')}
          />
        )}

        {activeTab === 'playground' && (
          <Playground
            darkMode={darkMode}
            onOpenAITutor={handleOpenAITutorWithTopic}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeSection
            darkMode={darkMode}
            onOpenAITutor={handleOpenAITutorWithTopic}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsShowcase
            darkMode={darkMode}
            onOpenAITutor={handleOpenAITutorWithTopic}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesHub darkMode={darkMode} onNavigateToVisualGuides={() => setActiveTab('visual_guides')} />
        )}

        {activeTab === 'visual_guides' && (
          <VisualGuidesHub darkMode={darkMode} />
        )}

        {activeTab === 'video_library' && (
          <VideoLibraryTheater darkMode={darkMode} />
        )}

        {activeTab === 'certificates' && (
          <CertificatesView darkMode={darkMode} />
        )}

        {activeTab === 'forum' && (
          <CommunityForum darkMode={darkMode} />
        )}

        {activeTab === 'instructor' && (
          <InstructorDashboard darkMode={darkMode} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard darkMode={darkMode} />
        )}

      </main>

      {/* Gemini AI Tutor Drawer */}
      <AITutorWidget
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        darkMode={darkMode}
        initialTopicContext={aiTutorTopic}
      />

      {/* Login / Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        darkMode={darkMode}
        onSuccessLogin={handleSuccessLogin}
      />

      {/* Service Worker Offline Course Manager Modal */}
      <OfflineManagerModal
        isOpen={offlineModalOpen}
        darkMode={darkMode}
        onClose={() => setOfflineModalOpen(false)}
        onSelectCourse={handleSelectCourseById}
      />

      {/* Footer */}

      <Footer darkMode={darkMode} setActiveTab={setActiveTab} />

    </div>
  );
}
