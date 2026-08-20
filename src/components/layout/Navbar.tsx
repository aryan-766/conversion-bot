import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Store,
  Columns,
  RefreshCw,
  Code,
  Cpu
} from 'lucide-react';
import { WidgetSnippetModal } from '../dashboard/WidgetSnippetModal';
import { ConvoraIcon } from '../common/ConvoraLogo';

export const Navbar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    resetDemoVisitor
  } = useApp();

  const [showSnippet, setShowSnippet] = useState(false);

  return (
    <>
      <div className="sticky top-3.5 z-40 px-3 sm:px-6 w-full max-w-7xl mx-auto pointer-events-none transition-all duration-300">
        <header className="pointer-events-auto h-16 rounded-2xl sm:rounded-full border border-zinc-700/80 bg-[#12141C]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shadow-2xl shadow-black/70 ring-1 ring-white/10">
          {/* Convora Brand Logo */}
          <div
            onClick={() => setViewMode('landing')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            title="Go to Landing Page"
          >
            <ConvoraIcon className="h-8 w-8 group-hover:scale-105 transition-transform" />
            <span className="font-extrabold text-base tracking-tight text-white flex items-center">
              Convora<span className="text-zinc-300">.ai</span>
            </span>
          </div>

          {/* Center Tabs: Playground, Split Screen, Dashboard, Store Demo */}
          <div className="flex items-center bg-[#181B24]/90 p-1 rounded-2xl border border-zinc-800 shadow-inner">
            <button
              onClick={() => setViewMode('playground')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'playground'
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
              title="Convora AI Model Playground"
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
              title="Side-by-side Merchant Dashboard & Live Storefront"
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Split Screen</span>
            </button>

            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
              title="Merchant Intelligence Dashboard"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setViewMode('storefront')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'storefront'
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-md border border-zinc-500/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
              title="Live Storefront Demo"
            >
              <Store className="h-3.5 w-3.5" />
              <span>Store Demo</span>
            </button>
          </div>

          {/* Right Actions: Reset & Snippet */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={resetDemoVisitor}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs border border-zinc-700 transition-colors shadow-sm"
              title="Reset active visitor simulation session"
            >
              <RefreshCw className="h-3.5 w-3.5 text-zinc-300" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setShowSnippet(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold transition-all shadow-md"
              title="Get Widget Embed Code"
            >
              <Code className="h-3.5 w-3.5" />
              <span>Snippet</span>
            </button>
          </div>
        </header>
      </div>

      {showSnippet && <WidgetSnippetModal onClose={() => setShowSnippet(false)} />}
    </>
  );
};
