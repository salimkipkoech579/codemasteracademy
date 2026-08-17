import React, { useState } from 'react';
import { X, Mail, Lock, User, Key, ShieldCheck, Github, Globe, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  darkMode: boolean;
  onSuccessLogin: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  darkMode,
  onSuccessLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | '2fa' | 'reset' | 'verify'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg('');

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login' || mode === 'register') {
        setMode('2fa');
      } else if (mode === '2fa') {
        setStatusMsg('✓ Authentication Successful!');
        setTimeout(() => {
          onSuccessLogin(name || 'Alex Johnson', email || 'alex.johnson@codemaster.edu');
          onClose();
        }, 600);
      } else if (mode === 'reset') {
        setMode('verify');
        setStatusMsg('Password reset link sent to your email!');
      }
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccessLogin(`${provider} Developer`, `user@${provider.toLowerCase()}.com`);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800/50 text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-1">
          <h3 className="text-xl font-bold tracking-tight">
            {mode === 'login' && 'Welcome Back to CodeMaster'}
            {mode === 'register' && 'Create Your Engineer Account'}
            {mode === '2fa' && 'Two-Factor Verification'}
            {mode === 'reset' && 'Reset Password'}
            {mode === 'verify' && 'Email Verification'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === '2fa' ? 'Enter 6-digit authentication code from your app' : 'Access AI tutoring, interactive playgrounds, and certificates.'}
          </p>
        </div>

        {statusMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs text-center font-semibold">
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'reset') && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="alex.johnson@codemaster.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          )}

          {mode === '2fa' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">2FA Code (Google Authenticator)</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="782910"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-center text-sm tracking-widest font-mono rounded-xl border outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? <span>Verifying...</span> : (
              <>
                <span>{mode === 'login' ? 'Continue to Account' : mode === 'register' ? 'Create Account' : 'Verify & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Social Logins */}
        {(mode === 'login' || mode === 'register') && (
          <div className="mt-6 space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-700/50 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-400 absolute">Or continue with</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="py-2 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold flex items-center justify-center space-x-1"
              >
                <Globe className="w-3.5 h-3.5 text-red-400" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('GitHub')}
                className="py-2 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold flex items-center justify-center space-x-1"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </button>
              <button
                onClick={() => handleSocialLogin('Microsoft')}
                className="py-2 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold flex items-center justify-center space-x-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Microsoft</span>
              </button>
            </div>

            <div className="text-center text-xs text-slate-400 pt-2">
              {mode === 'login' ? (
                <span>Don't have an account? <button onClick={() => setMode('register')} className="text-blue-400 font-semibold hover:underline">Register</button></span>
              ) : (
                <span>Already have an account? <button onClick={() => setMode('login')} className="text-blue-400 font-semibold hover:underline">Log in</button></span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
