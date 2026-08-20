import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Zap,
  Bot,
  ArrowRight,
  CheckCircle,
  Play,
  Flame,
  Globe,
  Database,
  Split,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  ShoppingBag,
  Cpu,
  HelpCircle,
  ChevronDown,
  Layers,
  Code
} from 'lucide-react';
import { RoiCalculator } from './RoiCalculator';
import { PricingSection } from './PricingSection';
import { AuthModal } from '../auth/AuthModal';
import { ConvoraIcon, ConvoraLogo } from '../common/ConvoraLogo';

export const LandingPage: React.FC = () => {
  const { setViewMode, setActiveTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [heroInput, setHeroInput] = useState('');
  const [heroChatFeed, setHeroChatFeed] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: "👋 Hey there! I'm Convora AI, trained on your store's products and policies. Ask me anything or see how I recommend running shoes!"
    }
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleHeroChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;

    const userText = heroInput;
    setHeroInput('');
    setHeroChatFeed(prev => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      let botReply = "Our flagship running shoes are engineered with dual-density nitrogen bounce foam for 85% energy return! Plus, you get our 7-Day Zero-Risk Doorstep Exchange guarantee. Want me to apply discount code SAVE10 for you?";
      if (userText.toLowerCase().includes('return') || userText.toLowerCase().includes('policy')) {
        botReply = "We offer a 100% Zero-Risk 7-Day Doorstep Pickup Exchange & Return guarantee. If the fit isn't right, our courier picks it up directly with instant refund!";
      } else if (userText.toLowerCase().includes('size') || userText.toLowerCase().includes('fit')) {
        botReply = "All our shoes fit true-to-size! If you have wider feet, we suggest taking half a size up for maximum marathon toe-box comfort.";
      }
      setHeroChatFeed(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 400);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const faqs = [
    {
      q: 'How does Convora AI differ from standard chatbot tools like Intercom or Chatbase?',
      a: 'Generic chatbots wait passively for a visitor to click a bubble and ask generic FAQs. Convora AI watches real-time behavioral signals (PDP dwell time, size guide opens, comparison between products, exit intent cursor acceleration) and proactively steps in at high-friction buying moments with structured product recommendations and verified revenue attribution.'
    },
    {
      q: 'Does Convora AI require coding knowledge to install on my website?',
      a: 'Zero coding is required. You simply paste a single lightweight asynchronous <script> tag (<48KB) right before your </body> tag on Shopify, WooCommerce, Webflow, WordPress, or custom React/HTML stores.'
    },
    {
      q: 'Can Convora AI hallucinate unauthorized discounts or fake products?',
      a: 'No. Our strict schema guardrails and model router enforce structured catalog retrieval. Convora AI only communicates authorized campaign codes (like SAVE10) when your specified cart and intent thresholds are met.'
    },
    {
      q: 'How do you measure incremental revenue lift scientifically?',
      a: 'We built a built-in A/B experimentation engine. Traffic is split 50/50 between a control group (no Convora AI) and the Convora AI variant. We calculate conversion rate lift, average order value (AOV), and incremental dollars with statistical confidence.'
    },
    {
      q: 'What happens when a visitor asks a question not in the knowledge base?',
      a: 'Our Autonomous Knowledge Gap Engine flags the unresolved question, aggregates asking frequency, and pre-generates a brand-tailored answer on your merchant dashboard for 1-click approval and instant vectorization.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0E12] text-white flex flex-col font-sans selection:bg-zinc-700 selection:text-white">
      {/* Sticky SaaS Navbar */}
      <nav className="h-20 border-b border-zinc-800 bg-[#12141C]/95 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <ConvoraIcon className="h-10 w-10" />
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              Convora<span className="text-zinc-300">.ai</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 block -mt-1">
              Autonomous AI Sales Layer
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-zinc-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a>
          <button
            onClick={() => {
              setViewMode('playground');
            }}
            className="hover:text-white transition-colors flex items-center gap-1 text-zinc-300 font-semibold"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>AI Playground</span>
          </button>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Top Right Convora AI Status + CTA Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center px-3 py-1 rounded-xl bg-[#181B24] border border-zinc-700/80 text-xs shadow-sm">
            <span className="h-2 w-2 rounded-full bg-zinc-300 animate-pulse mr-1.5"></span>
            <span className="text-white font-bold tracking-tight">Convora AI</span>
          </div>

          <button
            onClick={() => handleOpenAuth('signin')}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => setViewMode('split')}
            className="px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold shadow-lg shadow-black/40 transition-all hover:scale-105 flex items-center space-x-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launch Live App</span>
          </button>
        </div>
      </nav>

      {/* Main Landing Page Flow */}
      <main className="flex-1 space-y-24 pb-20">
        {/* HERO SECTION */}
        <section className="relative pt-12 sm:pt-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold shadow-sm">
              <ConvoraIcon className="h-4 w-4" />
              <span>Convora AI — Turn Website Visitors into Buyers with AI Sales Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Build Custom AI Sales Agents Trained on Your Data in{' '}
              <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-slate-200 bg-clip-text text-transparent underline decoration-zinc-600 underline-offset-8">
                60 Seconds
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Convora AI watches visitor intent in real-time, proactively steps in during sizing or cart hesitation, recommends structured product cards, and measures verified incremental revenue lift.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setViewMode('split')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-black/40 transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>Try Live D2C Store Simulation</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setViewMode('playground')}
                className="px-5 py-3.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-white text-xs sm:text-sm font-semibold border border-zinc-700 transition-all flex items-center space-x-2"
              >
                <Cpu className="h-4 w-4 text-zinc-300" />
                <span>Open Model Playground</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-[11px] text-zinc-400 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-zinc-300" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-zinc-300" />
                1-Minute Embed Script
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-zinc-300" />
                Proven +22.2% CVR Lift
              </span>
            </div>
          </div>

          {/* Interactive Hero Chat & Live Preview */}
          <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-[#13151E] border border-zinc-700/80 p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="h-3 w-3 rounded-full bg-zinc-600"></div>
                  <div className="h-3 w-3 rounded-full bg-zinc-500"></div>
                  <div className="h-3 w-3 rounded-full bg-zinc-400"></div>
                </div>
                <span className="text-zinc-300 font-mono pl-2">https://aurafit-luxe.in (Convora AI Sales Layer Active)</span>
              </div>
              <span className="text-zinc-200 font-bold flex items-center gap-1 font-mono">
                <Flame className="h-3.5 w-3.5 text-zinc-400" /> 88 pts (Hot Intent)
              </span>
            </div>

            {/* Interactive Chat Stream Inside Hero */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 text-xs">
              {heroChatFeed.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl max-w-md leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-zinc-700 text-white border border-zinc-600 font-medium'
                        : 'bg-[#181A24] border border-zinc-800 text-zinc-100'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Inside Hero */}
            <form onSubmit={handleHeroChat} className="flex items-center space-x-2 pt-2 border-t border-zinc-800">
              <input
                type="text"
                placeholder="Try asking: 'Recommend marathon shoes under ₹3000' or 'What is your return policy?'"
                value={heroInput}
                onChange={e => setHeroInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white font-bold text-xs border border-zinc-500 shadow-md"
              >
                Send
              </button>
            </form>
          </div>
        </section>

        {/* LOGOS / PLATFORMS BAR */}
        <section className="px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Integrates in 1-Click with Your Entire E-Commerce Stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            {['Shopify', 'WooCommerce', 'Webflow', 'Next.js', 'WordPress', 'Stripe', 'Google Analytics'].map(logo => (
              <span key={logo} className="text-sm font-bold tracking-tight text-zinc-300">
                {logo}
              </span>
            ))}
          </div>
        </section>

        {/* 4 CORE VALUE PILLARS */}
        <section id="features" className="px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
              Complete Sales Engine
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              More than a Chatbot. A 24/7 Revenue Engine.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              The 4 foundational layers that convert cold visitors into repeat brand advocates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-3 hover:border-zinc-600 transition-all group">
              <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-200 w-fit border border-zinc-700">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                1. Knowledge & Sync Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Autonomous crawler indexes your sitemap, products, shipping policies, and FAQs in 60s with continuous auto-sync.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-3 hover:border-zinc-600 transition-all group">
              <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-200 w-fit border border-zinc-700">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                2. Real-Time Intent Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Scores visitor intent (0-100 pts) across dwell time, size guide opens, reviews inspected, and comparison patterns.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-3 hover:border-zinc-600 transition-all group">
              <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-200 w-fit border border-zinc-700">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                3. Proactive Trigger Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Silently observes until friction happens (cart abandonment, fit hesitation), then steps in with contextual guidance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-3 hover:border-zinc-600 transition-all group">
              <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-200 w-fit border border-zinc-700">
                <Split className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                4. A/B Attribution & ROI
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Isolates experimental lift against pure control baselines so you can prove real incremental sales dollars to stakeholders.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ROI CALCULATOR */}
        <section id="roi-calculator" className="px-4 sm:px-8 max-w-7xl mx-auto">
          <RoiCalculator />
        </section>

        {/* MODEL PLAYGROUND TEASER */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#151722] via-[#10121A] to-[#0A0B10] border border-zinc-700/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Cpu className="h-4 w-4" /> Live AI Model Studio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Inspect RAG Chunks & Test Model Latency in Real-Time
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Test GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek against your catalog. Inspect cosine similarity % and token costs per interaction.
              </p>
              <button
                onClick={() => setViewMode('playground')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-black/40 transition-all hover:scale-105"
              >
                <span>Launch Playground Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1017] border border-zinc-800 font-mono text-xs space-y-2 w-full md:w-80">
              <div className="text-zinc-400 text-[11px] flex justify-between">
                <span>Model: Convora Router (GPT-4o)</span>
                <span className="text-zinc-200">Online</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 text-zinc-300 text-[11px]">
                Cosine Sim: <strong className="text-white">96.4%</strong> (Policy v3.2)
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 text-zinc-300 text-[11px]">
                Latency: <strong className="text-zinc-200">218ms</strong> • Cost: <strong className="text-white">$0.0004</strong>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="px-4 sm:px-8 max-w-7xl mx-auto">
          <PricingSection
            onSelectPlan={planName => {
              handleOpenAuth('signup');
            }}
          />
        </section>

        {/* TESTIMONIALS / WALL OF LOVE */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
              Wall of Love
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trusted by High-Growth D2C & SaaS Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4">
              <div className="flex items-center space-x-1 text-zinc-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-zinc-300" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Our footwear store had a 68% cart abandonment rate due to sizing doubts. Within 7 days of installing Convora AI, our conversion rate jumped from 2.4% to 3.1%."
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Founder"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Rhea Sengupta</div>
                  <div className="text-[10px] text-zinc-400">Founder, KineticKicks D2C</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4">
              <div className="flex items-center space-x-1 text-zinc-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-zinc-300" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "The A/B testing suite is game changing. We proved ₹3.8 Lakhs in incremental revenue in month one. Convora AI literally pays for itself in the first 48 hours."
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Founder"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Aditya Verma</div>
                  <div className="text-[10px] text-zinc-400">Head of Growth, UrbanWear</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#13151E] border border-zinc-800 space-y-4">
              <div className="flex items-center space-x-1 text-zinc-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-zinc-300" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "The Knowledge Gap detector flagged 40+ people asking for Dubai shipping. We added the answer in 1 click and captured 18 international orders the same week!"
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Founder"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Ananya Joshi</div>
                  <div className="text-[10px] text-zinc-400">E-Commerce Director, Lumina Apparel</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#13151E] border border-zinc-800 cursor-pointer transition-all hover:border-zinc-700"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{faq.q}</h3>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 transition-transform ${openFaq === idx ? 'rotate-180 text-white' : ''}`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed pt-3 border-t border-zinc-800">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#151722] via-[#10121A] to-[#0A0B10] border border-zinc-700/80 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Turn More Visitors into Paying Customers?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Connect your store with Convora AI in 60 seconds. Start your 14-day risk-free trial and watch your conversion lift in real-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setViewMode('split')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-black/40 transition-all hover:scale-105"
              >
                Launch Live Storefront Sandbox →
              </button>
              <button
                onClick={() => handleOpenAuth('signup')}
                className="px-6 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-semibold border border-zinc-700 transition-all"
              >
                Sign Up with Email
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-zinc-800 bg-[#0E1017] py-10 px-4 sm:px-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ConvoraIcon className="h-6 w-6" />
            <span className="font-bold text-white">Convora AI — Autonomous AI Sales Layer for Websites</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setViewMode('playground')} className="hover:text-white">Playground Studio</button>
            <button onClick={() => setViewMode('dashboard')} className="hover:text-white">Dashboard</button>
            <button onClick={() => setViewMode('storefront')} className="hover:text-white">Store Demo</button>
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
          </div>

          <div className="text-zinc-500 text-[11px]">
            © 2026 Convora AI Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};
