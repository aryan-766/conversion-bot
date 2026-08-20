import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Split,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3,
  Flame,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const ExperimentsTab: React.FC = () => {
  const { experiment } = useApp();

  const control = experiment.control;
  const variant = experiment.variant;

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Split className="h-5 w-5 text-zinc-300" />
            A/B Experimentation & Incremental Lift Lab
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Scientifically measure incremental revenue lift by comparing traffic split against a pure control group.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700">
            <ShieldCheck className="h-4 w-4 mr-1.5 text-zinc-300" />
            Statistical Significance: {experiment.statisticalSignificance}%
          </span>
        </div>
      </div>

      {/* Hero Lift Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181A24] via-[#13151E] to-[#0E1017] border border-zinc-700 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              Validated Conversion Lift
            </span>
            <div className="text-4xl font-extrabold text-white tracking-tight mt-1 flex items-baseline gap-2">
              <span>+{experiment.conversionLiftPercent}%</span>
              <span className="text-sm font-medium text-zinc-400">Relative CVR Boost</span>
            </div>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl">
              Visitors exposed to the AI Conversion Agent convert at <strong>{variant.conversionRate}%</strong> vs <strong>{control.conversionRate}%</strong> in the control baseline.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0E1017] border border-zinc-700 text-right md:text-right shrink-0">
            <div className="text-xs text-zinc-400">Measured Incremental Revenue</div>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">
              +₹{(experiment.revenueLiftAmount / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Pure experiment lift vs baseline</div>
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Control Group */}
        <div className="p-6 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Group A</span>
              <h2 className="text-base font-bold text-white mt-0.5">{control.name}</h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
              50% Traffic
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Total Visitors</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {control.visitors.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Conversions</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {control.conversions.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Conversion Rate</div>
              <div className="text-xl font-bold text-zinc-300 font-mono mt-1">
                {control.conversionRate}%
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Average Order (AOV)</div>
              <div className="text-xl font-bold text-zinc-300 font-mono mt-1">
                ₹{control.aov.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs text-zinc-400">Total Revenue Generated:</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              ₹{(control.totalRevenue / 100000).toFixed(2)} Lakhs
            </div>
          </div>
        </div>

        {/* AI Conversion Agent Variant */}
        <div className="p-6 rounded-2xl bg-[#151722] border-2 border-zinc-600 shadow-xl space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Group B (Winning Variant)
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">{variant.name}</h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600">
              50% Traffic
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Total Visitors</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {variant.visitors.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Conversions</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {variant.conversions.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Conversion Rate</div>
              <div className="text-xl font-bold text-white font-mono mt-1 flex items-baseline gap-1.5">
                <span>{variant.conversionRate}%</span>
                <span className="text-xs font-bold text-zinc-300">(+{experiment.conversionLiftPercent}%)</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1017] border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Average Order (AOV)</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                ₹{variant.aov.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs text-zinc-400">Total Revenue Generated:</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              ₹{(variant.totalRevenue / 100000).toFixed(2)} Lakhs
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Methodology Explainer */}
      <div className="p-5 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-3">
        <h3 className="text-sm font-bold text-white">Three-Tier Attribution Transparency</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-1">
            <div className="font-semibold text-white">1. AI-Engaged Revenue</div>
            <p className="text-zinc-400 leading-relaxed">
              Revenue from any visitor who opened the widget or engaged in chat before checking out.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-1">
            <div className="font-semibold text-zinc-200">2. AI-Assisted Revenue</div>
            <p className="text-zinc-400 leading-relaxed">
              Visitor received a proactive trigger (sizing help, objection resolution) that unblocked the purchase.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-1">
            <div className="font-semibold text-zinc-200">3. Experimental Incremental Lift</div>
            <p className="text-zinc-400 leading-relaxed">
              Statistically isolated lift proving real incremental dollars generated over baseline control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
