import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
  Github
} from 'lucide-react';
import { ConvoraIcon } from '../common/ConvoraLogo';

export const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const { loginUser } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      loginUser({
        name: name || (email ? email.split('@')[0] : 'Merchant Admin'),
        email: email || 'admin@aurafit-luxe.in',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        plan: 'Pro Plan'
      });
      setSuccessMsg('Successfully authenticated! Welcome back to Convora AI.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1000);
    }, 600);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser({
        name: provider === 'Google' ? 'Alex Rivera' : 'DevMerchant',
        email: provider === 'Google' ? 'alex.rivera@techcorp.io' : 'dev@github.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        plan: 'Scale Plan'
      });
      setSuccessMsg(`Signed in with ${provider}! Welcome to Convora AI.`);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#12141C] border border-zinc-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center mb-1">
            <ConvoraIcon className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Welcome Back to Convora AI' : 'Start Your 14-Day Free Trial'}
          </h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            {mode === 'signin'
              ? 'Access your autonomous sales agent, live visitor stream & conversion experiments.'
              : 'Deploy your first AI sales agent in under 2 minutes. No credit card required.'}
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleSocialAuth('Google')}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#ffffff"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#d1d5db"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#9ca3af"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#f3f4f6"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialAuth('GitHub')}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <Github className="h-4 w-4 text-zinc-300" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-800 w-full"></div>
          <span className="bg-[#12141C] px-3 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold absolute">
            Or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Work Email</label>
            <div className="relative">
              <Mail className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-zinc-300 font-semibold">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset magic link has been sent to your email!')}
                  className="text-[11px] text-zinc-300 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-600 text-white text-xs font-semibold flex items-center space-x-2 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-zinc-200" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-black/40 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Convora Dashboard' : 'Create Free Convora Account'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          {mode === 'signin' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-white font-semibold hover:underline"
              >
                Sign up free →
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-white font-semibold hover:underline"
              >
                Sign in here →
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
