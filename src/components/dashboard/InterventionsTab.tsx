import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Plus,
  Play,
  CheckCircle,
  Clock,
  TrendingUp,
  Flame,
  MousePointer,
  Sparkles,
  Sliders,
  Edit2,
  Trash2,
  Tag,
  ShieldCheck,
  Smartphone,
  Eye,
  Layers
} from 'lucide-react';
import { TriggerRule } from '../../types';
import { RuleBuilderModal } from './RuleBuilderModal';

export const InterventionsTab: React.FC = () => {
  const {
    triggers,
    toggleTrigger,
    createTrigger,
    updateTrigger,
    deleteTrigger,
    campaigns,
    manualPushIntervention
  } = useApp();

  const [selectedRuleForEdit, setSelectedRuleForEdit] = useState<TriggerRule | null>(null);
  const [showRuleModal, setShowRuleModal] = useState<boolean>(false);
  const [testNotification, setTestNotification] = useState<string | null>(null);

  const activeCount = triggers.filter(t => t.enabled).length;
  const totalShown = triggers.reduce((sum, t) => sum + t.performance.shown, 0);
  const totalEngaged = triggers.reduce((sum, t) => sum + t.performance.engaged, 0);
  const totalConversions = triggers.reduce((sum, t) => sum + t.performance.conversions, 0);
  const totalRevenue = triggers.reduce((sum, t) => sum + t.performance.revenue, 0);
  const avgEngagementRate = totalShown > 0 ? ((totalEngaged / totalShown) * 100).toFixed(1) : '0.0';
  const avgConversionRate = totalEngaged > 0 ? ((totalConversions / totalEngaged) * 100).toFixed(1) : '0.0';

  const handleOpenCreate = () => {
    setSelectedRuleForEdit(null);
    setShowRuleModal(true);
  };

  const handleOpenEdit = (rule: TriggerRule) => {
    setSelectedRuleForEdit(rule);
    setShowRuleModal(true);
  };

  const handleSaveRule = (rule: TriggerRule) => {
    if (selectedRuleForEdit) {
      updateTrigger(rule);
    } else {
      createTrigger(rule);
    }
    setShowRuleModal(false);
    setSelectedRuleForEdit(null);
  };

  const handleTestTrigger = (rule: TriggerRule) => {
    manualPushIntervention('active', rule.aiProactiveMessage, rule.type, rule.attachedCoupon);
    setTestNotification(`Dispatched test event for "${rule.name}" to active storefront session!`);
    setTimeout(() => setTestNotification(null), 4000);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header with Stats HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Zap className="h-6 w-6 text-zinc-300" />
            Trigger & Intervention Studio
          </h1>
          <p className="text-xs text-zinc-400">
            Define multi-condition behavioral rules to proactively convert hesitant visitors at high-friction buying moments.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-black/40 self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>New Trigger Rule</span>
        </button>
      </div>

      {testNotification && (
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center space-x-2 animate-slide-up shadow-lg">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{testNotification}</span>
        </div>
      )}

      {/* Aggregate KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-1">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between font-semibold">
            <span>Active Rules</span>
            <Zap className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {activeCount} <span className="text-xs font-normal text-zinc-500">/ {triggers.length} rules</span>
          </div>
          <div className="text-[10px] text-zinc-400">Continuous telemetry match</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-1">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between font-semibold">
            <span>Impressions Shown</span>
            <Eye className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {totalShown.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-400">Total proactive interventions</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-1">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between font-semibold">
            <span>Avg Engagement Rate</span>
            <MousePointer className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {avgEngagementRate}%
          </div>
          <div className="text-[10px] text-zinc-300 font-semibold">{totalEngaged.toLocaleString()} chat engagements</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-1">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between font-semibold">
            <span>Influenced Revenue</span>
            <TrendingUp className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-300 font-semibold">{totalConversions} verified orders ({avgConversionRate}% CVR)</div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-zinc-400" />
            Configured Proactive Rules ({triggers.length})
          </h2>
          <span className="text-xs text-zinc-400">Ranked by Priority</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {triggers.map((rule, idx) => {
            const ruleCtr = rule.performance.shown > 0 ? ((rule.performance.engaged / rule.performance.shown) * 100).toFixed(1) : '0.0';
            const ruleCvr = rule.performance.engaged > 0 ? ((rule.performance.conversions / rule.performance.engaged) * 100).toFixed(1) : '0.0';

            return (
              <div
                key={rule.id}
                className={`p-5 rounded-2xl border transition-all ${
                  rule.enabled
                    ? 'bg-[#13151E] border-zinc-800 hover:border-zinc-700'
                    : 'bg-[#0E1017]/80 border-zinc-900 opacity-60'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Identity & Conditions */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold">
                        P{rule.priority || idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-white">{rule.name}</h3>

                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700">
                        {rule.type === 'chat_callout' && '💬 AI Chat Callout'}
                        {rule.type === 'scarcity_drawer' && '⚡ Scarcity Drawer'}
                        {rule.type === 'vip_lead_modal' && '👑 VIP Modal'}
                        {rule.type === 'whatsapp_recovery' && '📱 WhatsApp Followup'}
                        {rule.type === 'sticky_pill' && '📌 Sticky Pill'}
                      </span>

                      {rule.attachedCoupon && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono font-bold flex items-center gap-1">
                          <Tag className="h-3 w-3" /> Coupon: {rule.attachedCoupon}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                      {rule.description}
                    </p>

                    {/* Conditions Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
                      {rule.conditions.minIntentScore !== undefined && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                          Intent ≥ {rule.conditions.minIntentScore} pts
                        </span>
                      )}
                      {rule.conditions.minDwellTimeSec !== undefined && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                          Dwell ≥ {rule.conditions.minDwellTimeSec}s
                        </span>
                      )}
                      {rule.conditions.sizeGuideOpened && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                          📐 Size Guide Opened
                        </span>
                      )}
                      {rule.conditions.exitIntentDetected && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                          🛑 Cursor Exit Acceleration
                        </span>
                      )}
                      {rule.conditions.productViewsCount && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                          Views ≥ {rule.conditions.productViewsCount} PDPs
                        </span>
                      )}
                      {rule.conditions.minCartValue && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                          Cart ≥ ₹{rule.conditions.minCartValue}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono">
                        Cooldown: {rule.cooldownMinutes}m
                      </span>
                    </div>

                    {/* Proactive Message Preview */}
                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 italic space-y-1.5 max-w-3xl">
                      <div className="font-semibold text-[10px] uppercase tracking-wider text-zinc-400 not-italic">
                        AI Proactive Message:
                      </div>
                      <div>"{rule.aiProactiveMessage}"</div>
                      {rule.quickReplies && rule.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1 not-italic">
                          {rule.quickReplies.map((qr, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                              {qr}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Metrics & Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
                    <div className="text-right space-y-1">
                      <div className="text-sm font-bold text-white">
                        ₹{rule.performance.revenue.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {rule.performance.shown} views • {ruleCtr}% CTR • {rule.performance.conversions} orders
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTestTrigger(rule)}
                        className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs border border-zinc-700 transition-colors flex items-center space-x-1"
                        title="Simulate firing this trigger on active session"
                      >
                        <Play className="h-3 w-3 text-zinc-300" />
                        <span>Test</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(rule)}
                        className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                        title="Edit Trigger Rule"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => toggleTrigger(rule.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          rule.enabled
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-600'
                            : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                        }`}
                      >
                        {rule.enabled ? 'Active' : 'Paused'}
                      </button>

                      <button
                        onClick={() => deleteTrigger(rule.id)}
                        className="p-1.5 rounded-xl bg-zinc-900 hover:bg-rose-950/50 text-zinc-500 hover:text-rose-400 border border-zinc-800 hover:border-rose-800 transition-colors"
                        title="Delete Trigger Rule"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showRuleModal && (
        <RuleBuilderModal
          initialRule={selectedRuleForEdit}
          campaigns={campaigns}
          onClose={() => {
            setShowRuleModal(false);
            setSelectedRuleForEdit(null);
          }}
          onSave={handleSaveRule}
        />
      )}
    </div>
  );
};
