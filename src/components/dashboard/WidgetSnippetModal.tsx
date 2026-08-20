import React, { useState } from 'react';
import {
  Code,
  Copy,
  CheckCircle,
  X,
  Sparkles,
  Layers,
  Zap
} from 'lucide-react';

export const WidgetSnippetModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const snippetCode = `<!-- AI Conversion Agent — Lightweight Sales Layer (<100KB) -->
<script
  async
  src="https://cdn.conversionagent.ai/widget.js"
  data-chatbot-id="ca_aurafit_99x82">
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="h-4 w-4" />
            <span>1-Line Website Deployment</span>
          </div>
          <h2 className="text-xl font-bold text-white">Embed AI Conversion Agent</h2>
          <p className="text-xs text-slate-400">
            Paste this snippet right before the closing <code className="text-emerald-400">&lt;/body&gt;</code> tag on Shopify, WooCommerce, Webflow, or custom React/HTML stores.
          </p>
        </div>

        {/* Code Snippet Box */}
        <div className="relative">
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed">
            {snippetCode}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Features Checklist */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-semibold text-white">Production Guardrails:</div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Ultra-lightweight (&lt;48KB gzipped)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Non-blocking async load
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Isolated Shadow DOM CSS
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Zero impact on PageSpeed score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
