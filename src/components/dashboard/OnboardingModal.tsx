import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  CheckCircle,
  Sparkles,
  RefreshCw,
  X,
  Layers,
  ShoppingBag,
  HelpCircle,
  FileText,
  Palette
} from 'lucide-react';

export const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setBusinessProfile } = useApp();
  const [url, setUrl] = useState('https://aurafit-luxe.in');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [crawlStep, setCrawlStep] = useState<number>(0);

  const steps = [
    'Detecting sitemap.xml and category hierarchy...',
    'Extracting 24 product catalogs & variant schemas...',
    'Parsing shipping, returns & size exchange policies...',
    'Synthesizing brand tone, colors & FAQs into Knowledge Vector Base...',
    'Configuring Sales Closer & Proactive Triggers...'
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setCrawlStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setCrawlStep(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setBusinessProfile(prev => ({
            ...prev,
            url,
            name: url.replace('https://', '').replace('.in', '').replace('.com', '').toUpperCase()
          }));
          onClose();
        }, 800);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Autonomous Store Onboarding</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Connect & Analyze Website</h2>
          <p className="text-xs text-slate-400">
            Enter your website URL. Our engine will crawl pages, identify products, policies, and FAQs, and automatically configure your AI Sales Agent.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter your website URL
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Globe className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://yourstore.com"
                  disabled={isAnalyzing}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-60"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 shrink-0 disabled:opacity-50 flex items-center space-x-1.5"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze Website</span>
                )}
              </button>
            </div>
          </div>

          {/* Crawler Progress Simulation */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Crawl & Synthesize
                </span>
                <span className="text-slate-400 font-mono">
                  Step {crawlStep + 1} of {steps.length}
                </span>
              </div>

              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${((crawlStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 font-mono pt-1">
                &gt; {steps[crawlStep]}
              </p>
            </div>
          )}

          {/* Extracted Business Highlights Preview */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Products</div>
              <div className="font-bold text-white font-mono mt-0.5">24 SKUs</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">FAQs</div>
              <div className="font-bold text-cyan-400 font-mono mt-0.5">31 Synced</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Policies</div>
              <div className="font-bold text-emerald-400 font-mono mt-0.5">6 Indexed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
