import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  LayoutDashboard,
  Store,
  Columns,
  RefreshCw,
  Zap,
  Globe,
  Radio,
  SlidersHorizontal,
  Code,
  Cpu,
  Home,
  User,
  LogOut
} from 'lucide-react';
import { OnboardingModal } from '../dashboard/OnboardingModal';
import { WidgetSnippetModal } from '../dashboard/WidgetSnippetModal';
import { AuthModal } from '../auth/AuthModal';
import { ConvoraIcon, ConvoraLogo } from '../common/ConvoraLogo';

export const Navbar: React.FC = () => {
  const {
    businessProfile,
    viewMode,
    setViewMode,
    activeVisitor,
    resetDemoVisitor,
    triggers,
    user,
    logoutUser
  } = useApp();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSnippet, setShowSnippet] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const activeTriggersCount = triggers.filter(t => t.enabled).length;

  return (
    <>
      <header className="h-16 border-b border-zinc-800 bg-[#12141C]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Brand & Store Selector */}
        <div
          onClick={() => setViewMode('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <ConvoraIcon className="h-9 w-9 group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                Convora<span className="text-zinc-300">.ai</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                Sales Layer
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="truncate max-w-[140px] text-zinc-200 font-medium">{businessProfile.name}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
              <span className="text-zinc-300 text-[11px] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse"></span>
                {activeTriggersCount} Triggers Active
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#181B24] p-1 rounded-xl border border-zinc-800 shadow-inner">
          <button
            onClick={() => setViewMode('landing')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'landing'
                ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
            title="Convora AI SaaS Landing Page"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Landing Page</span>
          </button>

          <button
            onClick={() => setViewMode('playground')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'playground'
                ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
            title="Convora AI Model Playground & Prompt Studio"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Playground</span>
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
            title="Side-by-side Merchant Dashboard & Live D2C Storefront"
          >
            <Columns className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Split Screen</span>
          </button>

          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'dashboard'
                ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
            title="Merchant Control Room & Intelligence Dashboard"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button
            onClick={() => setViewMode('storefront')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'storefront'
                ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
            title="Interactive Live Storefront & AI Sales Widget Demo"
          >
            <Store className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Store Demo</span>
          </button>
        </div>

        {/* Quick Actions & Top Right Convora AI Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Top Right Convora AI Branding Pill */}
          <div className="flex items-center px-3 py-1 rounded-xl bg-[#181B24] border border-zinc-700/80 text-xs shadow-sm">
            <span className="h-2 w-2 rounded-full bg-zinc-300 animate-pulse mr-1.5"></span>
            <span className="text-white font-bold tracking-tight">Convora AI</span>
            <span className="text-zinc-400 text-[10px] ml-1.5 font-mono hidden xl:inline">Active</span>
          </div>

          <div className="hidden 2xl:flex items-center px-2.5 py-1 rounded-lg bg-[#181B24] border border-zinc-800 text-xs">
            <Radio className="h-3.5 w-3.5 text-zinc-300 animate-pulse mr-1.5" />
            <span className="text-zinc-400">Visitor:</span>
            <span className="text-white font-mono ml-1 font-semibold">#{activeVisitor.id}</span>
            <span className="ml-2 px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-200 font-mono text-[11px] font-bold border border-zinc-700">
              {activeVisitor.intentScore} pts
            </span>
          </div>

          <button
            onClick={resetDemoVisitor}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs border border-zinc-700 transition-colors"
            title="Reset active visitor session for testing"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>

          <button
            onClick={() => setShowSnippet(true)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs border border-zinc-700 transition-colors"
            title="Get Widget Embed Code"
          >
            <Code className="h-3.5 w-3.5 text-zinc-300" />
            <span className="hidden lg:inline">Snippet</span>
          </button>

          <button
            onClick={() => setShowOnboarding(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 transition-all"
          >
            <Globe className="h-3.5 w-3.5 text-zinc-300" />
            <span>Connect URL</span>
          </button>

          {/* User Auth Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-xl bg-[#181B24] border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover"
                />
                <span className="text-xs font-semibold text-white pr-2 hidden md:inline">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#171922] border border-zinc-800 p-2 shadow-2xl z-50 text-xs space-y-1 animate-slide-up">
                  <div className="px-3 py-2 border-b border-zinc-800">
                    <div className="font-bold text-white truncate">{user.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{user.email}</div>
                    <span className="mt-1 inline-block text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-semibold uppercase border border-zinc-700">
                      {user.plan}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode('dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    Merchant Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 flex items-center space-x-1.5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold transition-all shadow-md"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      {showSnippet && <WidgetSnippetModal onClose={() => setShowSnippet(false)} />}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          initialMode="signin"
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};
