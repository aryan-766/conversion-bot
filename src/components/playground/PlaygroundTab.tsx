import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  Layers,
  Zap,
  CheckCircle,
  Database,
  Cpu,
  Flame,
  FileText,
  Clock,
  Coins
} from 'lucide-react';
import { ProductCardItem } from '../widget/ProductCardItem';

export const PlaygroundTab: React.FC = () => {
  const { businessProfile, products, knowledgeDocs } = useApp();

  const [selectedModel, setSelectedModel] = useState<'gpt-4o' | 'claude-3-5-sonnet' | 'gemini-1-5-pro' | 'deepseek-v3'>('gpt-4o');
  const [temperature, setTemperature] = useState<number>(0.3);
  const [maxTokens, setMaxTokens] = useState<number>(512);
  const [systemPrompt, setSystemPrompt] = useState<string>(
    `You are the official AI Sales Specialist for ${businessProfile.name}.
Respond in concise, natural sentences (1-3 sentences max).
Recommend relevant products with structured product cards, handle sizing or return hesitations, and proactively communicate authorized campaign codes.`
  );

  const [playgroundInput, setPlaygroundInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [lastLatencyMs, setLastLatencyMs] = useState<number>(218);
  const [lastTokenUsage, setLastTokenUsage] = useState<{ prompt: number; completion: number; cost: string }>({
    prompt: 420,
    completion: 64,
    cost: '$0.00041'
  });

  const [playgroundMessages, setPlaygroundMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'assistant';
    content: string;
    modelUsed?: string;
    matchedChunks?: Array<{ title: string; similarity: number; text: string }>;
    products?: any[];
  }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `Hello! I'm your AI Sales Specialist playground instance. I have indexed ${knowledgeDocs.length} knowledge documents and ${products.length} product SKUs. Try asking a test query!`,
      modelUsed: 'gpt-4o'
    }
  ]);

  const handleTestSend = (textToSend?: string) => {
    const text = textToSend || playgroundInput;
    if (!text.trim()) return;

    const userMsgId = `user_${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: 'user' as const,
      content: text
    };

    setPlaygroundMessages(prev => [...prev, newMsg]);
    setPlaygroundInput('');
    setIsGenerating(true);

    const startTime = Date.now();

    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      setLastLatencyMs(elapsed + 180);

      let responseText = '';
      let matchedChunks: any[] = [];
      let recProducts: any[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('return') || lower.includes('policy') || lower.includes('exchange')) {
        responseText = `We offer a 100% Zero-Risk 7-Day Doorstep Pickup Exchange & Return guarantee. If the fit isn't right, our courier picks it up directly with instant refund!`;
        matchedChunks = [
          { title: '7-Day Return & Size Exchange Policy v3.2', similarity: 96.4, text: 'Hassle-free doorstep pickup within 7 days with instant refund or size swap.' },
          { title: 'Domestic Shipping & Delivery Guide', similarity: 82.1, text: 'Delhivery / BlueDart courier tracking.' }
        ];
      } else if (lower.includes('run') || lower.includes('marathon') || lower.includes('shoe')) {
        responseText = `For running and high-impact marathons, our flagship Aura CloudStrider Pro Max features dual-density nitrogen foam for 85% energy return!`;
        recProducts = [products[0]];
        matchedChunks = [
          { title: 'Product Catalog: Aura CloudStrider Pro Max', similarity: 98.1, text: 'Flagship carbon composite marathon shoe with CloudStep foam chassis.' }
        ];
      } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('save')) {
        responseText = `You can communicate coupon code SAVE10 for an instant 10% discount on orders above ₹1,500!`;
        matchedChunks = [
          { title: 'Campaigns: Exit Intent Cart Recovery', similarity: 94.7, text: 'SAVE10 offers 10% off for carts over ₹1,500.' }
        ];
      } else {
        responseText = `I'm analyzing your request based on our catalog of ${products.length} products. Could you specify if you need footwear for marathon running, trail trekking, or daily casual walking?`;
        recProducts = products.slice(0, 2);
        matchedChunks = [
          { title: 'Website Crawl: aurafit-luxe.in', similarity: 89.3, text: 'Performance athletic footwear engineered for comfort and endurance.' }
        ];
      }

      setLastTokenUsage({
        prompt: Math.floor(Math.random() * 80) + 380,
        completion: Math.floor(Math.random() * 40) + 50,
        cost: `$0.000${Math.floor(Math.random() * 40) + 30}`
      });

      setPlaygroundMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: responseText,
          modelUsed: selectedModel,
          matchedChunks,
          products: recProducts
        }
      ]);
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" />
            AI Model Playground & Prompt Studio
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Test system prompts, compare LLM response latency, inspect RAG vector chunk retrieval, and fine-tune sales responses.
          </p>
        </div>

        {/* Telemetry Pills */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-slate-400">Latency:</span>
            <span className="font-mono text-white font-bold">{lastLatencyMs}ms</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
            <Coins className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-slate-400">Est. Cost:</span>
            <span className="font-mono text-emerald-400 font-bold">{lastTokenUsage.cost}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters Sidebar + Interactive Chat Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Model & Prompt Configuration */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800 text-xs font-bold text-white">
            <Sliders className="h-4 w-4 text-emerald-400" />
            <span>Model Hyperparameters & Router</span>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5 text-xs">
            <label className="block text-slate-300 font-semibold">Active LLM Model</label>
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="gpt-4o">OpenAI GPT-4o (Production Sales Closer)</option>
              <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet (Nuanced Advice)</option>
              <option value="gemini-1-5-pro">Google Gemini 1.5 Pro (Massive Context)</option>
              <option value="deepseek-v3">DeepSeek V3 (High-Speed & Cost Efficient)</option>
            </select>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span className="font-semibold">Temperature:</span>
              <span className="font-mono font-bold text-emerald-400">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.0 (Deterministic)</span>
              <span>1.0 (Creative)</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span className="font-semibold">Max Completion Tokens:</span>
              <span className="font-mono font-bold text-cyan-400">{maxTokens}</span>
            </div>
            <input
              type="range"
              min="128"
              max="2048"
              step="64"
              value={maxTokens}
              onChange={e => setMaxTokens(parseInt(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-950"
            />
          </div>

          {/* System Prompt Customizer */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold">System Prompt Directive</label>
              <button
                onClick={() =>
                  setSystemPrompt(
                    `You are the official AI Sales Specialist for ${businessProfile.name}.
Respond in concise, natural sentences (1-3 sentences max).
Recommend relevant products with structured product cards, handle sizing or return hesitations, and proactively communicate authorized campaign codes.`
                  )
                }
                className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            <textarea
              rows={5}
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-[11px] font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Preset Prompts */}
          <div className="space-y-1.5 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold">Quick Directive Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() =>
                  setSystemPrompt(
                    `You are an aggressive high-converting D2C sales specialist. Emphasize limited-time scarcity, instant 10% coupon codes, and 7-day hassle-free doorstep returns.`
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-[10px]"
              >
                Aggressive Sales Closer
              </button>
              <button
                onClick={() =>
                  setSystemPrompt(
                    `You are a sympathetic orthopedic and marathon foot specialist. Guide runners with sizing, arch support, and cushioning options without pushing discounts.`
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-[10px]"
              >
                Footwear Ergonomics Expert
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Chat & RAG Vector Inspector */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between h-[680px]">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs">
            {playgroundMessages.map(msg => (
              <div
                key={msg.id}
                className={`space-y-2 ${msg.sender === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}
              >
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                  <span>{msg.sender === 'user' ? 'User Test Query' : `Assistant (${msg.modelUsed || selectedModel})`}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium'
                      : 'bg-slate-950 border border-slate-800 text-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Attached Products */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Structured Output Card:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.products.map((p: any) => (
                          <ProductCardItem key={p.id} product={p} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Matched RAG Knowledge Chunks Inspector */}
                {msg.matchedChunks && msg.matchedChunks.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 max-w-xl text-[11px]">
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Database className="h-3 w-3" />
                      <span>Retrieved Vector Knowledge Chunks (RAG Index)</span>
                    </div>
                    {msg.matchedChunks.map((chk, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="font-semibold text-white">{chk.title}</span>
                          <span className="font-mono text-emerald-400 font-bold">{chk.similarity}% Match</span>
                        </div>
                        <p className="text-slate-400 text-[10px] italic">"{chk.text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 animate-pulse w-48">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>Generating response...</span>
              </div>
            )}
          </div>

          {/* Quick Preset Prompts */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {[
                'What is your 7-day return and exchange policy?',
                'Which shoe has the highest cushion for long distance running?',
                'Do you have an active discount code for first time buyers?',
                'Can I get someone to call me for bulk corporate marathon order?'
              ].map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleTestSend(query)}
                  className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 border border-slate-800 text-[11px] transition-all text-left"
                >
                  "{query}"
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a customer prompt to test model reasoning and RAG matching..."
                value={playgroundInput}
                onChange={e => setPlaygroundInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTestSend()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleTestSend()}
                disabled={isGenerating || !playgroundInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40"
              >
                <span>Test Query</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
