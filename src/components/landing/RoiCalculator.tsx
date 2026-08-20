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
    <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#151722] via-[#10121A] to-[#0A0B10] border border-zinc-700/80 shadow-2xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-40 w-40 bg-zinc-500/10 rounded-bl-full pointer-events-none blur-xl"></div>

      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
          Interactive ROI Estimator
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Calculate Your Guaranteed <span className="text-zinc-300">Revenue Lift</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          See how much incremental revenue our proactive AI Sales Agent can unlock on your current store traffic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visitors Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-300">Monthly Website Traffic:</span>
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
              className="w-full accent-zinc-400 bg-zinc-900"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>2k / mo</span>
              <span>100k / mo</span>
              <span>200k+ / mo</span>
            </div>
          </div>

          {/* Average Order Value (AOV) */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-300">Average Order Value (AOV):</span>
              <span className="font-mono font-bold text-white text-sm">
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
              className="w-full accent-zinc-400 bg-zinc-900"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>₹500</span>
              <span>₹5,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Current Conversion Rate */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-300">Current Conversion Rate (CVR):</span>
              <span className="font-mono font-bold text-zinc-200 text-sm">
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
              className="w-full accent-zinc-400 bg-zinc-900"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>0.5% (Low)</span>
              <span>2.5% (E-Com Avg)</span>
              <span>6.0% (High)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0C0D13] border border-zinc-700/80 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-800 text-xs">
            <div>
              <div className="text-zinc-400">Baseline Orders</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {Math.round(baselineOrders)} orders / mo
              </div>
            </div>
            <div>
              <div className="text-zinc-400">Additional AI Orders</div>
              <div className="text-lg font-bold text-zinc-200 font-mono mt-0.5">
                +{additionalOrders} orders / mo
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Estimated Monthly Revenue Lift (+{liftPercentage}%)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              +₹{(incrementalRevenue / 100000).toFixed(2)} Lakhs <span className="text-sm text-zinc-400 font-sans font-normal">/ month</span>
            </div>
            <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-zinc-300" />
              <span>Projected ROI: <strong className="text-white font-bold">{roiMultiplier}x</strong> against ₹999 plan cost</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
            <span>Ready to capture this incremental revenue?</span>
            <span className="text-white font-bold font-mono">14-Day Risk-Free Trial</span>
          </div>
        </div>
      </div>
    </div>
  );
};
