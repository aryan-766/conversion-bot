import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  ShoppingBag,
  HelpCircle,
  UserCheck,
  Headphones,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';
import { SpecialistType } from '../../types';

export const SpecialistTab: React.FC = () => {
  const { businessProfile, updateSpecialist, setBusinessProfile } = useApp();
  const [selectedTone, setSelectedTone] = useState<string>('Energetic & Consultative');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const specialists: {
    id: SpecialistType;
    title: string;
    description: string;
    icon: any;
    features: string[];
    samplePrompt: string;
  }[] = [
    {
      id: 'sales',
      title: 'Sales & Conversion Closer',
      description: 'Proactively identifies buying hesitations, recommends top models, handles sizing/return doubts, and guides visitors to checkout.',
      icon: ShoppingBag,
      features: ['Contextual Product Cards', 'Objection Handling', 'Dynamic Coupon Delivery', 'Cart Recovery'],
      samplePrompt: 'You are the primary digital sales specialist for AuraFit Luxe. Keep answers short, natural (1-3 sentences), recommend relevant products with direct cards, and emphasize our 7-day risk-free return guarantee.'
    },
    {
      id: 'advisor',
      title: 'Product & Fit Advisor',
      description: 'Gathers visitor preferences (running distance, terrain, foot width) and provides structured comparisons to eliminate decision fatigue.',
      icon: Sparkles,
      features: ['Requirements Gathering', 'Footwear Sizing Matrix', 'Side-by-Side Comparison', 'Feature Breakdown'],
      samplePrompt: 'You are an expert footwear consultant. Ask targeted questions about running habits, surface, and cushioning preference to recommend the single best pair.'
    },
    {
      id: 'lead',
      title: 'Lead Qualification Specialist',
      description: 'Engages high-intent corporate/bulk shoppers and custom fit inquiries, qualifying prospects and capturing verified phone & email leads.',
      icon: UserCheck,
      features: ['Lead Scoring Engine', 'Contact Capture Card', 'Corporate Bulk Qualifier', 'Instant Notification'],
      samplePrompt: 'When high intent or bulk inquiries occur, capture the visitor’s phone number, name, and specific requirement so our VIP team can follow up.'
    },
    {
      id: 'support',
      title: 'Customer Care & Policy Specialist',
      description: 'Fast, authoritative answers regarding order tracking, courier pincodes, exchanges, and warranty without transferring to humans.',
      icon: Headphones,
      features: ['7-Day Exchange Knowledge', 'Pincode Delivery Estimator', 'Warranty Verification', 'Order Status Lookups'],
      samplePrompt: 'Answer customer service questions using the synced knowledge base. Reassure customers regarding our fast delivery and hassle-free returns.'
    }
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Bot className="h-5 w-5 text-zinc-300" />
          AI Specialist Persona & System Studio
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Select pre-engineered sales specialist personas optimized for e-commerce conversion instead of writing raw prompts from scratch.
        </p>
      </div>

      {/* Specialist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specialists.map(spec => {
          const Icon = spec.icon;
          const isSelected = businessProfile.activeSpecialist === spec.id;

          return (
            <div
              key={spec.id}
              onClick={() => updateSpecialist(spec.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#181B24] border-zinc-500 shadow-lg ring-1 ring-zinc-500'
                  : 'bg-[#10121A] border-zinc-800 hover:bg-[#151722] hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isSelected
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{spec.title}</h3>
                    <span className="text-[10px] text-zinc-300 font-medium">
                      {isSelected ? '● Currently Active' : 'Click to Activate'}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <CheckCircle className="h-5 w-5 text-white shrink-0" />
                )}
              </div>

              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{spec.description}</p>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-1.5">
                {spec.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Specialist Tuning & Guardrails */}
      <div className="p-6 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Sales Specialist Guardrails & Tone</h2>
            <p className="text-xs text-zinc-400">Enforce response brevity, tone, and brand safety rules</p>
          </div>
          {savedSuccess && (
            <span className="text-xs text-zinc-200 font-semibold flex items-center gap-1 animate-fade-in">
              <CheckCircle className="h-3.5 w-3.5" /> Saved & Deployed to Live Agent
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-2">
            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-300" />
              Brevity Constraint
            </div>
            <p className="text-zinc-400 leading-relaxed">
              AI keeps responses under 3 short sentences. No generic robotic greetings ("I am an AI...").
            </p>
            <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-semibold">
              Enforced Active
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-2">
            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-300" />
              URL & Pricing Integrity
            </div>
            <p className="text-zinc-400 leading-relaxed">
              AI cannot hallucinate custom URLs or unauthorized discounts. Only authorized campaigns are shared.
            </p>
            <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-semibold">
              Strict Schema Enforced
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-2">
            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-300" />
              Structured Product Cards
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Renders interactive product previews with live pricing, review stars, and direct Add-To-Cart buttons.
            </p>
            <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-semibold">
              Dynamic UI Enabled
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold transition-all shadow-md"
          >
            Apply Guardrails & Settings
          </button>
        </div>
      </div>
    </div>
  );
};
