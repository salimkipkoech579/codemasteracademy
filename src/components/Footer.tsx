import React from 'react';
import { Code2, Github, Twitter, Linkedin, Shield, Heart, Globe, Youtube } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, setActiveTab }) => {
  return (
    <footer className={`border-t transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CodeMaster Academy
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              The premier AI-powered software engineering education platform. Master full-stack development, algorithms, DevOps, cybersecurity, and cloud architecture through interactive hands-on coding.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 pt-2">
              <a 
                href="https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Victor Kipkoech YouTube Channel" 
                className="p-2 rounded-lg bg-red-600/20 text-red-500 hover:text-white hover:bg-red-600 transition-all flex items-center space-x-1 font-semibold text-xs"
              >
                <Youtube className="w-4 h-4" />
                <span>@kipkoechvictor-hn2eo</span>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Learning Paths */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Learning Paths</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('paths')} className="hover:text-white transition-colors">Frontend Masterclass</button></li>
              <li><button onClick={() => setActiveTab('paths')} className="hover:text-white transition-colors">Backend Architecture</button></li>
              <li><button onClick={() => setActiveTab('paths')} className="hover:text-white transition-colors">Full Stack Engineering</button></li>
              <li><button onClick={() => setActiveTab('paths')} className="hover:text-white transition-colors">DevOps & Cloud</button></li>
              <li><button onClick={() => setActiveTab('paths')} className="hover:text-white transition-colors">Cybersecurity Defensive Lab</button></li>
            </ul>
          </div>

          {/* Column 2: Platform Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Interactive Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors text-blue-400 font-semibold">Creators & Developer Docs</button></li>
              <li>
                <a 
                  href="https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 font-bold hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <Youtube className="w-3.5 h-3.5 inline" /> Subscribe to Victor Kipkoech
                </a>
              </li>
              <li><button onClick={() => setActiveTab('playground')} className="hover:text-white transition-colors">Multi-Lang Playground</button></li>
              <li><button onClick={() => setActiveTab('practice')} className="hover:text-white transition-colors">Daily Algorithm Challenges</button></li>
              <li><button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">Real-world Projects</button></li>
              <li><button onClick={() => setActiveTab('forum')} className="hover:text-white transition-colors">Community Forum & Q&A</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Certificates & Verification</button></li>
            </ul>
          </div>

          {/* Column 3: Trust & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Platform & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5 text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>OAuth 2.0 & 2FA Protected</span>
              </li>
              <li><span>ISO 27001 Certified Content</span></li>
              <li><span>WCAG 2.1 Accessible</span></li>
              <li><span>Stripe & SSL Secured</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>© 2026 CodeMaster Academy Inc. Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            <span>for Software Engineers worldwide.</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
