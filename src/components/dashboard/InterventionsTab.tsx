import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Power,
  Clock,
  Flame,
  MessageSquare,
  TrendingUp,
  Plus,
  Edit2,
  Sliders,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { TriggerRule } from '../../types';

export const InterventionsTab: React.FC = () => {
  const { triggers, setTriggers, toggleTrigger } = useApp();
  const [editingTrigger, setEditingTrigger] = useState<TriggerRule | null>(null);

  const handleSaveTrigger = (updated: TriggerRule) => {
    setTriggers(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setEditingTrigger(null);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-zinc-300" />
            Trigger & Proactive Intervention Engine
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure multi-condition behavioral rules, cooldown intervals, and high-converting proactive greetings.
          </p>
        </div>
      </div>

      {/* Trigger Rules List */}
      <div className="space-y-4">
        {triggers.map(rule => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border transition-all ${
              rule.enabled
                ? 'bg-[#13151E] border-zinc-800 hover:border-zinc-700'
                : 'bg-[#0E1017]/60 border-zinc-800/40 opacity-70'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Column: Rule Info */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      rule.enabled ? 'bg-zinc-300 shadow-sm animate-pulse' : 'bg-zinc-600'
                    }`}
                  ></span>
                  <h3 className="text-sm font-bold text-white tracking-tight">{rule.name}</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Type: {rule.type}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{rule.description}</p>

                {/* Condition Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {rule.conditions.minIntentScore && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono">
                      Intent ≥ {rule.conditions.minIntentScore} pts
                    </span>
                  )}
                  {rule.conditions.minDwellTimeSec && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Dwell &gt; {rule.conditions.minDwellTimeSec}s
                    </span>
                  )}
                  {rule.conditions.sizeGuideOpened && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Size Guide Opened
                    </span>
                  )}
                  {rule.conditions.productViewsCount && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Views ≥ {rule.conditions.productViewsCount} PDPs
                    </span>
                  )}
                  {rule.conditions.exitIntentDetected && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Exit Intent Detected
                    </span>
                  )}
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Cooldown: {rule.cooldownMinutes} mins
                  </span>
                </div>

                {/* Proactive Greeting Preview */}
                <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 text-xs">
                  <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-zinc-300" />
                    AI Proactive Callout Message:
                  </div>
                  <div className="text-zinc-200 italic">"{rule.aiProactiveMessage}"</div>
                </div>
              </div>

              {/* Right Column: Performance Stats & Toggle */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-4 shrink-0">
                <div className="grid grid-cols-3 gap-2 text-center w-full sm:w-auto lg:w-48">
                  <div className="p-2 rounded-xl bg-[#0E1017] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">Shown</div>
                    <div className="text-xs font-bold text-white font-mono">{rule.performance.shown}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0E1017] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">Engaged</div>
                    <div className="text-xs font-bold text-zinc-200 font-mono">{rule.performance.engaged}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0E1017] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">Revenue</div>
                    <div className="text-xs font-bold text-white font-mono">
                      ₹{(rule.performance.revenue / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full justify-end">
                  <button
                    onClick={() => setEditingTrigger(rule)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Edit Rule Settings"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleTrigger(rule.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      rule.enabled
                        ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white border border-zinc-500 hover:from-zinc-500 hover:to-zinc-600'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <Power className="h-3.5 w-3.5" />
                    <span>{rule.enabled ? 'Enabled' : 'Disabled'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Trigger Modal */}
      {editingTrigger && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13151E] border border-zinc-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Edit Trigger Rule: {editingTrigger.name}</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">Rule Name</label>
                <input
                  type="text"
                  value={editingTrigger.name}
                  onChange={e => setEditingTrigger({ ...editingTrigger, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">AI Proactive Message</label>
                <textarea
                  rows={3}
                  value={editingTrigger.aiProactiveMessage}
                  onChange={e => setEditingTrigger({ ...editingTrigger, aiProactiveMessage: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1">Min Intent Score</label>
                  <input
                    type="number"
                    value={editingTrigger.conditions.minIntentScore || 40}
                    onChange={e =>
                      setEditingTrigger({
                        ...editingTrigger,
                        conditions: { ...editingTrigger.conditions, minIntentScore: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1">Cooldown (Minutes)</label>
                  <input
                    type="number"
                    value={editingTrigger.cooldownMinutes}
                    onChange={e =>
                      setEditingTrigger({
                        ...editingTrigger,
                        cooldownMinutes: parseInt(e.target.value) || 10
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setEditingTrigger(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveTrigger(editingTrigger)}
                className="px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
