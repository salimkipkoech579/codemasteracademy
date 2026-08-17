import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle, 
  Search, 
  Layers, 
  Code2, 
  Terminal, 
  Award, 
  ShieldCheck, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Zap,
  Check,
  Tag,
  Mail
} from 'lucide-react';
import { LEARNING_PATHS, COURSES } from '../data/coursesData';
import { Course } from '../types';

interface LandingPageProps {
  darkMode: boolean;
  setActiveTab: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  darkMode,
  setActiveTab,
  onSelectCourse,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Cybersecurity', 'Languages', 'Databases'];

  const programmingLanguages = [
    { name: 'JavaScript', tag: 'Web & Node.js', icon: '⚡', color: 'from-amber-400 to-yellow-500' },
    { name: 'Python', tag: 'AI & Backend', icon: '🐍', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', tag: 'Typed JS', icon: '🔷', color: 'from-blue-600 to-indigo-600' },
    { name: 'HTML5 & CSS3', tag: 'Web UI', icon: '🎨', color: 'from-orange-500 to-red-500' },
    { name: 'React & Next.js', tag: 'Frontend Frameworks', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js & Express', tag: 'Backend Runtime', icon: '🟢', color: 'from-emerald-500 to-teal-600' },
    { name: 'Java', tag: 'Enterprise & Spring', icon: '☕', color: 'from-red-500 to-orange-600' },
    { name: 'C++', tag: 'System & Games', icon: '⚙️', color: 'from-indigo-500 to-purple-600' },
    { name: 'Go (Golang)', tag: 'Cloud Microservices', icon: '🐹', color: 'from-sky-400 to-blue-600' },
    { name: 'Rust', tag: 'Memory Safe Systems', icon: '🦀', color: 'from-amber-600 to-orange-700' },
    { name: 'SQL (PostgreSQL/MySQL)', tag: 'Relational DBs', icon: '🛢️', color: 'from-purple-500 to-indigo-600' },
    { name: 'Bash & Linux', tag: 'DevOps & Shell', icon: '🐚', color: 'from-slate-600 to-slate-800' },
  ];

  const testimonials = [
    {
      name: 'Michael Chang',
      role: 'Full Stack Engineer @ Stripe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      text: 'CodeMaster Academy\'s interactive playground and real-world project assignments got me through tough technical interviews. The AI Tutor explains complex algorithms line by line better than my college professor!',
      stars: 5,
    },
    {
      name: 'Sophia Patel',
      role: 'Frontend Architect @ Vercel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      text: 'The defensive security labs and React 19 server components courses are unmatched. Verified certificates with QR codes made sharing on LinkedIn seamless.',
      stars: 5,
    },
    {
      name: 'David O\'Connor',
      role: 'DevOps Lead @ Cloudflare',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
      text: 'I started with zero Docker/Kubernetes experience. Within 3 weeks, I mastered microservice deployment and landed my dream cloud role.',
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: 'Do I need prior coding experience to join?',
      a: 'Not at all! CodeMaster Academy offers beginner-friendly learning paths starting from HTML/CSS and Python fundamentals all the way to advanced full-stack architecture.',
    },
    {
      q: 'How does the Gemini AI Learning Assistant work?',
      a: 'Our AI tutor is built server-side with Gemini 3.6 Flash. It sits alongside every coding exercise to explain error messages, analyze time complexity, generate customized practice quizzes, and conduct full code reviews.',
    },
    {
      q: 'Are the completion certificates industry-recognized?',
      a: 'Yes! Every certificate includes a unique verification code and an embedded SVG QR code that links directly to our verification database, perfect for LinkedIn and job applications.',
    },
    {
      q: 'Can I write and run real code directly in the browser?',
      a: 'Yes! Our multi-language Coding Playground supports interactive JavaScript, Python, SQL, HTML/CSS live rendering, C++, and Go execution with real-time console outputs.',
    },
  ];

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === 'CODEMASTER50') {
      setAppliedDiscount(50);
      setCouponMessage('🎉 50% Discount Applied Successfully!');
    } else if (couponInput.trim().toUpperCase() === 'PRODEV2026') {
      setAppliedDiscount(30);
      setCouponMessage('🎉 30% Discount Applied Successfully!');
    } else {
      setCouponMessage('❌ Invalid coupon code. Try "CODEMASTER50"');
    }
  };

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 text-center lg:text-left">
        
        {/* Glowing backdrop ambient gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen AI-Powered Engineering Academy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Master Software Engineering{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  with AI Tutoring
                </span>
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Learn frontend, backend microservices, DevOps, algorithms, databases, and cybersecurity. Code live in browser, build real-world portfolio projects, and earn verified certifications.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenAuth('register')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('playground')}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm border flex items-center justify-center space-x-2 transition-all ${
                    darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span>Try Live Playground</span>
                </button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/40 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-blue-500">120K+</div>
                  <div className="text-xs text-slate-400">Active Engineers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-500">45+</div>
                  <div className="text-xs text-slate-400">Structured Paths</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">98%</div>
                  <div className="text-xs text-slate-400">Job Pass Rate</div>
                </div>
              </div>

            </div>

            {/* Right Hero Interactive Preview Box */}
            <div className="lg:col-span-5">
              <div className={`p-4 rounded-2xl border shadow-2xl relative overflow-hidden transition-all ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                
                {/* Code Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-3 text-xs">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">server.ts • Gemini 3.6 Flash AI Tutor</span>
                  <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>

                {/* Code Body */}
                <pre className="font-mono text-xs leading-relaxed text-slate-300 bg-slate-950 p-3.5 rounded-xl overflow-x-auto border border-slate-800">
                  <code>
<span className="text-purple-400">import</span> &#123; GoogleGenAI &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@google/genai"</span>;<br/><br/>
<span className="text-slate-500">// Initialize AI Tutor server-side</span><br/>
<span className="text-blue-400">const</span> ai = <span className="text-purple-400">new</span> <span className="text-yellow-300">GoogleGenAI</span>(&#123; apiKey &#125;);<br/><br/>
<span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> ai.models.<span className="text-yellow-300">generateContent</span>(&#123;<br/>
&nbsp;&nbsp;model: <span className="text-emerald-300">"gemini-3.6-flash"</span>,<br/>
&nbsp;&nbsp;contents: <span className="text-emerald-300">"Explain async/await microtasks"</span><br/>
&#125;);<br/><br/>
console.<span className="text-yellow-300">log</span>(response.text);
                  </code>
                </pre>

                {/* Simulated AI Output Callout */}
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 text-xs text-blue-200 space-y-1">
                  <div className="font-semibold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>AI Tutor Explanation:</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Async functions return a Promise. The `await` keyword pauses execution until the Promise resolves, placing continuation on the microtask queue!
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED LEARNING PATHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Structured Curriculums</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Popular Learning Paths</h2>
          </div>
          <button
            onClick={() => setActiveTab('paths')}
            className="text-xs font-semibold text-blue-500 hover:underline flex items-center space-x-1"
          >
            <span>View All 6 Paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => (
            <div
              key={path.id}
              onClick={() => setActiveTab('paths')}
              className={`p-6 rounded-2xl border cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500">
                  {path.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{path.duration}</span>
              </div>

              <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors mb-2">
                {path.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {path.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/30">
                {path.tags.slice(0, 4).map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMMING LANGUAGES SECTION */}
      <section className={`py-12 border-y transition-colors ${
        darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Polyglot Mastery</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Master 18+ Programming Languages
            </h2>
            <p className="text-xs text-slate-400">
              Interactive beginner, intermediate, and advanced modules for every language with code execution and interview prep.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {programmingLanguages.map((lang, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('playground')}
                className={`p-4 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 ${
                  darkMode ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-500/50'
                }`}
              >
                <div className="text-2xl mb-1">{lang.icon}</div>
                <div className="font-bold text-xs">{lang.name}</div>
                <div className="text-[10px] text-slate-400">{lang.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Course Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Explore Top Courses</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-6 space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating} ({course.ratingCount})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{course.description}</p>

                <div className="flex items-center space-x-3 pt-2 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.studentCount.toLocaleString()} Students</span>
                  </div>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center space-x-2 pt-3 border-t border-slate-700/30">
                  <img src={course.author.avatar} alt={course.author.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-semibold">{course.author.name}</div>
                    <div className="text-[10px] text-slate-400">{course.author.title}</div>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">Included in Pro Plan</span>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 transition-all"
                >
                  <span>Start Course</span>
                  <PlayCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Transparent Investment</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Simple, Flexible Pricing</h2>
          <p className="text-xs text-slate-400">
            Start learning with free access, or unlock full AI tutoring, certificate generation, and unlimited playground runs.
          </p>

          {/* Coupon Code Input */}
          <div className="flex items-center justify-center space-x-2 pt-4 max-w-sm mx-auto">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Promo code (e.g. CODEMASTER50)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 text-xs font-bold bg-slate-800 text-white rounded-xl hover:bg-slate-700"
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <div className={`text-xs font-semibold ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {couponMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Tier */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-4">
              <div className="font-bold text-lg">Starter Free</div>
              <div className="text-3xl font-extrabold">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
              <p className="text-xs text-slate-400">Ideal for exploring basic programming concepts and syntax.</p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-700/40">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Access to 10+ Beginner Lessons</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Basic HTML/JS Playground</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Community Discussion Forum</span></li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800"
            >
              Get Free Account
            </button>
          </div>

          {/* Pro Annual (Featured) */}
          <div className="p-6 rounded-2xl border border-blue-500/80 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 relative flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              Most Popular • Save 40%
            </div>
            <div className="space-y-4 pt-2">
              <div className="font-bold text-lg text-white">Pro Annual</div>
              <div className="text-3xl font-extrabold text-white">
                ${appliedDiscount > 0 ? Math.round(149 * (1 - appliedDiscount/100)) : 149}
                <span className="text-xs text-slate-300 font-normal"> / year</span>
              </div>
              <p className="text-xs text-slate-300">Complete access for serious software engineering career switchers.</p>
              <ul className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-blue-500/30">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-400" /><span>Unlimited AI Tutor Assistance</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-400" /><span>All 45+ Learning Paths & Courses</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-400" /><span>Downloadable Certificates & QR Verification</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-blue-400" /><span>Interactive Debugger & Code Reviews</span></li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
            >
              Start Pro Annual Pass
            </button>
          </div>

          {/* Lifetime Access */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-4">
              <div className="font-bold text-lg">Lifetime Master</div>
              <div className="text-3xl font-extrabold">
                ${appliedDiscount > 0 ? Math.round(399 * (1 - appliedDiscount/100)) : 399}
                <span className="text-xs text-slate-400 font-normal"> / one-time</span>
              </div>
              <p className="text-xs text-slate-400">Lifetime access to all current and future software engineering courses.</p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-700/40">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Everything in Pro Plan</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>1-on-1 Mentorship Sessions</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Priority AI Tutor GPU Processing</span></li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800"
            >
              Get Lifetime Access
            </button>
          </div>

        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Success Stories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Loved by 120,000+ Developers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/30">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-sm flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border border-blue-500/30 text-center space-y-4 shadow-2xl">
          <Mail className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">Subscribe to Weekly Engineering Digest</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Get curated full-stack tutorials, system design breakdowns, and new coding challenges delivered to your inbox every Monday.
          </p>

          {newsletterSubscribed ? (
            <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold max-w-md mx-auto">
              ✓ Thank you for subscribing! Check your inbox for the welcome kit.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Enter your engineer email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
              />
              <button
                onClick={() => {
                  if (newsletterEmail.includes('@')) setNewsletterSubscribed(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
