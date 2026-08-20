import React, { useState } from 'react';
import { TrendingUp, Sparkles, DollarSign, ArrowRight, Zap, CheckCircle } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [visitors, setVisitors] = useState<number>(30000);
  const [aov, setAov] = useState<number>(2799);
  const [cvr, setCvr] = useState<number>(2.5);

  // Math calculations
  const baselineOrders = (visitors * (cvr / 100));
  const baselineRevenue = baselineOrders * aov;

  // Expected 22.2% lift from proactive AI sales agent
  const liftPercentage = 22.2;
  const newCvr = cvr * (1 + liftPercentage / 100);
  const newOrders = (visitors * (newCvr / 100));
  const additionalOrders = Math.round(newOrders - baselineOrders);
  const incrementalRevenue = additionalOrders * aov;
  const monthlyCost = 999;
  const roiMultiplier = Math.round(incrementalRevenue / monthlyCost);

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0E1420] to-slate-950 border border-emerald-500/30 shadow-2xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-bl-full pointer-events-none blur-xl"></div>

      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Interactive ROI Estimator
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Calculate Your Guaranteed <span className="text-emerald-400">Revenue Lift</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          See how much incremental revenue our proactive AI Sales Agent can unlock on your current store traffic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visitors Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-300">Monthly Website Traffic:</span>
              <span className="font-mono font-bold text-white text-sm">
                {visitors.toLocaleString()} visitors
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="200000"
              step="2000"
              value={visitors}
              onChange={e => setVisitors(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2k / mo</span>
              <span>100k / mo</span>
              <span>200k+ / mo</span>
            </div>
          </div>

          {/* Average Order Value (AOV) */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-300">Average Order Value (AOV):</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                ₹{aov.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={aov}
              onChange={e => setAov(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹500</span>
              <span>₹5,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Current Conversion Rate */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-300">Current Conversion Rate (CVR):</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {cvr.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={cvr}
              onChange={e => setCvr(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-950"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.5% (Low)</span>
              <span>2.5% (E-Com Avg)</span>
              <span>6.0% (High)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Baseline Orders</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {Math.round(baselineOrders)} orders / mo
              </div>
            </div>
            <div>
              <div className="text-slate-400">Additional AI Orders</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                +{additionalOrders} orders / mo
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Estimated Monthly Revenue Lift (+{liftPercentage}%)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono text-emerald-400">
              +₹{(incrementalRevenue / 100000).toFixed(2)} Lakhs <span className="text-sm text-slate-400 font-sans font-normal">/ month</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Projected ROI: <strong className="text-emerald-300 font-bold">{roiMultiplier}x</strong> against ₹999 plan cost</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>Ready to capture this incremental revenue?</span>
            <span className="text-emerald-400 font-bold font-mono">14-Day Risk-Free Trial</span>
          </div>
        </div>
      </div>
    </div>
  );
};
