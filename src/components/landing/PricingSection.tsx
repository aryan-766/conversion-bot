import React, { useState } from 'react';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC<{ onSelectPlan: (plan: string) => void }> = ({ onSelectPlan }) => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free Trial',
      description: 'Ideal for testing AI sales on your local store or staging domain.',
      priceMonthly: 0,
      priceAnnual: 0,
      badge: null,
      highlight: false,
      features: [
        '1 Connected Storefront',
        '100 AI Sales Conversations / mo',
        'Basic RAG Vector Indexing (10 docs)',
        'Standard Product Card Previews',
        'Community Discord Support'
      ],
      cta: 'Start Free Sandbox'
    },
    {
      name: 'Growth Specialist',
      description: 'Everything you need to turn visitors into buyers and attribute real revenue.',
      priceMonthly: 1299,
      priceAnnual: 999,
      badge: 'Most Popular for D2C',
      highlight: true,
      features: [
        '2 Connected Storefronts',
        '2,500 Proactive AI Interventions / mo',
        'Full Behavioral Intent Engine (Hesitation, Exit Intent)',
        'Continuous Knowledge Sync & Gap Detector',
        'A/B Testing & Revenue Attribution Suite',
        'Instant Pincode & Order Lookup Integrations',
        'Standard Email & Slack Support'
      ],
      cta: 'Start 14-Day Free Trial'
    },
    {
      name: 'Scale & High Volume',
      description: 'For growing e-commerce brands with high traffic and custom sales rules.',
      priceMonthly: 3199,
      priceAnnual: 2499,
      badge: 'Uncapped Growth',
      highlight: false,
      features: [
        '5 Connected Storefronts',
        '15,000 AI Proactive Conversations / mo',
        'Multi-Specialist Persona Switcher',
        'Advanced Intent Scoring Customizer',
        'Custom Webhook & CRM Ingestion (Shopify/Woo/Klaviyo)',
        'Dedicated Model Router (GPT-4o & Claude 3.5)',
        'Priority 24/7 SLA Support'
      ],
      cta: 'Scale Your Sales'
    },
    {
      name: 'Enterprise VIP',
      description: 'Custom fine-tuned models, dedicated infrastructure and SLA guarantee.',
      priceMonthly: 12999,
      priceAnnual: 9999,
      badge: 'Dedicated VIP',
      highlight: false,
      features: [
        'Unlimited Connected Domains',
        'Unlimited AI Conversations & Interventions',
        'Custom Fine-Tuned Sales Agent weights',
        'Dedicated Postgres + pgvector Cluster',
        'Custom ERP & Inventory Synchronization',
        'Dedicated Customer Success Manager',
        'Signed BAA & Enterprise Security SLA'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Title & Billing Switch */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
          Transparent Pricing
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Priced to Deliver <span className="text-zinc-300">10x+ Measurable ROI</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          No hidden fees. Every tier includes our core behavioral intent tracking and conversion lift attribution.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-[#14161F] border border-zinc-800 shadow-inner">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              !annual ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              annual ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-bold shadow-md border border-zinc-500/40' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${annual ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-800 text-zinc-300'}`}>
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
              plan.highlight
                ? 'bg-[#151722] border-2 border-zinc-500 shadow-2xl shadow-black/60 ring-1 ring-zinc-400/30'
                : 'bg-[#10121A] border border-zinc-800/90 hover:border-zinc-700'
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-700 text-white border border-zinc-500 shadow-md">
                {plan.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="py-2 border-y border-zinc-800">
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ₹{annual ? plan.priceAnnual.toLocaleString() : plan.priceMonthly.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">/ month</span>
                </div>
                {annual && plan.priceAnnual > 0 && (
                  <span className="text-[10px] text-zinc-300 font-semibold mt-0.5 block">
                    Billed annually (₹{(plan.priceAnnual * 12).toLocaleString()} / yr)
                  </span>
                )}
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 text-xs text-zinc-300">
                <span className="text-[11px] uppercase font-bold text-zinc-500 tracking-wider">
                  Included Capabilities:
                </span>
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-md ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-400 shadow-lg shadow-black/40 hover:scale-[1.02]'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
